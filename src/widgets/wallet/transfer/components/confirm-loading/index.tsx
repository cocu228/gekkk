import { FC, ReactNode } from "react";

import Loader from "@/shared/ui/loader";

interface IConfirmLoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

const ConfirmLoading: FC<IConfirmLoadingProps> = ({ isLoading, children }) => (
  <div className='min-h-[200px]'>{isLoading ? <Loader className='justify-center' /> : children}</div>
);

export default ConfirmLoading;
