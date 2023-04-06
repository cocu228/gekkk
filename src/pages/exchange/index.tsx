import React, {useState} from 'react';
import SplitGrid from '@/shared/ui/split-grid/SplitGrid';
import PageHead from '@/shared/ui/page-head/PageHead';
import Exchange from '@/widgets/exchange/ui/Exchange';
import Dropdown from '@/shared/ui/dropdown/Dropdown';
import DropdownItem from '@/shared/ui/dropdown/dropdown-item/DropdownItem';
import IconPrivateRoom from '@/shared/ui/icons/IconPrivateRoom';
import Modal from '@/shared/ui/modal/Modal';
import CreateRoom from '@/widgets/create-room/CreateRoom';
import History from '@/widgets/history/ui/History';

export default () => {
  const [createRoomOpen, setCreateRoomOpen] = useState<boolean>(false);

  const handleOpenCreateRoom = () => {
    setCreateRoomOpen(true);
  };

  const handleCloseCreateRoom = () => {
    setCreateRoomOpen(false);
  };

  return (
    <div className="wrapper">
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

      <Modal width={450} title="Open private exchange room" open={createRoomOpen} onCancel={handleCloseCreateRoom}>
        <CreateRoom/>
      </Modal>
    </div>
  );
}