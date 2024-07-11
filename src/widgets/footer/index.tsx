import { FC } from "react";

interface IFooterProps {
  textAlight: string;
}

const Footer: FC<IFooterProps> = () => (
  <footer className='py-4'>
    {/*<div className='row mb-2 px-4'>
      <span className={`${textAlight} text-gray-500 font-semibold text-sm w-full block`}>
        © Gekkard. v.{import.meta.env.VITE_APP_VERSION}
      </span>
    </div>
    <div className='wrapper px-4'>
      <p className={`${textAlight} text-gray-400 font-medium leading-4 text-xs`}>
        Crypto exchange service is powered by AtlantEX OU (licensed partner for crypto wallet and exchange)
      </p>
    </div>*/}
  </footer>
);

export default Footer;
