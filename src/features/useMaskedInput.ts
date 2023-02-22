
import {FormEvent, useCallback, useMemo, useState} from 'react';
import {AnyMaskedOptions, createMask} from 'imask';

function useMaskedInput(rule: AnyMaskedOptions, initialValue: string = '') {

    const mask = useMemo(() => createMask(rule), [rule, createMask]);

    const [value, setValue] = useState('')

    const onInput = useCallback((event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        const resolvedValue = mask.resolve(input.value)
        input.value = resolvedValue
        setValue(resolvedValue)
    }, [rule]);

    return [value, onInput] as const;
}

export default useMaskedInput;
