import React, { useState } from 'react';
import Select from 'react-select';
import { ArrayUtil } from '@util';

import './ItemFilter.scss';

interface props {
  options: string[];
}
interface ToggleBtnProp {
  title: string;
  selected: boolean;
  onUpdate: any;
}

const ToggleBtn = (props: ToggleBtnProp) => {
  const handleOnClick = () => {
    if (props.selected) {
      props.onUpdate('remove', props.title);
    } else {
      props.onUpdate('add', props.title);
    }
  };

  return (
    <div
      className={`toggleBtn${props.selected ? ' selectedToggleBtn' : ''}`}
      onClick={handleOnClick}
    >
      {props.title}
    </div>
  );
};

const ItemFilter: React.FC<props> = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const updateSelectedOptions = (action: string, option: string) => {
    if (action === 'remove') {
      setSelectedOptions([...ArrayUtil.remove(selectedOptions, option)]);
    } else if (action === 'add') {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleResetFilter = () => {
    setSelectedOptions([]);
  };

  const handleSelectAll = () => {
    setSelectedOptions([...props.options]);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div className="ItemFilter">
      {props.options.map((option) => (
        <ToggleBtn
          title={option}
          onUpdate={updateSelectedOptions}
          selected={selectedOptions.includes(option)}
          key={option}
        />
      ))}
      <div onClick={handleResetFilter}>리셋</div>
      <div onClick={handleSelectAll}>모두 선택</div>
      <div onClick={() => console.log(selectedOptions)}>log</div>
      <Select options={options} />
    </div>
  );
};

export default ItemFilter;
