
import { FormEvent, memo, useState } from "react";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { apiApplyCode } from "@/shared/(orval)api/gek";
import { useTranslation } from "react-i18next";
import buttonStyles from "@/widgets/wallet/transfer/withdraw/ui/forms/styles.module.scss";
import { IconApp } from "@/shared/ui/icons/icon-app";
import style from './styles.module.scss';

interface IProps{
  handleCancel: () => void
}

const PromoCode = memo(({handleCancel}: IProps) => {
  const { t } = useTranslation();
  const [valInput, setValInput] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCodeApplied, setIsCodeApplied] = useState<boolean | null>(null);
  const [err, setErr] = useState(false)

  const handlerInput = ({ target }) => {
    setValInput(target.value);
    if (message) {
      setMessage(null);
      setIsCodeApplied(null);
    }
  };

  const onClick = () => {
    navigator.clipboard.readText().then(text =>{
      setValInput(text)
    })
  }

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const { data } = await apiApplyCode({
      code: valInput,
    });

    setMessage(
      data.error ? data.error.message : "The code is successfully applied"
    );
    if(data.error) {
      setErr(true)
    } else if(data.error == undefined || !data.error) {
      setErr(false)
    }
    setIsCodeApplied(data.error === null);
    setLoading(false);
  };

  return (
    <>
      <div className="px-3 md:pb-0">
        <div className="w-full h-[1px] bg-[#29354c]"></div>
        <form onSubmit={onSubmit} >
        <div className={`wrapper my-6 ${buttonStyles.ModalInfo}`}>
            <div className={buttonStyles.ModalInfoIcon}>
                <div className="col">
                    <IconApp code="t27" size={15} color="#8F123A"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <span className={buttonStyles.ModalInfoText}>
                        {t("this_code_can_be_used")}
                    </span>
                </div>
            </div>
        </div>
          <div className={style.InputWrap}>
              <Input
                allowDigits
                bordered={false}
                type={"text"}
                wrapperClassName="w-full"
                className="text-[10px] text-[var(--gek-mid-grey)]"
                placeholder={"-" + t("header_menu.enter_promo_code").toLowerCase()+ "-"}
                suffix={false}
                value={valInput}
                disabled={loading}
                onChange={handlerInput}
              />

              <div className={style.IconsWrap}>
                {
                  err ? (
                    <IconApp code="t26" size={20} color="#ff4d4f" />
                  ) : !err && valInput.length ? (
                    <IconApp code="t57" size={20} color="#45AD77" />
                  ) : null
                }
                <IconApp onClick={onClick} code="t28" className="mr-2 cursor-pointer" color="#285E69" size={18}/>
              </div>
          </div>
          <div className={`${style.HelpMessage} ${err && style.HelpMessageRed}`}>{message}</div>
          <div className={buttonStyles.ButtonContainer}>
            <Button
              htmlType="submit"
              className={buttonStyles.ButtonTwo}
              disabled={
                valInput === "" ||
                loading ||
                isCodeApplied
              }
            >
              {t("confirm")}
            </Button>
            <Button
              skeleton
              className={buttonStyles.ButtonTwo}
              onClick={handleCancel}
            >
              {t("cancel")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
});

export default PromoCode;
