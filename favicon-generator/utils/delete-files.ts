import del from 'del'
import { configuration } from '../config'

export const deleteFiles = async () => {
    const deletedFiles = await del([
        `${configuration.destination}/**/*`,
        `!${configuration.destination}`
    ], {
        force: true
    })

    console.log('Deleted files:')
    console.log(deletedFiles.join('\n'))
}
