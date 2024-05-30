import { useTranslation } from "react-i18next"
import styles from "./styles.module.scss"
import Button from "@/shared/ui/button/Button"
import {Switch as SwitchUi} from "@/shared/ui/!switch"
import { useNavigate } from "react-router-dom"
import { useBreakpoints } from "@/app/providers/BreakpointsProvider"
import { useState } from "react"

type Props = {}

export const GekkardPro = (props: Props) => {
    const {t} = useTranslation();
    const {md} = useBreakpoints();
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleSwitch = () => {
        setIsChecked(!isChecked);
    }

    const handleProceed = () => {
        // handle for proceed event
    }

    const handleBack = () => {
        navigate("/")
    }

    return (
    <div className={styles.ContainerWrapper}>
        <div className={`${styles.Container} ${!md && styles.ContainerDesktop}`}>
            <div className={styles.TextContainer}>
                <div className={`${styles.Title} ${!md && styles.DesktopTextLarge}`}>
                    {t("gekkard_pro.join_gekkard_pro")}
                </div>
                <div className={`${styles.Text} ${!md && styles.DesktopText}`}>
                    {t("gekkard_pro.text")}
                </div>
                <div className={styles.Accept}>
                    <div className={styles.Switch}>
                        <SwitchUi className="pointer-events-none" onChange={handleSwitch} />
                    </div>
                    <div className={`${styles.AcceptText} ${!md && styles.DesktopTextLarge}`}>
                        <span>
                            {t("gekkard_pro.i_accept")} <a href="https://gekkard.com/terms-and-conditions.html" className={styles.AcceptTextGreen}>{t("terms_and_conditions")}</a>
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.Buttons}>
                <Button
                    disabled={!isChecked}
                    onClick={handleProceed}
                    className={styles.ButtonsProceed}
                >
                    {t("proceed")}
                </Button>
                <Button
                    skeleton
                    onClick={handleBack}
                    className={styles.ButtonsBack}
                >
                    {t("back")}
                </Button>
            </div>
        </div>
    </div>
    )
}
