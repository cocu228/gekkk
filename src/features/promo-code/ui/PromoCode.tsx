import { Form } from "antd";
import { memo, useState } from "react";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/!button/Button";
import { apiApplyCode } from "@/shared/(orval)api/gek";
import { promoCodeMessage } from "@/shared/config/message";
import useValidation from "@/shared/model/hooks/useValidation";
import { validateStatus } from "@/features/promo-code/model";
import { useTranslation } from "react-i18next";
import buttonStyles from "@/widgets/wallet/transfer/withdraw/ui/forms/styles.module.scss"
import { IconApp } from "@/shared/ui/icons/icon-app";

interface IProps{
  handleCancel: () => void
}

const PromoCode = memo(({handleCancel}: IProps) => {
  const { t } = useTranslation();
  const [valInput, setValInput] = useState("");
  const { promoCodeValidator } = useValidation();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCodeApplied, setIsCodeApplied] = useState<boolean | null>(null);

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

  const onSubmit = async () => {
    setLoading(true);
    const { data } = await apiApplyCode({
      code: valInput,
    });

    setMessage(
      data.error ? data.error.message : "The code is successfully applied"
    );
    setIsCodeApplied(data.error === null);
    setLoading(false);
  };

  return (
    <>
      <div className="px-8 px-3 md:pb-0">
        <Form onFinish={onSubmit}>
          
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

          <Form.Item
            hasFeedback
            preserve
            className="mb-7"
            name={"promo-code"}
            help={message}
            validateStatus={validateStatus(isCodeApplied)}
            rules={[
              { required: true, ...promoCodeMessage },
              promoCodeValidator,
            ]}
          >
            <div className="flex flex-row justify-between items-center border-[1px] border-solid rounded-[8px] border-[color:var(--gek-mid-grey)]">
              <Input
                allowDigits
                bordered={false}
                type={"text"}
                wrapperClassName="w-full"
                className="text-[10px] text-[color:var(--gek-mid-grey)]"
                placeholder={"-" + t("header_menu.enter_promo_code").toLowerCase()+ "-"}
                suffix={false}
                value={valInput}
                disabled={loading}
                onChange={handlerInput}
              />

              <IconApp onClick={onClick} code="t28" className="mr-2 cursor-pointer" color="#285E69" size={18}/>
            </div>

          </Form.Item>

          <div className={buttonStyles.ButtonContainer}>
            <Button
              color="green"
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
              color="green"
              className={buttonStyles.ButtonTwo}
              onClick={handleCancel}
            >
              {t("cancel")}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
});

export default PromoCode;
