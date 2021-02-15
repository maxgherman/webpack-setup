import path from 'path'

export type ManifestIcon = { src: string }

export type Manifest = {
    icons: [ ManifestIcon ]
} & {
    [ key: string ]: string
}

export type ManifestRead = {
    manifest?: Manifest,

    result: boolean
}

export type FileDescriptors = { name: string | null; path: string }[]

export const requireManifest = (manifestPath: string): ManifestRead => {

    try
    {
        require.resolve(manifestPath)
        return {
            manifest: require(manifestPath),
            result: true
        }
    }
    catch {
        return {
            result: false
        }
    }
}

export const generatePlain = (files: FileDescriptors): Manifest => {
    return files.reduce((acc, curr) => {
        acc[curr.name || ''] = curr.path
        return acc
    }, {} as Manifest)
}

export const generateFromManifest = (manifest: Manifest, files: FileDescriptors): Manifest => {
    return files.reduce((acc, curr) => {
        acc[curr.name || ''] = curr.path

        const icon = acc.icons.find(item => {
            return curr.path.includes(path.parse(item.src).name)
        })

        if(icon) {
            icon.src = curr.path
        }

        return acc
    }, manifest)
}
