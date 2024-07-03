import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { QualityType, IControlState } from "@/pages/support/components/quality-control/types";
import Textarea from "@/shared/ui/textarea";
import Button from "@/shared/ui/button/Button";

const QualityControl: FC = () => {
  const { t } = useTranslation();
  const [currentStar, setCurrentStar] = useState<number>(0);
  const [quality, setQuality] = useState<QualityType | null>(null);
  const [control, setControl] = useState<IControlState| null>(null)

  const handleOnQuality = (qualityType: QualityType) => () => {
    setQuality(prev => prev === qualityType ? null : qualityType)
  }
  const handleOnRating = (rating: number) => () => {
    setControl(prev => ({ ...prev, rating }))
  }

  const handleOnMessage = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setControl(prev => ({ ...prev, message: target.value }))
  }

  const handleOnMouseEnter = (star: number) => () => {
    setCurrentStar(star)
  }

  const handleOnMouseLeave = () => {
    setCurrentStar(0)
  }

  const getRatingIconCode = (star: number) => {
    if (control?.rating && star <= control.rating) {
      return star <= control.rating ? "t84" : "t85";
    }
    return star <= currentStar ? "t84" : "t85"
  }

  const handleOnSubmit = () => {
    console.log(control);
  }

  return (
    <div className="control-container">
      <div className="control-main">
        <p className="control-main-title">{t("support.quality_control")}</p>
        <div className="control-main-body">
          <IconApp
            code='t49'
            size={27}
            color={quality === "LIKE" ? "var(--gek-green)" : "#9D9D9D"}
            onClick={handleOnQuality("LIKE")}
          />
          <IconApp
            code='t49'
            size={27}
            color={quality === "DISLIKE" ? "var(--gek-red)" : "#9D9D9D"}
            onClick={handleOnQuality("DISLIKE")}
          />
        </div>
        <p className="control-main-footer">{t("support.thank_you_for_rating")}!</p>
      </div>
      <div className={`control-form-fade ${quality ? "active" : ""}`}>
        <div className="control-form">
          <p className="control-form-title">{t("support.rate_quality")}</p>
          <div className="control-form-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <div
                key={star}
                onClick={handleOnRating(star)}
                onMouseEnter={handleOnMouseEnter(star)}
                onMouseLeave={handleOnMouseLeave}
              >
                <IconApp
                  size={20}
                  color={getRatingIconCode(star) === "t85" ? "var(--gek-additional)" : "var(--gek-green)"}
                  code={getRatingIconCode(star)}
                />
              </div>
            ))}
          </div>
          <p className="control-form-title">{t("support.quality_improvement")}:</p>
          <Textarea
            allowDigits
            name="message"
            placeholder={t("support.quality_improvement_placeholder")}
            className={"py-[9px]"}
            textareaClassName={"text-fs12"}
            value={control?.message || ""}
            onChange={handleOnMessage}
          />
          <Button onClick={handleOnSubmit}>
            {t("send")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QualityControl;