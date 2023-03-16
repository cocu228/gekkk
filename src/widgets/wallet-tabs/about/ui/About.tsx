import descriptions from '@/shared/config/coins/descriptions'

type AboutParams = {
    currency: string,
    name: string
}

const About = ({currency, name}: AboutParams) => {

    return (
        <div>
            <div className="flex mb-[22px] items-center">
                <div className="mr-4 h-[50px] w-[50px]">
                    <img
                        src={`/public/img/icon/${currency}Icon.svg`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src='/public/img/icon/HelpIcon.svg';
                            currentTarget.height = 50;
                            currentTarget.width = 50;
                        }}
                    />
                </div>

                <h1 className="font-bold text-base text-gray-dark">
                    {name}
                </h1>
            </div>

            <div className='text-gray text-sm font-medium'>
                {
                    // @ts-ignore
                    descriptions[currency]?? `Description for this token is not done yet.`
                }
            </div>
        </div>
    );
};

export default About;
