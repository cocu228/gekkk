import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { BoxWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper";
import { ClientDetails } from "@/shared/(orval)api/gek/model";
import Loader from "@/shared/ui/loader";
import { CtxRootData } from "@/processes/RootContext";
import Button from "@/shared/ui/button/Button";

import styles from "../../styles.module.scss";

const infoList = ["name", "phone_number", "email", "citizenship", "residence_address"];

export function PersonalInformation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { account } = useContext(CtxRootData);
  const { getAccountDetails } = storeAccountDetails();
  const [userInfo, setUserInfo] = useState<ClientDetails>(null);

  useEffect(() => {
    (async () => {
      const details = await getAccountDetails();

      setUserInfo(details);
    })();
  }, [account]);

  const resetState = () => {
    navigate("/settings");
  };

  const userInfoKeys = {
    name: userInfo?.name,
    phone_number: userInfo?.phone,
    email: userInfo?.email,
    citizenship: userInfo?.citizenship,
    residence_address: userInfo?.address
  };

  return (
    <BoxWrapper className='w-full'>
      <div className={styles.perInfoBody}>
        {!userInfo ? (
          <Loader className='relative' />
        ) : (
          <>
            {infoList.map((item, ind) => (
              <div key={item} className={styles.perItem}>
                <h4 className={styles.perItemTitle}>{t(item)}:</h4>
                <h4 className={styles.perItemSubtitle}>{userInfoKeys[item]}</h4>
                {ind + 1 !== infoList.length && <hr />}
              </div>
            ))}
          </>
        )}
        <div className={styles.downBtnWrap}>
          <Button color='blue' className='w-full' onClick={resetState}>
            {t("back")}
          </Button>
        </div>
      </div>
    </BoxWrapper>
  );
}
