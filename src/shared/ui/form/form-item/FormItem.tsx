import {memo, PropsWithChildren} from 'react';
import {FormItemProps, Form} from "antd";
import styles from './style.module.scss';

interface Props extends FormItemProps {
    hiddenLabel?: boolean;
    noMargin?: boolean;
}

const {Item} = Form;

const FormItem = memo<PropsWithChildren<Props>>(({hiddenLabel = true, noMargin = true, className = '', ...props}): JSX.Element | null => {
    return <Item className={`${className} ${hiddenLabel ? styles.FormItemHideLabel : ''} ${hiddenLabel ? styles.FormItemNoMargin : ''}`} {...props} />;
});

export default FormItem;