import util from 'util'
const favicons = require('favicons')
import { Result } from './common'
import { configuration } from '../config'

const favIcons: (source: string, configuration: {}) => Promise<Result>
    = util.promisify(favicons)

export const generate = async () => {
    const data = await favIcons(configuration.source, configuration.favicons)

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

        const replacement = `href="${matches.groups['value']}"`;
        return acc.concat(curr.replace(/href.*=.*".*"/, replacement))

    }, [] as string[]);

    return data
}
