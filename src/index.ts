import 'core-js/stable'
import 'regenerator-runtime/runtime'

/* eslint-disable @typescript-eslint/ban-ts-ignore */
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept()
}
/* eslint-enable @typescript-eslint/ban-ts-ignore */

import func from '@app'
import feature from '@app/feature'
import { toCapital } from '@utils'

const f = func()
f.next()
f.next(toCapital('hello world'))
console.log(feature())
