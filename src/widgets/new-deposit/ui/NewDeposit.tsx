import { useContext } from 'react';
import { CtxNewDeposit } from '../model/context';
import RowWrapper from './grid-wrappers/ColumnWrapper';
import RiskChoose from './steps/risk-choose/RiskChoose';
import TermChoose from './steps/term-choose/TermChoose';
import TypeChoose from './steps/type-choose/TypeChoose';
import TokenChoose from './steps/token-choose/TokenChoose';
import OpenDeposit from './steps/open-deposit/OpenDeposit';
import { DepositType } from '@/shared/config/deposits/types';
import BackgroundWrapper from './grid-wrappers/BackgroundWrapper';
import PersentageChoose from './steps/percentage-choose/PercentageChoose';
import TypeDescription from './descriptions/type-description/TypeDescription';
import TermDescription from './descriptions/term-description/TermDescription';
import RiskDescription from './descriptions/risk-descriptions/RiskDescription';
import DepositProperties from './descriptions/deposit-properties/DepositProperties';
import PersentageDescription from './descriptions/percentage-description/PersentageDescription';

function NewDeposit() {
    const { type, step } = useContext(CtxNewDeposit);

    return (
        <BackgroundWrapper>
            <RowWrapper>
                <TypeChoose />
                <TypeDescription />
            </RowWrapper>

            {type === DepositType.STRUCTED && <>
                {step >= 1 && (
                    <RowWrapper>
                        <RiskChoose />
                        <RiskDescription />
                    </RowWrapper>
                )}

                {step >= 2 && (
                    <RowWrapper>
                        <PersentageChoose />
                        <PersentageDescription />
                    </RowWrapper>
                )}

                {step >= 3 && (
                    <RowWrapper>
                        <TermChoose />
                        <TermDescription />
                    </RowWrapper>
                )}

                {step >= 4 && (
                    <RowWrapper>
                        <TokenChoose />
                    </RowWrapper>
                )}
            </>}

            <RowWrapper>
                <OpenDeposit />
                <DepositProperties className='px-7 xl:hidden xxl:p-5' />
            </RowWrapper>
        </BackgroundWrapper>
    );
}

export default NewDeposit;