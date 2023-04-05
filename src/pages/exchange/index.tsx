import React, {useState} from 'react';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import PageHead from '@/shared/ui/page-head/PageHead';
import History from '@/widgets/history/ui/History';
import Exchange from '@/widgets/exchange/ui/Exchange';
import Dropdown from '@/shared/ui/dropdown/Dropdown';
import DropdownItem from '@/shared/ui/dropdown/dropdown-item/DropdownItem';
import IconPrivateRoom from '@/shared/ui/icons/IconPrivateRoom';
import ParticipantsNumber from '@/shared/ui/participants-number/ParticipantsNumber';
import Modal from '@/shared/ui/modal/Modal';
import InviteLink from '@/shared/ui/invite-link/InviteLink';
import {Button} from 'antd';
import CreateRoom from '@/widgets/create-room/CreateRoom';

export default () => {
  const [inviteLinkOpen, setInviteLinkOpen] = useState<boolean>(false);
  const [leaveRoomOpen, setLeaveRoomOpen] = useState<boolean>(false);
  const [createRoomOpen, setCreateRoomOpen] = useState<boolean>(false);

  const handleOpenInviteLink = () => {
    setInviteLinkOpen(true);
  };

  const handleCloseInviteLink = () => {
    setInviteLinkOpen(false);
  };

  const handleOpenLeaveRoom = () => {
    setLeaveRoomOpen(true);
  };

  const handleCloseLeaveRoom = () => {
    setLeaveRoomOpen(false);
  };

  const handleOpenCreateRoom = () => {
    setCreateRoomOpen(true);
  };

  const handleCloseCreateRoom = () => {
    setCreateRoomOpen(false);
  };

  return (
    <div className="wrapper">

      {/*Default header*/}
      <PageHead
        title={
          <Dropdown
            trigger={
              <span>Exchange</span>
            }
            items={[
              {
                key: '1',
                label: (
                  <DropdownItem onClick={handleOpenCreateRoom} icon={<IconPrivateRoom/>}>
                    Create private exchange room
                  </DropdownItem>
                )
              }
            ]}
          />
        }
        subtitle={"Cryptocurrency exchange - fast and easily"}
      />

      {/*Room header - creator*/}
      <PageHead
        title="EURG - XMR: exchange room"
        subtitle={
          <>
            You are owner of this private room. A Gekkoin user will be able to join your room using this&nbsp;
            <button className="underline text-accent" onClick={handleOpenInviteLink}>invite link</button>
          </>
        }
        rightContent={
          <ParticipantsNumber
            quantity={1}
            showIcon
            onLeave={handleOpenLeaveRoom}
          />
        }
      />

      {/*Room header - user*/}
      <PageHead
        title="EURG - XMR: participant of exchange room"
        subtitle="Private exchange room"
        rightContent={
          <ParticipantsNumber
            quantity={1}
            onLeave={handleOpenLeaveRoom}
          />
        }
      />

      <SplitGrid
        leftColumn={
          <div className="py-5 px-10 lg:px-5 md:px-4">
            <Exchange/>
          </div>
        }
        rightColumn={
          <div className="py-5 px-10 lg:px-5 md:px-4">
            <History/>
          </div>
        }
      />

      <Modal width={450} title="Invite link" open={inviteLinkOpen} onCancel={handleCloseInviteLink}>
        <InviteLink link="gekkoin.com/+rewrlnvnk987323 "/>
      </Modal>

      <Modal width={450} title="Close private exchange room" open={leaveRoomOpen} onCancel={handleCloseLeaveRoom}>
        <div className="pt-5 text-sm">Are you sure you want to close the current EUR - XMR private exchange room? All unclosed orders will be canceled.</div>
        <div className="mt-16 sm:mt-14">
          <Button size="large" className="w-full">Close private exchange room</Button>
        </div>
      </Modal>

      <Modal width={450} title="Open private exchange room" open={createRoomOpen} onCancel={handleCloseCreateRoom}>
        <CreateRoom/>
      </Modal>
    </div>
  );
}