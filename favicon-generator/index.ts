import { generate } from './utils/generate-data'
import { deleteFiles } from './utils/delete-files'
import { save } from './utils/save-data'

const run = async () => {

    const data = await generate()
    await deleteFiles()
    await save(data)
}

run()
