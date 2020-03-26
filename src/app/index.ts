import './index.pcss'
import { list as createList } from '@components/list'
import { image as createImage } from '@components/image'
import { toCapital } from '@utils'

import largeLogo from '@img/logo1.png'
import smallLogo from '@img/logo2.jpg'

type DynamicImport = Promise<{ default: () => string }>

function* func (): Generator<string | DynamicImport, void, string> {
    const result = yield toCapital('test')
    yield toCapital(result)
    yield import(/* webpackChunkName: "feature" */ './feature/index')
}

export const render = (): void => {

    const f = func()
    let count = 0

    const list = createList()
    list.render()

    const largeImage = createImage(largeLogo, 'large')
    largeImage.render()

    const smallImage = createImage(smallLogo, 'small')
    smallImage.render()

    const interval = setInterval((): void => {
        count++
        const next = f.next('hello world')

        if(next.done) {
            clearInterval(interval)
            return
        }

        if((next.value as DynamicImport)[Symbol.toStringTag] === 'Promise' ||
            next.value instanceof Promise) {
            (next.value as DynamicImport)
                .then((data): void => {
                    list.addItem(data.default(), 'regular')
                })
        } else {
            const itemType = count % 2 == 0 ? 'highlight' : 'regular'
            list.addItem(next.value, itemType)
        }
    }, 1000)
}
