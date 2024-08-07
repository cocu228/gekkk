const Rate = ({ val }: { val: (boolean | null)[] }) => (
  <div className='col'>
    <div className='flex items-center gap-2  md:flex-col'>
      <p className='text-gray-400 text-sm'>Return</p>
      <div className='flex gap-1'>
        {val.map((it, index) => (
          /* eslint-disable */
          <div
            key={index}
            className={`w-[0.5rem] h-[0.5rem]  ${
              it === null ? "bg-gray-200" : it ? "bg-green" : "bg-red-main"
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Rate;
