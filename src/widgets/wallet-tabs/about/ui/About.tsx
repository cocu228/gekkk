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
                            currentTarget.src="/public/img/icon/EurgIcon.svg";
                        }}
                    />
                </div>

                <h1 className="font-bold text-base text-gray-dark">
                    {name}
                </h1>
            </div>

            <div className='text-gray'>
                {
                    // @ts-ignore
                    descriptions[currency]
                }
            </div>
        </div>
    );
};

export default About;
