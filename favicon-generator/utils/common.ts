export type Config = {
    source: string
    destination: string
    html: {
        source: string
        replacementRoot: string
        marker: {
            start: string
            end: string
        }
    }
    favicons: { }
}


export type Result = {
    images: {
        name: string
        contents: Buffer
    }[]
    files: {
        name: string
        contents: string
    }[]
    html: string[]
}
