import {FC, useState} from 'react';
import styles from './style.module.scss';
import {Select, SelectProps} from 'antd';

interface IParams {
    prefixIcon?: JSX.Element;
    isMobile?: boolean;
    transfers?: boolean
}

const SearchSelect: FC<IParams & SelectProps> = ({prefixIcon, isMobile, children, transfers, ...props}) => {
    const [, setValue] = useState<string>(props.value);
    
    const handleChange = (val, option) => {
        setValue(val);

        if (props.onChange) props.onChange(val, option);
    };
    
    return (
        <div className={`${isMobile ? styles.SelectMobile :styles.Select} ${transfers && styles.TransfersSelect} ${prefixIcon ? styles.SelectHasIcon : ''}`}>
            {prefixIcon && <div className={styles.SelectIcon}>
                {prefixIcon}
            </div>}
            
            <Select
                {...props}
                showSearch
                className={`${(prefixIcon) ? styles.SelectSearchActive : ''} ${styles.SelectSearch}`}
                popupClassName={styles.SelectPopup}
                style={{width: '100%'}}
                optionLabelProp="label"
                onChange={handleChange}
                suffixIcon={false}
                filterOption={(input, option) =>  
                    option.props.label.toLowerCase().replaceAll(' ', '').indexOf(input.replaceAll(' ', '').toLowerCase()) >= 0 
                    || option.props.value.toLowerCase().replaceAll(' ', '').indexOf(input.replaceAll(' ', '').toLowerCase()) >= 0
                }
            >
                {children}
            </Select>
        </div>
    );
}

export default SearchSelect;
