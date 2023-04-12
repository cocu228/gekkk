import React, {useState} from 'react';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import PageHead from '@/shared/ui/page-head/PageHead';
import History from '@/widgets/history/ui/History';
import Exchange from '@/widgets/exchange/ui/Exchange';
import ParticipantsNumber from '@/shared/ui/participants-number/ParticipantsNumber';
import Modal from '@/shared/ui/modal/Modal';
import InviteLink from '@/shared/ui/invite-link/InviteLink';
import Button from '@/shared/ui/button/Button';

const RoomCreator = (props) => {

    const [inviteLinkOpen, setInviteLinkOpen] = useState<boolean>(false);
    const [leaveRoomOpen, setLeaveRoomOpen] = useState<boolean>(false);

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

  return (
    <div className="wrapper">
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
            <div className="pt-5 text-sm">Are you sure you want to close the current EUR - XMR private exchange room?
                All unclosed orders will be canceled.
            </div>
            <div className="mt-16 sm:mt-14">
                <Button size="xl" className="w-full">Close private exchange room</Button>
            </div>
        </Modal>
    </div>
  );
}

export default RoomCreator