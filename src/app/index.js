
import 'core-js/stable'
import 'regenerator-runtime/runtime'

if (module.hot) {
    module.hot.accept()
}

function* func () {
    yield console.log('test')
}

const f = func()
f.next()
f.next()


