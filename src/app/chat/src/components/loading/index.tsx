import './index.css';
import style from './styles.module.scss'

type Props = {
  themeColor?: string;
};


export default function Loading({ themeColor }: Props) {

  return (
    <div className={style.Container} >
      <div className={style.ldsRing}>
        <div className={`${style.InternalDiv}`} style={{borderColor: themeColor && `${themeColor} transparent transparent`}} ></div>
        <div className={`${style.InternalDiv}`} style={{borderColor: themeColor && `${themeColor} transparent transparent`}} ></div>
        <div className={`${style.InternalDiv}`} style={{borderColor: themeColor && `${themeColor} transparent transparent`}} ></div>
      </div>
    </div>
  );
}

