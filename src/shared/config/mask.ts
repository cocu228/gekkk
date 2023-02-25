import {AnyMaskedOptions} from 'imask';

export const MASK_PHONE: AnyMaskedOptions = {
    mask: '+{7} (000) 000-00-00',
};


export const MASK_SUM: AnyMaskedOptions = {
    mask: 'num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: ' '
        }
    }
};

