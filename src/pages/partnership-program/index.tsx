import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import ClipboardField from "@/shared/ui/clipboard-field/ClipboardField";
import TableReferrals from "@/widgets/partnership-program/TableReferrals";
import { actionResSuccess, uncoverResponse } from "@/shared/lib/helpers";
import History from "@/widgets/history/ui/History";
import { apiGetAgentCode } from "@/shared/(orval)api/gek";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxRootData } from "@/processes/RootContext";

import styles from "./style.module.scss";
// import Footer from "@/widgets/footer";

const ContentDescription = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<string>("");
  const { md } = useContext(BreakpointsContext);
  const { account } = useContext(CtxRootData);
  useEffect(() => {
    (async () => {
      const response = await apiGetAgentCode();
      actionResSuccess(response).success(() => {
        setState(uncoverResponse(response));
      });
    })();
  }, [account]);

  return (
    <>
      {md && (
        <div className={styles.AgentCodeMobile}>
          <div className={`row mb-2 mt-[10px] ml-2`}>
            <div className='col'>
              <h4 className='font-semibold text-[12px] ml-[10px] text-[--gek-additional] '>
                {t("partnership_program.agent_code")}:
              </h4>
            </div>
          </div>
          <div className={`row flex justify-center`}>
            <div className={`col w-[95%]`}>
              <ClipboardField value={state} />
            </div>
          </div>
          <div className={`row mb-2 mt-6 ml-2`}>
            <div className='col'>
              <h4 className='font-semibold text-[12px] ml-[10px] text-[--gek-additional] '>
                {t("partnership_program.agent_link")}:
              </h4>
            </div>
          </div>
          <div className={`row mb-3 flex justify-center`}>
            <div className={`col w-[95%]`}>
              <ClipboardField value={`https://web.gekkard.com/agent?code=${state}`} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ContentMain = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<string>("");
  const { md } = useContext(BreakpointsContext);
  const { account } = useContext(CtxRootData);
  useEffect(() => {
    (async () => {
      const response = await apiGetAgentCode();
      actionResSuccess(response).success(() => {
        setState(uncoverResponse(response));
      });
    })();
  }, [account]);

  return (
    <>
      {!md && (
        <div>
          <div className='pt-[10px]'>
            <div className='col'>
              <h4 className='font-bold text-[12px] pl-[10px] text-[--gek-additional] '>
                {t("partnership_program.agent_code")}:
              </h4>
            </div>
          </div>
          <div className={`row pt-[5px] mb-8`}>
            <div className={`col`}>
              <ClipboardField value={state} />
            </div>
          </div>
          <div className=''>
            <div className='col'>
              <h4 className='font-bold text-[12px] pl-[10px] text-[--gek-additional] '>
                {t("partnership_program.agent_link")}:
              </h4>
            </div>
          </div>
          <div className={`row mb-8 pt-[5px]`}>
            <div className={`col`}>
              <ClipboardField value={`${import.meta.env.VITE_GEKKARD_URL}/agent?code=${state}`} />
            </div>
          </div>
        </div>
      )}
      <div className='row mb-[10px] mt-[10px] ml-[18px]'>
        <div className='col'>
          <h4 className={`font-semibold ${md ? "text-[12px]" : "text-[14px]"} `}>
            {t("partnership_program.referrals_info")}
          </h4>
        </div>
      </div>
      <div className='row mb-[10px] '>
        <div className='col'>
          <TableReferrals />
        </div>
      </div>

      {md && (
        <>
          <div className='row ml-[18px]'>
            <div className='col'>
              <h4 className='font-semibold text-[12px]'>{t("partnership_program.rewards")}</h4>
            </div>
          </div>

          <div className={`row mb-[200px]`}>
            <div className='col'>
              <History types={[17]} />
            </div>
          </div>
        </>
      )}
      {/* {md&&
            <div className={`z-[-100] row ${md&&"bg-[#F9F9FA] absolute bottom-[38px] w-full left-[0]"}`}>
                <Footer textAlight='text-center'/>
            </div>
        } */}
    </>
  );
};

const PartnershipProgram = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { xl, md } = useContext(BreakpointsContext);
  const [isOnPage] = useState("agent/partnership_program");

  // TODO: fix agent locales and text paddings
  return (
    <div className='wrapper min-h-[100vh] w-full '>
      {md ? (
        <div className=' flex justify-between ml-[18px] pb-[10px] text-[12px] font-semibold'>
          {t("partnership_program.agent_info")}
          <a
            className='text-[10px] text-[--gek-additional] underline'
            onClick={() => navigate("/faq?faqSection=partnership_program", { state: "/partnership-program" })}
          >
            {t("how_it_works")}
          </a>
        </div>
      ) : (
        <div>
          <div className='flex bg-white p-[30px] rounded-[8px]'>
            <IconApp code={"t17"} size={40} color={"#3A5E66"} />
            <div className='flex-col pl-[40px]'>
              <div className='text-[20px] text-[#3A5E66] font-bold'>{t("header_menu.partnership")}</div>
              <div className='text-[14px] text-[#3A5E66] '>{t("partnership_program.rewards")}</div>
            </div>
          </div>
          <div className='pt-[10px]'>
            <TabsGroupPrimary initValue={isOnPage}>
              <div data-tag={"agent/partnership_program"} data-name={t("header_menu.partnership")} />
            </TabsGroupPrimary>
          </div>
        </div>
      )}
      <div className='wrapper grid min-h-[600px] grid-cols-2 xl:grid-cols-1 xl:gap-0'>
        <div
          className={`${!md ? "substrate shadow-[0_3px_4px_#00000040]" : "-ml-4 -mr-4 pl-4 pr-4"} col-span-1  z-10 `}
        >
          {!md && (
            <div className='flex text-[14px] text-[--gek-dark-blue] font-semibold'>
              {t("partnership_program.agent_info")}
            </div>
          )}
          {xl && <ContentDescription />}
          <ContentMain />
        </div>
        {!xl && (
          <div
            className={`substrate text-sm h-full shadow-[0_3px_4px_#00000040] z-0 col-span-1 text-gray-600 ${
              !md ? "max-h-[1280px] -xxl:pl-16 -xxl:pr-20 -xxxl:pl-16 -xxxl:pr-24 overflow-auto" : ""
            }`}
          >
            <ContentDescription />
            <div className={`row ${md && "mb-[200px]"}`}>
              <div className='col'>
                <History types={[17]} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnershipProgram;
