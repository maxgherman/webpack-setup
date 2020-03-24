import 'core-js/stable'
import 'regenerator-runtime/runtime'

import func, { DynamicImport } from '@app'
import { createList, appendToBody, appendListItem } from '@utils'

import cssExports from './index.module.css'
import pcssExports from './index.module.pcss'
import * as styles from './index.style'

/* eslint-disable @typescript-eslint/ban-ts-ignore */
//@ts-ignore
if (module.hot) {
    //@ts-ignore
    module.hot.accept()
}
/* eslint-enable @typescript-eslint/ban-ts-ignore */

const f = func()
let count = 0

const list = createList(styles.list)
list.className = styles.list
appendToBody(list)

const interval = setInterval((): void => {
    count++
    const next = f.next('hello world')

    if(next.done) {
        clearInterval(interval)
        return
    }

    if(next.value instanceof Promise) {
        (next.value as DynamicImport)
            .then((data): void => {
                appendListItem(list, cssExports["item-regular"], data.default())
            })
    } else {
        const className = count % 2 == 0 ? pcssExports["item-highligh"]: cssExports["item-regular"]
        appendListItem(list, className, next.value)
    }
}, 1000)
