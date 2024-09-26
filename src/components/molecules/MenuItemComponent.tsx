import React, { useState, useEffect } from 'react';
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
  const [positionStyle, setPositionStyle] = useState<{
    left?: string;
    right?: string;
  }>({});

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 850) {
        // Desktop/Large tablet - enable positionStyle
        if (index % 2 === 0) {
          const randomLeft = Math.random() * (56 - 43) + 43;
          setPositionStyle({ left: `${randomLeft}%`, right: '0%' });
        } else {
          const randomRight = Math.random() * (3 - 0) + 0;
          setPositionStyle({ left: `${randomRight}%`, right: '0%' });
        }
      } else {
        // Mobile - disable positionStyle and center align
        setPositionStyle({});
      }
    };

    // Set initial position style and screen size
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [index]);

  const alignClass =
    index % 2 === 0 ? 'menuItem leftAlign' : 'menuItem rightAlign';

  const splitText = (text: string, maxLength: number) => {
    const words = text.split(' ');
    let result = [];
    let currentLine = '';

    for (let word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += word + ' ';
      } else {
        result.push(currentLine.trim());
        currentLine = word + ' ';
      }
    }
    if (currentLine.trim()) {
      result.push(currentLine.trim());
    }
    return result;
  };

  // Change the width to 350px
  const svgWidth = 350;

  // Adjust the split text to fit the 350px width (reduce line length accordingly)
  const ingredientLines = splitText(
    language === 'pl' ? item.składniki : item.ingridients,
    50 // Reduced from 70 to 50 to accommodate the narrower width
  );

  const allergenLines = splitText(
    language === 'pl' ? (item.alergeny ?? '') : (item.allergenes ?? ''),
    50 // Reduced similarly for allergens
  );

  // Alignment logic for text elements (leftAlign or rightAlign)
  const textAnchor = index % 2 === 0 ? 'start' : 'end';
  const startOffset = index % 2 === 0 ? '0%' : '100%';

  // Define constants for vertical spacing
  const labelYPosition = 30; // Y position of the labels
  const verticalSpacingAfterLabel = 20; // Vertical space after label
  const lineHeight = 20; // Height between lines
  const additionalVerticalSpacing = 20; // Additional space before allergens label

  const generatePathData = (startY: number) => {
    const width = svgWidth;
    const startX = 0;
    const endX = width;
    const endY = startY;
    const controlPointX = width / 2;
    const controlPointY = startY + (Math.random() - 0.5) * 20;
    return `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
  };

  // Calculate positions for ingredient lines
  const ingredientStartY = labelYPosition + verticalSpacingAfterLabel;

  // Calculate positions for allergen label and lines
  const allergenLabelYPosition =
    ingredientStartY +
    ingredientLines.length * lineHeight +
    additionalVerticalSpacing;
  const allergenStartY = allergenLabelYPosition + verticalSpacingAfterLabel;

  return (
    <div
      className={alignClass}
      style={{ width: `${svgWidth}px`, ...positionStyle }}
    >
      <div className="menuItemHeader">
        <p style={{ fontWeight: 'bold', width: `${svgWidth}px` }}>
          {language === 'pl' ? item.nazwa : item.name} - {item.price} zł
          {item.vegan && (
            <img src={'/tea.png'} alt="vegan" className="leafIcon" />
          )}
        </p>
      </div>

      <svg
        width={svgWidth}
        height={
          allergenStartY +
          allergenLines.length * lineHeight +
          verticalSpacingAfterLabel
        }
      >
        <defs>
          {/* Define paths for each ingredient line */}
          {ingredientLines.map((line, i) => (
            <path
              key={`ingredient-path-${i}`}
              id={`curvePath-ingredients-${item.name}-${i}`}
              d={generatePathData(ingredientStartY + i * lineHeight)}
              fill="transparent"
            />
          ))}

          {/* Define paths for each allergen line, if allergens exist */}
          {item.alergeny &&
            allergenLines.map((line, i) => (
              <path
                key={`allergen-path-${i}`}
                id={`curvePath-allergens-${item.name}-${i}`}
                d={generatePathData(allergenStartY + i * lineHeight)}
                fill="transparent"
              />
            ))}
        </defs>

        {/* Render Ingredient Label */}
        <text
          fontSize="14"
          y={labelYPosition}
          textAnchor={textAnchor}
          x={index % 2 === 0 ? 0 : svgWidth}
        >
          <tspan>{language === 'pl' ? 'Składniki:' : 'Ingredients:'}</tspan>
        </text>

        {/* Render Ingredient Lines */}
        {ingredientLines.map((line, i) => (
          <text key={i} fontSize="14">
            <textPath
              href={`#curvePath-ingredients-${item.name}-${i}`}
              startOffset={startOffset}
              textAnchor={textAnchor}
            >
              {line}
            </textPath>
          </text>
        ))}

        {/* Render Allergen Label and Lines if Allergens exist */}
        {item.alergeny && (
          <>
            <text
              fontSize="14"
              y={allergenLabelYPosition}
              textAnchor={textAnchor}
              x={index % 2 === 0 ? 0 : svgWidth}
            >
              <tspan>{language === 'pl' ? 'Alergeny:' : 'Allergens:'}</tspan>
            </text>
            {allergenLines.map((line, i) => (
              <text key={i} fontSize="14">
                <textPath
                  href={`#curvePath-allergens-${item.name}-${i}`}
                  startOffset={startOffset}
                  textAnchor={textAnchor}
                >
                  {line}
                </textPath>
              </text>
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

export default MenuItemComponent;
