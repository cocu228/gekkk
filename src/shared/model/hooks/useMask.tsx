import {FormEvent, useCallback, useMemo} from 'react';
import {AnyMaskedOptions, createMask} from 'imask';

function useMask(rule: AnyMaskedOptions) {

    const mask = useMemo(() => createMask(rule), [rule, createMask]);

    const onInput = useCallback((event: FormEvent) => {
        const input = event.target as HTMLInputElement;
        input.value = mask.resolve(input.value);
    }, [rule]);

    return {onInput};
}

export default useMask;
