import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IValidatorCreator } from "@/shared/config/validators";
import { CtxInputCurrencyValid } from "@/shared/ui/input-currency/model/context";
import { isNull } from "@/shared/lib/helpers";
import { IconApp } from "@/shared/ui/icons/icon-app";

interface IParams {
  value: number;
  className?: string;
  description?: string;
  availableNullable?: boolean;
  children?: ReactNode;
  validators: Array<IValidatorCreator>;
  onError?: (value: boolean) => void;
}

const Validator: FC<IParams> = ({
  value = 0,
  availableNullable = false,
  children,
  className,
  description,
  validators = [],
  onError = (_: boolean) => {}
}: IParams) => {
  const { t } = useTranslation();
  const firstEffect = useRef(true);
  const [error, setError] = useState<null | string | JSX.Element>(null);
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    if (firstEffect.current) {
      firstEffect.current = false;
    } else {
      if ((value ?? 0) === 0 && !availableNullable) {
        setError(t("null_value"));
        onError(true);
      } else {
        const isValid = validators.every(validate => {
          const result = validate(value ?? 0);
          if (!result.validated) {
            setError(result.errorMessage);
            onError(true);
            setShowDescription(true);
            return false;
          }
          return true;
        });

        if (isValid) {
          setError(null);
          onError(false);
          setShowDescription(value.toString().length === 0);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    const valid = `${parseInt(`${value}`)}`.length < 16;
    onError(!valid);
  }, [value]);

  const isMaxAmountCount = `${parseInt(`${value}`)}`.length < 16;
  const Helpers = ({ text }: { text: string | JSX.Element }) => (
    <span className='text-[var(--gek-orange)] text-fs12'>*{text}</span>
  );

  return (
    <div>
      <CtxInputCurrencyValid.Provider value={!isNull(error)}>
        {children}
        <div className={`flex ml-[5px] ${className}`}>
          {error ? (
            <div className='flex gap-1 items-center'>
              <div className='mt-[1px]'>
                <IconApp color='var(--gek-red)' code='t27' size={13} />
              </div>
              <span className='text-[var(--gek-red)] text-fs12'>{error}</span>
            </div>
          ) : !isMaxAmountCount ? (
            <Helpers text={t("maximum_amount_count")} />
          ) : !!description && showDescription ? (
            <Helpers text={description} />
          ) : null}
        </div>
      </CtxInputCurrencyValid.Provider>
    </div>
  );
};

export default Validator;
