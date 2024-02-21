export function getAlignment(array: Array<string>, key: string, md: boolean): string {
    if (!md){
        return array.indexOf(key) === 0 ? 'md:ml-5 justify-start' :
            array.indexOf(key) === array.length - 1 ? 'md:mr-5 justify-end' :
            'justify-center';
    } else {
        return array.indexOf(key) === 0 ? 'md:ml-5 justify-start' : 'md:mr-5 justify-end';
    }
}

export function getWidth(array: Array<string>, key: string, md: boolean): string {
    if (!md) return;
    
    return array.indexOf(key) === array.length - 1 && 'max-w-[100px]' ;
}