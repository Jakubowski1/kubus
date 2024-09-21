// src/components/MenuItemComponent.tsx

import React, { useState } from 'react';
import { MenuItem } from '../../data/types';
import '../../styles/Menu.css';

type MenuItemComponentProps = {
  item: MenuItem;
  index: number;
  language: string;
};

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  item,
  index,
  language,
}) => {
  const ingredientsPathId = `curvePath-ingredients-${item.name}`;
  const allergensPathId = `curvePath-allergens-${item.name}`;

  // Generate random slight curve paths once per component instance
  const [ingredientsPathData] = useState(() => {
    const width = 300; // Adjusted width
    const startX = 0;
    const startY = 20;
    const endX = width;
    const endY = 20;
    const controlPointX = width / 2;
    const controlPointY = 20 + (Math.random() - 0.5) * 20; // Slight random curve
    return `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
  });

  const [allergensPathData] = useState(() => {
    const width = 300; // Adjusted width
    const startX = 0;
    const startY = 40;
    const endX = width;
    const endY = 40;
    const controlPointX = width / 2;
    const controlPointY = 40 + (Math.random() - 0.5) * 20; // Slight random curve
    return `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
  });

  // Generate random position once per component instance
  const [positionStyle] = useState(() => {
    if (index % 2 === 0) {
      const randomLeft = Math.random() * (56 - 47) + 47; // Random between 47% and 56%
      return { left: `${randomLeft}%` };
    } else {
      const randomRight = Math.random() * (7 - 0) + 0; // Random between 0% and 7%
      return { right: `${randomRight}%` };
    }
  });

  const alignClass =
    index % 2 === 0 ? 'menuItem leftAlign' : 'menuItem rightAlign';

  return (
    <div className={alignClass} style={positionStyle}>
      {/* Name, Price, and Vegan Icon */}
      <div className="menuItemHeader">
        <p style={{ fontWeight: 'bold' }}>
          {language === 'pl' ? item.nazwa : item.name} - {item.price} zł
          {item.vegan && (
            <img src={'/tea.png'} alt="vegan" className="leafIcon" />
          )}
        </p>
      </div>

      {/* Ingredients and Allergens with Curved Text */}
      <svg width="300" height="60">
        <defs>
          {/* Paths for Ingredients and Allergens */}
          <path
            id={ingredientsPathId}
            d={ingredientsPathData}
            fill="transparent"
          />
          {item.alergeny && (
            <path
              id={allergensPathId}
              d={allergensPathData}
              fill="transparent"
            />
          )}
        </defs>

        {/* Ingredients */}
        <text fontSize="14">
          <textPath href={`#${ingredientsPathId}`} startOffset="0">
            {language === 'pl' ? 'Składniki' : 'Ingredients'}:{' '}
            {language === 'pl' ? item.składniki : item.ingridients}
          </textPath>
        </text>

        {/* Allergens */}
        {item.alergeny && (
          <text fontSize="14">
            <textPath href={`#${allergensPathId}`} startOffset="0">
              {language === 'pl' ? 'Alergeny' : 'Allergens'}:{' '}
              {language === 'pl' ? item.alergeny : item.allergenes}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default MenuItemComponent;
