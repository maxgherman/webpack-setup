import { generate } from './utils/generate-data'
import { deleteFiles } from './utils/delete-files'
import { save } from './utils/save-data'

const run = async () => {

    try {
        const data = await generate()
        await deleteFiles()
        await save(data)
    } catch(error) {
        console.log(error)
    }
}

run()
