import './index.css'
import { toCapital } from '@utils'

export type DynamicImport = Promise<{ default: () => string }>

function* func (): Generator<string | DynamicImport, void, string> {
    const result = yield toCapital('test')
    yield toCapital(result)

    yield import(/* webpackChunkName: "feature" */ './feature/index')
}

export default func

