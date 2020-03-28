import del from 'del'
import { Config } from './common'

export const deleteFiles = async (config: Config): Promise<void> => {
    const deletedFiles = await del([
        `${config.destination}/**/*`,
        `!${config.destination}`
    ], {
        force: true
    })

    console.log('Deleted files:')
    console.log(deletedFiles.join('\n'))
}
