import React, {useState} from 'react';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import PageHead from '@/shared/ui/page-head/PageHead';
import Exchange from '@/widgets/exchange/ui/Exchange';
import ParticipantsNumber from '@/shared/ui/participants-number/ParticipantsNumber';
import Modal from '@/shared/ui/modal/Modal';
import Button from '@/shared/ui/button/Button';
import History from '@/widgets/history/ui/History';

const RoomVisitor = (props) => {
    const [leaveRoomOpen, setLeaveRoomOpen] = useState<boolean>(false);

    const handleOpenLeaveRoom = () => {
        setLeaveRoomOpen(true);
    };

    const handleCloseLeaveRoom = () => {
        setLeaveRoomOpen(false);
    };

  return (
    <div className="wrapper">
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

export default RoomVisitor