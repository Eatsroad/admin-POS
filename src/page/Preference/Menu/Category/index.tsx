import React from 'react';
import './index.scss';

import { useSelector } from 'react-redux';
import { RootState } from '@redux';
import AddCategoryModal from './AddCategoryModal';

interface props {}

interface CategoryProps {
  name: string;
  description: string;
}

const Category = (props: CategoryProps) => {
  return (
    <div className="CategoryTile">
      <h3>{props.name}</h3>
      <p>{props.description}</p>
    </div>
  );
};

const Categories: React.FC<props> = (props) => {
  const categories = useSelector(
    (state: RootState) => state.Store.menu.categories
  );

  return (
    <div className="CategoryPreference">
      <div className="header">
        <h3>카테고리 설정</h3>
        <AddCategoryModal />
      </div>
      <div className="CategoryList">
        {categories.map((e) => {
          return (
            <Category name={e.name} description={e.description} key={e.name} />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
