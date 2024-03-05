import styles from "./style.module.scss"

interface Props {
    title: React.ReactNode,
    subtitle: React.ReactNode,
    rightContent: React.ReactNode
}

function PageHead({title, subtitle, rightContent}: Partial<Props>) {

    return (
        <div className={styles.MainContainer}>
            <div className={styles.Container}>
                <div className="wrapper">
                    <h1 className={styles.Title}>{title}</h1>
                    <p className={styles.SubTitle}>{subtitle}</p>
                </div>
                {rightContent && (
                    <div className={styles.RightContent}>
                        {rightContent}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageHead;