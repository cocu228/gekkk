const Card = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div
    className='
            bg-white
            p-[16px]
            rounded-[4px]
            hover:bg-gradient-to-br
            hover:from-white
            hover:to-[#DEE2E7]
            shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]
            hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]
            min-h-[126px]
            min-w-[200px]
            max-w-[310px]
            flex
            flex-col
            transition-all
        '
  >
    {children}
  </div>
);

export default Card;
