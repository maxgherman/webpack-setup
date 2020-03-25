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

    data.html = data.html
    .map((item) => {
        const matches = item.match(/href.*=.*"(?<value>.*?)"/)

        if(!matches || !matches.groups || !matches.groups['value'] ||
            matches.groups['value'].endsWith('.json')) {
            return item
        }

        const replacement = `href="${matches.groups['value']}"`;
        return item.replace(/href.*=.*".*"/, replacement)
    })

    return data
}
