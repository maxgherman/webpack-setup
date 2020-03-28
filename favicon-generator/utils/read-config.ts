import path from 'path'
import { cosmiconfig } from 'cosmiconfig'
import { Config } from './common'

const normalizePath = (baseDir: string, value: string): string =>
    path.join(baseDir, value)

const normalizePaths = (config: Config, baseDir: string): Config => ({
    ...config,
    source: normalizePath(baseDir, config.source),
    destination: normalizePath(baseDir, config.destination),
    html: {
        ...config.html,
        source: normalizePath(baseDir, config.html.source)
    }
})

export const readConfig = async (): Promise<Config> => {
    const explorer = cosmiconfig('favicon-generator')
    const result = await explorer.search()

    if(!result) {
        console.log('No config file found')
        process.exit(1)
    }

    const dirPath = path.dirname(result.filepath)
    const config = normalizePaths(result.config, dirPath)

    return config
}

