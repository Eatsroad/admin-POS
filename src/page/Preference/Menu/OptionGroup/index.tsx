import React, { useState } from 'react';
import './index.scss';

import { useSelector } from 'react-redux';
import { RootState } from '@redux';
import AddOptioGroup from './AddOptionGroup';

interface props {}
interface optionGroupTileProps {
  name: string;
  options: any[];
}

const OptionGroups: React.FC<props> = (props) => {
  const menu = useSelector((state: RootState) => state.Store.menu);

  const OptionGroupTile = (props: optionGroupTileProps) => {
    const [expand, setExpand] = useState(false);
    return (
      <div className="OptionGroupTile">
        <div className="GroupName">
          <h3>{props.name}</h3>
          <div onClick={() => setExpand(!expand)}>
            {expand ? '접기' : '자세히 보기'}
          </div>
        </div>
        <div className={(expand ? '' : 'hide ') + 'OptionListContainer'}>
          {props.options.map((option) => {
            return (
              <OptionTile
                key={option.name}
                name={option.name}
                price={option.price}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const OptionTile = (props: any) => {
    return (
      <div className="option">
        <h4>{props.name}</h4>
        <p>{`${props.price}원`}</p>
      </div>
    );
  };

  return (
    <div className="OptionGroups">
      <div className="OptionGroupsHeader">
        <h3>옵션그룹 설정</h3>
        <AddOptioGroup />
      </div>
      <div className="OptionGroupsList">
        {menu.optionGroups.map((optionGroup) => {
          return (
            <OptionGroupTile
              key={optionGroup.name}
              name={optionGroup.name}
              options={optionGroup.options}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OptionGroups;
