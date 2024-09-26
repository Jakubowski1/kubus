import React, { useState, useEffect, Fragment } from 'react';
import { menuSection } from '@/src/services';
import { MenuItem } from '../../data/types';
import { menuSelectionPl, menuSelectionEn } from '../../data/menuSelection';
import MenuItemComponent from './MenuItemComponent';
import '../../styles/Menu.css';
import Footer from '../atoms/Footer';

type Props = {
  language: string;
};

const MenuPage: React.FC<Props> = ({ language }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  const menuSelection = language === 'pl' ? menuSelectionPl : menuSelectionEn;
  const [filterType, setFilterType] = useState<string>(menuSelection[0].value);
  const [filterVegan, setFilterVegan] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menuSection();
        setMenuItems(response.menus[0].items);
        setFilteredItems(response.menus[0].items);
        applyFilters();
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  const applyFilters = () => {
    let filtered = [...menuItems];

    filtered = filtered.filter((item) => item.type === filterType);

    if (filterVegan !== null) {
      filtered = filtered.filter((item) => item.vegan === filterVegan);
    }

    setFilteredItems(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterType, filterVegan, language, menuItems]);

  return (
    <Fragment>
      <div className="selectionContainer">
        {menuSelection.map((selection, index) => (
          <button
            key={index}
            className={filterType === selection.value ? 'active' : 'nonactive'}
            onClick={() => setFilterType(selection.value)}
          >
            {selection.label}
          </button>
        ))}
      </div>

      <div className="menuSection">
        {filteredItems.map((item, index) => (
          <MenuItemComponent
            key={item.name}
            item={item}
            index={index}
            language={language}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default MenuPage;
