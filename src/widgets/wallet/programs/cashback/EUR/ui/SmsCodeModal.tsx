import { BreakpointsContext } from '@/app/providers/BreakpointsProvider';
import { CtxRootData } from '@/processes/RootContext';
import { ActiveBonusProgram, apiConfirmationDeals, apiInitDeal, DealErrorStatusResp } from '@/shared/api/bank/deals';
import { MASK_CODE_FOUR } from '@/shared/config/mask';
import { formatAsNumber } from '@/shared/lib/formatting-helper';
import useMask from '@/shared/model/hooks/useMask';
import { storeDeals } from '@/shared/store/deals/deals';
import Button from '@/shared/ui/button/Button';
import Loader from '@/shared/ui/loader';
import Modal from '@/shared/ui/modal/Modal';
import { Form, Input } from 'antd';
import { AxiosResponse } from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { DealTurn } from '../model/helpers';

interface Props {
  cashbackId: ActiveBonusProgram;
  isModalOpen: boolean;
  handleCancel: () => void;
  action: 'stop' | 'start';
}


const SmsCodeModal = ({ cashbackId, isModalOpen, handleCancel, action }: Props) => {

  const abortControllerRef = useRef<AbortController>(new AbortController());
  const actionRef = useRef('');

  const { account } = useContext(CtxRootData);
  const { md } = useContext(BreakpointsContext);

  // const toggleDeal = storeDeals(state => state.toggleDeal);



  const { onInput } = useMask(MASK_CODE_FOUR);

  const [smsCode, setSmsCode] = useState('');
  const [message, setMessage] = useState(null);
  const [isCodeApplied, setIsCodeApplied] = useState<boolean | null>(null);
  const [confirmationToken, setConfirmationToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const actionTurn = DealTurn[cashbackId][action];



  useEffect(() => {
    actionRef.current = action;

    const controller = abortControllerRef.current;

    (async () => {
      setIsLoading(true);


      try {

        await apiInitDeal(account.account_id, actionTurn, controller.signal)
          .then(({data}) => {
            const token = (data && data.errors && data.errors[0].code === 449) ? data.errors[0].properties.confirmationToken : null;
            console.log(token)
            setConfirmationToken(token)
          })

      } catch (err) {
        if (!controller.signal.aborted) {
          console.log("ERROR", err.message)
        }
      } finally {
        setIsLoading(false);
      }
    })()

    return () => {controller.abort()};

  }, [])


  const handlerInput = ({ target }) => {
    setSmsCode(target.value);
    if (message) {
      setMessage(null);
      setIsCodeApplied(null);
    };
  }

  const onSubmit = async () => {
    setIsLoading(true);


    await apiConfirmationDeals(
      account.account_id,
      actionTurn,
      {
        "X-Confirmation-Token": confirmationToken,
        "X-Confirmation-Code": formatAsNumber(smsCode),
      }
    )
      .then(({data}: AxiosResponse<DealErrorStatusResp>) => {
          setMessage(data.errors
            && data.errors[0].properties.ErrorApi
          );

          setIsCodeApplied(data.errors !== null);
          // toggleDeal(cashbackId);
      })
 
    setIsLoading(false);
  }

  return (
    <Modal
      onCancel={handleCancel}
      open={isModalOpen}
      padding={false}
    >
      {!isCodeApplied 
      ? (
        <>
            <h4 className={`font-extrabold text-center text-gray-600 pb-4
          ${md ? 'text-2xl' : 'text-header'}`}>One-time code</h4>
            <p className='text-center mb-4 text-gray-500'>
              {`Enter code we've sent you by SMS to ${action} bonus program.`}
            </p>
            {action === 'stop'
              && <p className='text-center mb-8 text-gray-500'>
                In accordance with Terms and Conditions, your bonus program will be terminated after 30 days upon request.
              </p>
            }

            {!isLoading
              ? <Form onFinish={onSubmit}>
                  <Form.Item
                    preserve
                    className="mb-8"
                    name={"sms-code"}
                    help={message}
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="text"
                      placeholder="Phone code"
                      onInput={onInput}
                      value={smsCode}
                      onChange={handlerInput}
                      className="text-center text-xl"
                    />
                  </Form.Item>
                  <div className="flex gap-4 mt-4">
                    <Button
                      gray
                      className='basis-2/4'
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>

                    <Button
                      htmlType={"submit"}
                      className='basis-2/4'
                      disabled={smsCode.length < 7}
                    >
                      Apply
                    </Button>
                  </div>
              </Form>
              : <div className='relative min-h-[151px]'>
                <Loader />
              </div>
            }
        </>
      )
      : (
          <div className='h-full flex items-center justify-center min-h-[338px] text-xl'>Program {actionRef.current}ed!</div>
      )
    }
      
    </Modal>
  );
}

export default SmsCodeModal;