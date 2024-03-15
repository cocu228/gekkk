export function getAlignment(array: Array<string>, key: string, md: boolean): string {
    return array.indexOf(key) === 0 ? 'md:ml-5 justify-start' :
        array.indexOf(key) === array.length - 1 ? 'md:mr-5 justify-end' :
        'justify-center'
}

export function getWidth(array: Array<string>, key: string, md: boolean): string {
    if (!md) return;
    
    return array.indexOf(key) === array.length - 1 && 'max-w-[100px]' ;
}