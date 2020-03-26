import './index.pcss'
import { list as createList } from '@components/list'
import { image as createImage } from '@components/image'
import { toCapital, createFrame } from '@utils'

import largeLogo from '@img/logo.png'

type DynamicImport = Promise<{ default: () => string }>

function* func (): Generator<string| DynamicImport, void, string> {
    yield 'hello world'
    yield import(/* webpackChunkName: "feature" */ './feature/index')
}

const frame = createFrame()

export const render = (): void => {

    const f = func()

    const largeImage = createImage(largeLogo, 'large')
    largeImage.render(frame)

    const list = createList()
    list.render(frame)

    const interval = setInterval((): void => {
        const next = f.next()

        if(next.done) {
            clearInterval(interval)
            return
        }

        if((next.value as DynamicImport)[Symbol.toStringTag] === 'Promise' ||
            next.value instanceof Promise) {
            (next.value as DynamicImport)
                .then((data): void => {
                    list.addItem(toCapital(data.default()))
                })
        } else {
            list.addItem(toCapital(next.value))
        }
    }, 1000)
}
