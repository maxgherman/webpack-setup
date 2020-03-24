import 'core-js/stable'
import 'regenerator-runtime/runtime'

/* eslint-disable @typescript-eslint/ban-ts-ignore */
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept()
}
/* eslint-enable @typescript-eslint/ban-ts-ignore */

import func, { DynamicImport } from '@app'
import { toCapital } from '@utils'

const f = func()
f.next()

setTimeout((): void => {
    const next = f.next(toCapital('hello world'));

    (next.value as DynamicImport)
        .then((data): void => {
            console.log(data.default())
        })
}, 3000)
