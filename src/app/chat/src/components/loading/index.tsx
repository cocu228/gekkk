import styled from 'styled-components';
import './index.css';
import style from './styles.module.scss'

type Props = {
  themeColor?: string;
};

const InternalDiv = styled.div<{ themeColor?: string }>`
  box-sizing: border-box;
  width: 42px;
  height: 42px;
  margin: 8px;
  position: absolute;
  border: 6px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${({ themeColor }) => themeColor} transparent transparent
    transparent;
  box-sizing: border-box;
`;

export default function Loading({ themeColor }: Props) {

  return (
    <div className={style.Container} >
      <div className={style.ldsRing}>
        <InternalDiv themeColor={themeColor} />
        <InternalDiv themeColor={themeColor} />
        <InternalDiv themeColor={themeColor} />
        <InternalDiv themeColor={themeColor} />
      </div>
    </div>
  );
}
