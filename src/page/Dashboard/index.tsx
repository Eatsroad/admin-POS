import React, { useState } from 'react';
import './index.scss';
import { DashboardSideBar } from '../../component';
import NewOrder from './NewOrderPage';
import TableViewPage from './TableViewPage';

const DashbaordRouter = () => {
  const [state, setState] = useState<number>(0);

  return (
    <div className="HomePage">
      <div className="main">
        <DashboardSideBar
          onClickNewMenu={() => {
            setState(0);
          }}
          onClickCompleted={() => {
            setState(1);
          }}
        />

        <div className="plane">
          {state === 0 ? <NewOrder /> : <TableViewPage />}
        </div>
      </div>
    </div>
  );
};

export default DashbaordRouter;
