import {FC, useState} from 'react';
import styles from './style.module.scss';
import {Select, SelectProps} from 'antd';
import IconDoubleArrows from '@/shared/ui/icons/IconDoubleArrows';

interface IParams {
    prefixIcon?: JSX.Element;
}

const SearchSelect: FC<IParams & SelectProps> = ({prefixIcon, children, ...props}) => {
    const [value, setValue] = useState<string>(props.value);
    
    const handleChange = (val, option) => {
        setValue(val);

        if (props.onChange) props.onChange(val, option);
    };
    
    return (
        <div className={styles.Select}>
            {prefixIcon && <div className={styles.SelectIcon}>
                {prefixIcon}
            </div>}
            
            <Select
                {...props}
                showSearch
                className={`${styles.SelectSearch} ${(prefixIcon) ? styles.SelectSearchActive : ''}`}
                popupClassName={styles.SelectPopup}
                style={{width: '100%'}}
                optionLabelProp="label"
                onChange={handleChange}
                suffixIcon={<IconDoubleArrows />}
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
