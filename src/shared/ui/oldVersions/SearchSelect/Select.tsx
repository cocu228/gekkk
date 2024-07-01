import {FC, MutableRefObject, useEffect, useRef, useState} from 'react'
import style from './styles.module.scss'
import { CurrencyFlags } from '@/shared/config/mask-currency-flags';
import { IconCoin } from '../../icons/icon-coin';
import { SelectItem } from './SelectItem';
import { useTranslation } from 'react-i18next';

interface SelectProps {
    className?: string;
    allowedFlags?: Array<CurrencyFlags>;
    disabledCurrencies?: Array<string>;
    onSelect: (value: string) => void;
    list: any[];
    placeholderText?: string
    isToken?: boolean,
    tokenId?: string;
}

export const Select:FC<SelectProps> = ({
    disabledCurrencies,
    placeholderText,
    list,
    onSelect,
    isToken,
    tokenId
}) => {
    const [active, setActive] = useState(false)
    const [emptyData, setEmptyData] = useState(false)
    const [selected, setSelected] = useState(null)
    const [inpValue, setInpValue] = useState('')
    const [placeholder, setPlaceholder] = useState(placeholderText)
    const {t} = useTranslation()

    const bodyRef = useRef(null)

    const useOutsideAlerter = (ref: MutableRefObject<HTMLElement | null>) => {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setActive(false)
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    useOutsideAlerter(bodyRef);

    const [filteredList, setFilteredList] = useState(list)

    useEffect(() => {
        const filtered = list.filter(item => item.name.toLocaleLowerCase().includes(inpValue.toLowerCase()));

        if(inpValue.length === 1 && filtered.length === 0) {
            setFilteredList(list)
        }

        setFilteredList(filtered)
    }, [inpValue])

    useEffect(() => {
        if(inpValue.length >= 1) {
            setPlaceholder('')
        } else {
            setPlaceholder(`-${t("select")}-`)
        }
    }, [inpValue])

    useEffect(() => {
        if(selected) {
            setInpValue('')
            setFilteredList(list)
        }
    }, [selected])

    useEffect(() => {
        if(filteredList.length < 1) {
            setEmptyData(true)
        } else {
            setEmptyData(false)
        }
    }, [filteredList])

    return (
        <div ref={bodyRef} className={`${style.SelectWrap} ${active && style.SelectActive}`} >
            <div className={style.SelectedBody} onClick={() => setActive(!active)} >
                {selected && isToken && <IconCoin width={22} className={style.SelectedToken} code={tokenId} />}
                {
                    selected && inpValue.length === 0 ? (
                        <span className={`${style.SelectedTitle} ${inpValue.length >=1 && style.SelectedTitleDisabled}`}>{selected}</span>
                    ) : (
                        <span className={style.SelectPlaceholder}>{placeholder.toLowerCase()}</span>
                    )
                }
                <input value={inpValue} onChange={(e) => {
                    setInpValue(e.target.value)
                }} className={`${style.SelectInput} ${isToken && selected && style.SelectInputActiveToken} ${selected && style.SelectInputActive}`} />
            </div>
            <div className={style.SelectList}>
                {
                    filteredList
                    .map((item) => (
                        <SelectItem setVisibility={setActive} isToken={isToken} selectTitle={setSelected} onSelect={onSelect} disabled={disabledCurrencies?.includes(item.id)} item={item} />
                    ))
                }
                {
                    emptyData && <div className={style.EmptyDataBlock}>{t("not_found")}</div>
                }
            </div>
        </div>
    )
}