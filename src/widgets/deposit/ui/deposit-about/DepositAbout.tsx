import AboutFixed from '../deposit-fixed/about-fixed/AboutFixed';
import AboutStructured from '../deposit-structured/about-structured/AboutStructured';

const DepositAbout = ({type}) => {
  return (
    <div className="wrapper col-span-2 bg-white px-7 py-20 xl:hidden xxl:p-5">
      {type === 'structured' ? <AboutStructured/> : <AboutFixed />}
    </div>
  );
};

export default DepositAbout;
