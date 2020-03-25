import * as styles from './index.style'
import* as cssStyles from './index.module.css'
import * as pcssStyles from './index.module.pcss'

import { appendToBody} from '@utils'

const createList = (className: string): HTMLUListElement => {
    const list = document.createElement('ul')
    list.className = className
    return list
}

export const appendListItem = (list: HTMLUListElement, className: string, text: string): void => {
    const item = document.createElement('li')
    item.innerText = text
    item.className = className
    list.appendChild(item)
}

export type List = {
    addItem: (text: string, itemType: ListItemType) => void
    render(parent?: HTMLElement): void
}

export type ListItemType = 'regular' | 'highlight'

export const list = (): List => {

    const result = createList(styles.list)

    return {
        addItem(text: string, itemType: ListItemType): void {

            const className = itemType === 'regular' ?
                cssStyles["item-regular"] : pcssStyles["item-highlight"]

            appendListItem(result, className, text)
        },

        render(parent?: HTMLElement): void {
            if(parent) {
                parent.appendChild(result)
            } else {
                appendToBody(result)
            }
        }
    }
}
