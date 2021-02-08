import React, { useState } from 'react';
import './index.scss';

import { useSelector } from 'react-redux';
import { RootState } from '@redux';
import Select from 'react-select';
import AddItem from './AddItem';

interface props {}

interface itemTileProps {
  title: string;
  price: string;
  description: string;
  categories: string[];
}

const ItemTile: React.FC<itemTileProps> = (props) => {
  return (
    <div className="ItemTile">
      <h3>{props.title}</h3>
      <p>{`${props.price}원`}</p>
      <p>{props.description}</p>
      <p>
        {props.categories.map((cat) => (
          <span key={cat} style={{ marginLeft: '7px' }}>
            {`#${cat}`}
          </span>
        ))}
      </p>
    </div>
  );
};

const Items: React.FC<props> = (props) => {
  const sortOptions = [
    { value: 'nameAcs', label: '이름 오름차' },
    { value: 'nameDes', label: '이름 내림차' },
    { value: 'priceDes', label: '높은 가격순' },
    { value: 'priceAcs', label: '낮은 가격순' },
    { value: 'mostOrdered', label: '주문 많은순' },
  ];
  const menu = useSelector((state: RootState) => state.Store.menu);
  const [selectedFilter, setSelectedFilter] = useState('전체보기');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

  const getOptions = () => {
    const categories = menu.categories.map((e) => {
      return { value: e.name, label: e.name };
    });
    return [
      {
        label: '기본',
        options: [
          { value: 'all', label: '전체보기' },
          { value: 'none', label: '카테고리 미지정' },
        ],
      },
      {
        label: '카테고리',
        options: [...categories],
      },
    ];
  };

  const categoryCustomStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '500px',
    }),
    group: (provided: any) => ({
      ...provided,
    }),
  };
  const sortCustomStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '200px',
    }),
  };

  const filterItems: (filter: string, items: any[]) => any[] = (
    filter,
    items
  ) => {
    if (filter === '전체보기') {
      return [...items];
    } else if (filter === '카테고리 미지정') {
      const filteredItems = items.filter((item) => {
        return item.categories.length === 0;
      });
      return filteredItems;
    } else {
      const filteredItems = items.filter((item) => {
        return item.categories.includes(filter);
      });
      return filteredItems;
    }
  };

  const sortItems: (sort: string, items: any[]) => any[] = (sort, items) => {
    let retArray: any[] = [];

    if (sort === 'nameAcs') {
      retArray = [
        ...items.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }),
      ];
    }
    if (sort === 'nameDes') {
      retArray = [
        ...items.sort((a, b) => {
          return -1 * a.name.localeCompare(b.name);
        }),
      ];
    }
    if (sort === 'priceAcs') {
      retArray = [
        ...items.sort((a, b) => {
          return a.price - b.price;
        }),
      ];
    }
    if (sort === 'priceDes') {
      retArray = [
        ...items.sort((a, b) => {
          return b.price - a.price;
        }),
      ];
    }

    return retArray;
  };

  const handleOnChangeFilter = (selection: any) => {
    setSelectedFilter(selection.label);
  };

  const handleOnChangeSort = (selection: any) => {
    setSelectedSort(selection.value);
  };

  const renderList = () => {
    const processedList = sortItems(
      selectedSort,
      filterItems(selectedFilter, menu.items)
    );
    const RetComponent =
      processedList.length === 0 ? (
        <div>아직 메뉴가 없네요. 추가해보세요</div>
      ) : (
        processedList.map((item) => (
          <ItemTile
            key={item.name}
            title={item.name}
            price={item.price}
            description={item.description}
            categories={item.categories}
          />
        ))
      );
    return RetComponent;
  };

  return (
    <div className="Items">
      <div className="Filter">
        <div>
          <div className="dorpdownLable">카테고리 선택</div>
          <Select
            options={getOptions()}
            defaultValue={getOptions()[0].options[0]}
            styles={categoryCustomStyles}
            onChange={handleOnChangeFilter}
          />
        </div>
        <div>
          <div className="dorpdownLable">정렬</div>
          <Select
            options={sortOptions}
            defaultValue={sortOptions[0]}
            styles={sortCustomStyles}
            onChange={handleOnChangeSort}
          />
        </div>
      </div>
      <div className="AddBtnContainer">
        <h3 className="CateogryTitle">{selectedFilter}</h3>
        <AddItem currentCategory={selectedFilter} />
      </div>
      <div className="List">{renderList()}</div>
    </div>
  );
};

export default Items;
