import {useState} from 'react';
import styles from './style.module.scss';
import { IconApp } from '../icons/icon-app';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';

interface Props {
    value: string
}

function ClipboardField({value}: Props) {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const {md} = useBreakpoints()

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(value)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1000);
            })
            .catch((err) => {

            });
    }

    return (
        <div className={`flex bg-white items-center ${styles.CopyForm}`}>
            <input data-testid="crypto_tech_address" className={styles.Input} type="text" value={isCopied ? 'Copied!' : value} readOnly />
            <button className={styles.Btn} onClick={handleCopyClick}>
                <IconApp color='var(--gek-green)' size={md ? 15 : 22} code='t31'/>
            </button>
        </div>
    );
}

export default ClipboardField;