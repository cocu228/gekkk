import { useState } from "react";

import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import useCopyStore from "@/shared/store/useCopy/useCopyStore";

import styles from "./style.module.scss";
import { IconApp } from "../icons/icon-app";

interface Props {
  value: string;
}

function ClipboardField({ value }: Props) {
  const [, setIsCopiedF] = useState<boolean>(false);
  const { md } = useBreakpoints();
  const { setIsCopied } = useCopyStore();

  const copyTextToClipboard = async text => {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  const handleCopyClick = () => {
    setIsCopied(true);
    copyTextToClipboard(value).then(() => {
      setIsCopiedF(true);
      setTimeout(() => {
        setIsCopiedF(false);
      }, 1000);
    });
  };

  return (
    <div className={`flex bg-white items-center ${styles.CopyForm}`}>
      <input data-testid='crypto_tech_address' className={styles.Input} type='text' value={value} readOnly />
      <button className={styles.Btn} onClick={handleCopyClick}>
        <IconApp color='var(--gek-green)' size={md ? 15 : 22} code='t31' />
      </button>
    </div>
  );
}

export default ClipboardField;
