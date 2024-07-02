import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const SupportLinks: FC = () => {
  const { md } = useBreakpoints();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnFaq = () => {
    navigate("/faq")
  }

  const handleOnChat = () => {
    document.getElementById("chat").classList.toggle("isOpen")
  }

  return (
    <div className="support-links-container">

      <div className="support-links-inner">
        {/* Chat Us */}
        <div className="support-links-layout md:order-3" onClick={handleOnChat}>
          <IconApp code="t25" color="#285E69" size={30} />
          <div>
            <p className="support-link-title">{t("chat_us")}</p>
            <p className="support-link-subtitle">{t("how_can_we_help")}</p>
          </div>
          {md ? <IconApp code="t08" size={12} color="#285E69" /> : null}
        </div>

        {/* Telegram */}
        <a href="https://t.me/gek_support" className="support-links-layout md:order-4">
          <IconApp code="t51" color="#285E69" size={30} />
          <div>
            <p className="support-link-title">Telegram ({t("crypto_wallet").toLowerCase()})</p>
            <p className="support-link-subtitle">{t("contact_crypto")}</p>
          </div>
          {md ? <IconApp code="t08" size={12} color="#285E69" /> : null}
        </a>

        {/* Email */}
        <a href="mailto:support@gekkard.com" className="support-links-layout md:order-2" target="_blank">
          <IconApp code='t29' color='#285E69' size={30} />
          <div>
            <p className="support-link-title">{t("EMAIL")}</p>
            <p className="support-link-subtitle">{t("write_email_to_support")}</p>
          </div>
          {md ? <IconApp code="t08" size={12} color="#285E69" /> : null}
        </a>

        {/* FAQ */}
        <div className="support-links-layout md:order-1" onClick={handleOnFaq}>
            <IconApp code='t50' color='#285E69' size={30} />
            <div>
              <p className="support-link-title">{t("FAQ")}</p>
              <p className="support-link-subtitle">{t("answers_to_common_questions")}</p>
            </div>
            {md ? <IconApp code="t08" size={12} color="#285E69" /> : null}
        </div>

      </div>

      <p>*{t("response_time_up_to", { hours: 24 })}</p>
    </div>
  )
}

export default SupportLinks;