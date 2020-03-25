export type Result = {
    images: { name: string, contents: Buffer }[],
    files: { name: string, contents: string }[],
    html: string[]
}
