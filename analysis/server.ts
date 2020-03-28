import fastify from 'fastify'
import { staticServe } from 'fastify-auto-push'
import compress from 'fastify-compress'
import pem from 'pem'
import path from 'path'

const parseArguments = (): [string, string] => {
    const [ url, dir ] = process.argv.slice(2)

    if(!url) {
        console.log('Missing url parameter')
        process.exit(1)
    }

    if(!dir) {
        console.log('Missing directory parameter')
        process.exit(1)
    }

    return [url, dir]
}

const createCertificate = (): Promise<pem.CertificateCreationResult> =>
    new Promise((resolve, reject) => {
        pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
            if(err) {
                reject(err)
                return
            }

            resolve(keys)
        })
    })

const main = async (): Promise<void> => {

    const [urlParameter, dirParameter] = parseArguments()
    const url = new URL(urlParameter)
    const isHttps = url.protocol === 'https:'

    const certificate: pem.CertificateCreationResult | null =
        isHttps ? (await createCertificate()) : null

    const app = fastify({

        ...(isHttps ? {
            https: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                key: certificate!.serviceKey,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                cert: certificate!.certificate
            },
            http2: true
        } : {}),
        logger: {
            timestamp: false,
            prettyPrint: { colorize: true },
            serializers: {
                req: (req: {
                        method: string
                        url: string
                        headers: { [_: string]: string }
                    }): string =>
                    `${req.method} ${req.url} ${req.headers['user-agent'].substring(50)}`
            }
        }
    })

    app.register(compress)

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    app.register(staticServe, {
        root: path.resolve(__dirname, dirParameter),
    })

    await app.listen(url.port)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
