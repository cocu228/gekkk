import {useState} from 'react';
import styles from './style.module.scss';
import IconCopy from '@/shared/ui/icons/IconCopy';

interface Props {
    value: string
}

function ClipboardField({value}: Props) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

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
        <div className={`flex bg-white items-center md:rounded-lg ${styles.CopyForm}`}>
            <input className={styles.Input} type="text" value={isCopied ? 'Copied!' : value} readOnly />
            <button className={styles.Btn} onClick={handleCopyClick}>
                <IconCopy/>
            </button>
        </div>
    );
}

export default ClipboardField;