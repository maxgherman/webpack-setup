export const toCapital = (value: string): string =>
    `${value.charAt(0).toUpperCase()}${value.slice(1)}`

export const appendToBody = (element: HTMLElement): void => {
    document.getElementsByTagName('body')[0].appendChild(element)
}
