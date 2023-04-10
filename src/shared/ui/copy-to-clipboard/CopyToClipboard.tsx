import React, {useState} from 'react';
import styles from './style.module.scss';
import IconCopy from '@/shared/ui/icons/IconCopy';

interface Props {
    text: string
}

function CopyToClipboard({text}: Props) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(text)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {

            });
    }

    return (
        <div className={`flex items-center ${styles.CopyForm}`}>
            <input className={styles.Input} type="text" value={isCopied ? 'Copied!' : text} readOnly />
            <button className={styles.Btn} onClick={handleCopyClick}>
                <IconCopy/>
            </button>
        </div>
    );
}

export default CopyToClipboard;