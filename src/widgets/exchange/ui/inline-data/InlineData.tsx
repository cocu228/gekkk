import styles from "./style.module.scss";

interface IParams {
  right: string;
  center: string;
  left: string;
}

const InlineData = ({ left, right, center }: IParams) => (
  <div className={styles.Container}>
    <div className={styles.Left}>{left}</div>
    <div className={styles.Center}>{center}</div>
    <div className={styles.Right}>{right}</div>
  </div>
);

export default InlineData;
