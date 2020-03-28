import './index.pcss'

import { append } from '@utils'

const createImage = (className: string, src: string): HTMLImageElement => {
    const result = document.createElement('img')
    result.className = className
    result.src = src
    return result
}

export type ImageType = 'small' | 'large'
export type Image = {
    render(parent?: HTMLElement): void
}

export const image = (src: string, imageType: ImageType): Image => {
    const className = imageType == 'large' ? 'large' : 'small'

    const result = createImage(className, src)

    return {
        render(parent: HTMLElement): void {
            append(parent, result)
        }
    }
}

