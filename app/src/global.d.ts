declare module "*.png" {
    const value: string
    export default value
}

declare module "*.jpg" {
    const value: string
    export default value
}

declare module "app2/Text" {
    declare function Text (data: string, isRemote?: boolean): string
}
