function* func (): Generator<void, void, string> {
    const result = yield console.log('test')
    console.log(result)
}

export default func

