import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import styles from "./styles.module.scss";
import Button from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface IParams {
    onBack: () => void;
}

const HowItWorks = ({onBack}: IParams) => {
    const { t } = useTranslation();
    const {md} = useBreakpoints()

    return (
        <div className="flex items-center justify-center">
          <div className={styles.Wrapper}>
            <p className={styles.Text}>{t("the_function_of_setting_disabling_limits_allows")}</p>
            <p className={styles.Text}>-{t("cash_withdrawal_from_the_card")}</p>
            <p className={styles.Text}>-{t("payment_of_purchases_on_the_card")}</p>
            <p className={styles.Text}>{t("day_limit")}</p>
            <p className={styles.Text}>{t("it_is_possible_to_indicate_the_maximum_amount_of_transactions")}</p>
            <p className={styles.Text}>{t("month_limit")}</p>
            <p className={styles.Text}>{t("here_it_is_possible_to_indicate_the_amount_of_expenses")}</p>
            <p className={styles.Text}>{t("temporarily_disable_limits")}</p>
            <p className={styles.Text}>{t("to_temporarily_deactivate_daily_and_monthly_limits")}</p>
            
            <div className={styles.ButtonContainer}>
              <Link
                to={md ? '/card-menu' : '/wallet?currency=EUR&tab=bank_cards'}
                className="w-full max-w-[120px]"
              >
                <Button
                  color="blue"
                  onClick={onBack}
                  className="w-full"
                >
                  {t("back")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
    );
}

export default HowItWorks;
