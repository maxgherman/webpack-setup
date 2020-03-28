import util from 'util'
import { Result, Config } from './common'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const favicons = require('favicons')

const favIcons: (source: string, configuration: {}) => Promise<Result>
    = util.promisify(favicons)

export const generate = async (config: Config): Promise<Result> => {
    const data = await favIcons(config.source, config.favicons)

    data.html.sort((a, b) => {
        const aValue = a.substring(0, 5)
        const bValue = b.substring(0, 5)

        return aValue < bValue ? 1 : (aValue > bValue ? -1 : 0)
    })

    data.html = data.html.reduce((acc, curr) => {

        const matches = curr.match(/href.*=.*"(?<value>.*?)"/)

        if(!matches || !matches.groups || !matches.groups['value']) {
            return acc.concat(curr)
        }

        // exclude manifest.json
        if(matches.groups['value'].endsWith('manifest.json')) {
            return acc
        }

        return acc.concat(curr)

    }, [] as string[])

    return data
}
