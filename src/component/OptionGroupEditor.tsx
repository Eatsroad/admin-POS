import React, { useState } from 'react';

interface props {
  onChange: () => any;
}

const OptionEditor = (props: any) => {
  return (
    <div>
      <h4>{props.option.name}</h4>
      <p>{props.option.price}</p>
    </div>
  );
};

const OptionGroupEditor: React.FC<props> = (props) => {
  const [optionGroup, setOptionGroup] = useState({
    name: '사이즈',
    maxSelect: 1,
    options: [
      { name: '일반', price: 0 },
      { name: '곱빼기', price: 0 },
    ],
  });

  const onChangeName = (e: any) => {
    const newName = e.target.value;
    setOptionGroup({ ...optionGroup, name: newName });
  };

  const onChangeMaxSelect = (e: any) => {
    const newMaxSelect = e.target.value;
    if (
      newMaxSelect < 1 ||
      newMaxSelect >
        (optionGroup.options.length === 0 ? 1 : optionGroup.options.length)
    )
      return;
    setOptionGroup({ ...optionGroup, maxSelect: newMaxSelect });
  };

  return (
    <div>
      <div>
        <input onChange={onChangeName} value={optionGroup.name} />
        <input
          type="number"
          onChange={onChangeMaxSelect}
          value={optionGroup.maxSelect}
        />
      </div>
      <div className="OptionList">
        {optionGroup.options.map((option) => {
          return <OptionEditor option={option} />;
        })}
      </div>
    </div>
  );
};

export default OptionGroupEditor;
