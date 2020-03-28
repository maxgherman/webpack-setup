import { readConfig } from './utils/read-config'
import { generate } from './utils/generate-data'
import { deleteFiles } from './utils/delete-files'
import { save } from './utils/save-data'

const run = async (): Promise<void> => {
    const config = await readConfig()
    const data = await generate(config)
    await deleteFiles(config)
    await save(config, data)
}

run()
.catch(console.log)
