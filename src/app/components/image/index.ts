import * as styles from './index.style'
import { appendToBody} from '@utils'

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
    const className = imageType == 'large' ? styles.imgLarge : styles.imgSmall

    const result = createImage(className, src)

    return {
        render(parent?: HTMLElement): void {
            if(parent) {
                parent.appendChild(result)
            } else {
                appendToBody(result)
            }
        }
    }
}

