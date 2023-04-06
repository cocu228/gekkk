import React from 'react';
import ModalInfoText from '@/shared/ui/modal/modal-info-text/ModalInfoText';
import Input from '@/shared/ui/input/Input';
import TokenSelect from '@/shared/ui/token-select/TokenSelect';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import Button from '@/shared/ui/button/Button';

function CreateRoom() {
    return (
        <div className="wrapper">
            <ModalInfoText>
                A private room allows you to exchange assets only
                with those members whom you invite through a special
                link. Trades in the private room will not be shared.
            </ModalInfoText>
            <div className="mt-4">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="sell-token">Want to sell</label>
                <TokenSelect
                    id="sell-token"
                    tokens={[
                        {
                            value: '1',
                            label: 'Gekkoin Europe (EURG)',
                            icon: '/img/icon/EurgIcon.svg'
                        },
                        {
                            value: '2',
                            label: 'XMR',
                            icon: '/img/icon/XmrIcon.svg'
                        },
                    ]}
                    defaultValue="1"
                    placeholder="Select the token"
                />
            </div>
            <div className="mt-2">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="get-token">Want to get</label>
                <TokenSelect
                    id="get-token"
                    tokens={[
                        {
                            value: '1',
                            label: 'Gekkoin Europe (EURG)',
                            icon: '/img/icon/EurgIcon.svg',
                            disabled: true
                        },
                        {
                            value: '2',
                            label: 'XMR',
                            icon: '/img/icon/XmrIcon.svg'
                        },
                    ]}
                    placeholder="Select the token"
                />
            </div>
            <div className="mt-7">
                <Checkbox disabled defaultChecked={true}>
                    <span className="text-sm">Only I can specify the sale price</span>
                </Checkbox>
            </div>
            <div className="mt-6">
                <label className="inline-flex mb-1 text-sm font-medium" htmlFor="">Purchase limit for one user</label>
                <Input placeholder="If it is empty, then the limit is not set"/>
            </div>
            <div className="mt-12 sm:mt-11">
                <Button disabled size="lg" className="w-full">Open private exchange room</Button>
            </div>
        </div>
    );
}

export default CreateRoom;