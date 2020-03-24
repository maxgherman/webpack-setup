export const toCapital = (value: string): string =>
    `${value.charAt(0).toUpperCase()}${value.slice(1)}`

export const createList = (className: string): HTMLUListElement => {
    const list = document.createElement('ul')
    list.className = className
    return list
}

export const appendToBody = (element: HTMLElement): void => {
    document.getElementsByTagName('body')[0].appendChild(element)
}

export const appendListItem = (list: HTMLUListElement, className: string, text: string): void => {
    const item = document.createElement('li')
    item.innerText = text
    item.className = className
    list.appendChild(item)
}

