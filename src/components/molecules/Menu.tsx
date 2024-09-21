// src/components/MenuPage.tsx

import React, { useState, useEffect } from 'react';
import { menuSection } from '@/src/services';
import { MenuItem } from '../../data/types';
import { menuSelectionPl, menuSelectionEn } from '../../data/menuSelection';
import MenuItemComponent from './MenuItemComponent';
import '../../styles/Menu.css';

type Props = {
  language: string;
};

const MenuPage: React.FC<Props> = ({ language }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  // Set initial filterType to the first category's value
  const menuSelection = language === 'pl' ? menuSelectionPl : menuSelectionEn;
  const [filterType, setFilterType] = useState<string>(menuSelection[0].value);
  const [filterVegan, setFilterVegan] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menuSection();
        setMenuItems(response.menus[0].items);
        setFilteredItems(response.menus[0].items); // Initialize with all items
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  const applyFilters = () => {
    let filtered = [...menuItems];

    // Since 'all' is removed, always filter by type
    filtered = filtered.filter((item) => item.type === filterType);

    // Filter by vegan
    if (filterVegan !== null) {
      filtered = filtered.filter((item) => item.vegan === filterVegan);
    }

    setFilteredItems(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filterType, filterVegan, language, menuItems]);

  return (
    <div>
      {/* Filter Buttons */}
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

      {/* Menu Items */}
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
    </div>
  );
};

export default MenuPage;
