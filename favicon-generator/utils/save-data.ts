import util from 'util'
import path from 'path'
import fs from 'fs'
import { Result, Config } from './common'

const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

export const save = async (config: Config, data: Result): Promise<void> => {

    const { marker} = config.html
    const markerRegex = new RegExp(`${marker.start}[\\s\\S]*${marker.end}`)

    const actions = data.images.map(item =>
        writeFile(path.resolve(config.destination, item.name), item.contents)
    )
    .concat(
        data.files.map((item) =>
            writeFile(path.resolve(config.destination, item.name), item.contents))
    )
    .concat(
        readFile(config.html.source, 'utf8')
        .then((html) =>
            html.replace(
                markerRegex,
                `${marker.start}\n${data.html.join('\n')}\n${marker.end}`
            )
        )
        .then((html) =>
            writeFile(config.html.source, html)
        )
    )

    await Promise.all(actions)
    .catch((error: Error) => console.log(error.message))
}
