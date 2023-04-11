import AboutFixed from '../deposit-fixed/about-fixed/AboutFixed';
import AboutStructured from '../deposit-structured/about-structured/AboutStructured';

const DepositAbout = ({variant}) => {
  return (
    <div className="wrapper col-span-2 bg-white px-7 py-20 xl:hidden xxl:p-5">
      {variant === 'structured' ? <AboutStructured/> : <AboutFixed />}
    </div>
  );
};

export default DepositAbout;
