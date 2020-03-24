
export type DynamicImport = Promise<{ default: () => string }>

function* func (): Generator<void | DynamicImport, void> {
    const result = yield console.log('test')
    console.log(result)

    yield import(/* webpackChunkName: "feature" */ './feature/index')
}

export default func

