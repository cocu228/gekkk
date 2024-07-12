import { useSearchParams } from "react-router-dom";

import History from "@/widgets/history/ui/History";
import CustomHistory from "@/widgets/custom-history/ui/CustomHistory";
import Wrapper from "@/shared/ui/wrapper";

const HistoryPage = () => {
  const [params] = useSearchParams();
  const tab = params.get("tab");

  return (
    <Wrapper className='wrapper px-[10px] pt-[15px]'>
      {tab !== "custom" ? <History includeFiat /> : <CustomHistory />}
    </Wrapper>
  );
};

export default HistoryPage;
