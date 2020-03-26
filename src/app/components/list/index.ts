import { append } from '@utils'

const createList = (): HTMLUListElement => {
    const list = document.createElement('ul')
    list.className = 'list'
    return list
}

export const appendListItem = (list: HTMLUListElement, text: string): void => {
    const item = document.createElement('li')
    item.innerText = text
    list.appendChild(item)
}

export type List = {
    addItem: (text: string) => void
    render(parent?: HTMLElement): void
}

export const list = (): List => {

    const result = createList()

    return {
        addItem(text: string): void {
            appendListItem(result, text)
        },

        render(parent: HTMLElement): void {
            append(parent, result)
        }
    }
}
