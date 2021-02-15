export const toCapital = (value: string): string =>
    `${value.charAt(0).toUpperCase()}${value.slice(1)}`

export const append = (parent: HTMLElement, element: HTMLElement): void => {
    if(parent.children.length < 2)
    {
        parent.appendChild(element)
    }
}

export const createFrame = (): HTMLDivElement => {

    const body = document.getElementsByTagName('body')[0]

    const frame = Array.from(body.children).find(item => item.nodeName == 'DIV') as HTMLDivElement

    if(frame) {
        frame.remove()
    }

    const result = document.createElement('div')
    result.className = 'frame'
    body.appendChild(result)
    return result
}

export const formatOClockDate = (date: Date): Promise<string> =>
    import('date-fns')
    .then(({ format }) => format(date, "h 'o''clock'"))
