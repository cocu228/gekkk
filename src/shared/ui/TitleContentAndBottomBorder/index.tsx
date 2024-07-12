import styles from "./styles.module.scss";

export type TitleContentAndBottomBorderProps = React.PropsWithChildren<{
  title: React.ReactNode;
}>;
export function TitleContentAndBottomBorder({ children, title }: TitleContentAndBottomBorderProps) {
  return (
    <div className={styles.box}>
      <span className={styles.boxTitle}>{title}</span>
      <div className={styles.childrenWrap}>{children}</div>
    </div>
  );
}
