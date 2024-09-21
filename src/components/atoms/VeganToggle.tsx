import React from 'react';
import '../../styles/VeganToggle.css';

type Props = {
  language: string;
  filterVegan: boolean | null;
  setFilterVegan: (value: boolean | null) => void;
};

const VeganToggle: React.FC<Props> = ({
  language,
  filterVegan,
  setFilterVegan,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <input
        type="checkbox"
        checked={filterVegan === true}
        onChange={() => {
          setFilterVegan(filterVegan === true ? null : true);
        }}
      />
      <div> Vege</div>
    </div>
  );
};

export default VeganToggle;
