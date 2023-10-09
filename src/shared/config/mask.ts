import {AnyMaskedOptions} from 'imask';

export const MASK_PHONE: AnyMaskedOptions = {
    mask: '+000 000-00-00',
};

export const MASK_CODE: AnyMaskedOptions = {
    mask: '0 0 0 0 0 0',
};


export const MASK_BANK_CARD_NUMBER: AnyMaskedOptions = {
    mask: '0000 0000 0000 0000',
};

export const MASK_CODE_FOUR: AnyMaskedOptions = {
    mask: '0 0 0 0',
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

