import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import GTable from "@/shared/ui/grid-table";
import { actionResSuccess, uncoverResponse } from "@/shared/lib/helpers";
import { formatForCustomer } from "@/shared/lib/date-helper";
import { CtxRootData } from "@/processes/RootContext";
import { apiGetReferrals } from "@/shared/(orval)api/gek";
import { ReferralOut } from "@/shared/(orval)api/gek/model";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

const TableReferrals = () => {
  const { t } = useTranslation();
  const { account } = useContext(CtxRootData);
  const [state, setState] = useState<ReferralOut | null>(null);
  const { md } = useBreakpoints();

  useEffect(() => {
    (async () => {
      const response = await apiGetReferrals();
      actionResSuccess(response).success(() => {
        setState(uncoverResponse(response));
      });
    })();
  }, [account]);

  return (
    <>
      {state === null ? (
        <GTable>
          <GTable.Head className={"bg-[#DCDCD9] rounded-t-[8px] p-1"}>
            <GTable.Row className='flex'>
              <GTable.Col className={`flex my-2 justify-start ${md ? "pl-[40px]" : "pl-[130px]"}`}>
                <span className=' text-[12px] text-[--gek-additional] font-semibold'>
                  {t("partnership_program.id")}
                </span>
              </GTable.Col>
              <GTable.Col className={`flex my-2 justify-end ${md ? "pr-[40px]" : "pr-[110px]"}`}>
                <span className='text-[12px] text-[--gek-additional] font-semibold'>
                  {t("partnership_program.registration_date")}
                </span>
              </GTable.Col>
            </GTable.Row>
          </GTable.Head>
          <GTable.Body loading={state === null} className={"bg-[#F9F9FA] p-4"}>
            {state?.referrals.map(item => (
              <GTable.Row key={item.client_id}>
                <GTable.Col className={`flex my-2`}>
                  <span className='text-gray-600 font-medium'>{item.client_id}</span>
                </GTable.Col>
                <GTable.Col className={`flex my-2`}>
                  <span className='text-gray-600 font-medium'>{formatForCustomer(item.reg_date)}</span>
                </GTable.Col>
              </GTable.Row>
            ))}
          </GTable.Body>
        </GTable>
      ) : (
        <div className='flex justify-center items-center h-[35px] w-full bg-white text-base font-semibold text-[--gek-additional] rounded-md mt-2 md:text-[12px]'>
          {t("no_have_any_rewards")}
        </div>
      )}
    </>
  );
};

export default TableReferrals;
