import { Form } from "antd";
import { memo, useState } from "react";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { apiApplyCode } from "@/shared/(orval)api/gek";
import { promoCodeMessage } from "@/shared/config/message";
import useValidation from "@/shared/model/hooks/useValidation";
import { validateStatus } from "@/features/promo-code/model";
import { containsNonLatinCharacters } from "@/widgets/history/model/helpers";
import { useTranslation } from "react-i18next";

const PromoCode = memo(() => {
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
      <div className="py-10 px-8 md:px-0 md:pb-0">
        <Form onFinish={onSubmit}>
          <h2 className="text-[var(--color-gray-600)] font-bold text-lg mb-10">
            {t("header_menu.enter_promo_code")}
          </h2>

          <Form.Item
            hasFeedback
            preserve
            className="mb-2"
            name={"promo-code"}
            help={message}
            validateStatus={validateStatus(isCodeApplied)}
            rules={[
              { required: true, ...promoCodeMessage },
              promoCodeValidator,
            ]}
          >
            <Input
              allowDigits
              type={"text"}
              suffix={false}
              value={valInput}
              disabled={loading}
              onChange={handlerInput}
            />
          </Form.Item>

          <Button
            htmlType={"submit"}
            className={"w-full mt-10"}
            disabled={
              valInput === "" ||
              loading ||
              isCodeApplied ||
              containsNonLatinCharacters(valInput)
            }
          >
            {t("apply")}
          </Button>
        </Form>
      </div>
    </>
  );
});

export default PromoCode;
