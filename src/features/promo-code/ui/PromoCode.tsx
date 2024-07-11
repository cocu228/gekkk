
import { FormEvent, memo, useState } from "react";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { apiApplyCode } from "@/shared/(orval)api/gek";
import { useTranslation } from "react-i18next";
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
        <form onSubmit={onSubmit} >
        <div className={`flex gap-2 wrapper my-6`}>
            <span className="content-center">
                <IconApp code="t27" size={15} color="#8F123A"/>
            </span>
            <span className="text-[14px] text-[var(--gek-dark-grey)] font-normal">
              {t("this_code_can_be_used")}
            </span>
        </div>
          <div className={style.InputWrap}>
              <Input
                allowDigits
                type={"text"}
                className="text-[10px] text-[var(--gek-mid-grey)]"
                placeholder={t("header_menu.enter_promo_code").toLowerCase()}
                suffix={<div className={style.IconsWrap}>
                    {
                        err ? (
                            <IconApp code="t26" size={20} color="#ff4d4f"/>
                        ) : !err && valInput.length ? (
                            <IconApp code="t57" size={20} color="#45AD77"/>
                        ) : null
                    }
                    <IconApp onClick={onClick} code="t28" className="mr-2 cursor-pointer" color="#285E69" size={18}/>
                </div>}
                value={valInput}
                disabled={loading}
                onChange={handlerInput}
              />
          </div>
          
          <div className={`${style.HelpMessage} ${err && style.HelpMessageRed}`}>{message}</div>
          
          <div className={"flex justify-evenly md:gap-2"}>
            <Button
              htmlType="submit"
              className="w-full"
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
              className="w-full"
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
