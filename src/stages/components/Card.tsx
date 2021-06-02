import * as React from 'react';
import { IListData } from '../../types';
import categoryIcon from '../../images/category.svg';
import calendarIcon from '../../images/calendar.svg';
import filterList from '../../images/filter-list.svg';
import checkedCircleIcon from '../../images/checked-circle.svg';
import { actionType, useAppDispatch, useAppState } from '../../context/app.context';

interface ICardProps {
    row: IListData;
    cardColumnIdx: number,
    cardIdx: number
}

interface IListButtonProps { 
  label: string;
  columnIdx: number;
}

export default function Card({
    row,
    cardColumnIdx,
    cardIdx
}: ICardProps) {
  const { title, description, dueDate, tag } = row;
  const [showNextColumn, toggleNextColumn] = React.useState(false);
  const { toDos, searchString } = useAppState()

  const ListButton = ({ label, columnIdx }: IListButtonProps) => {
    const dispatch = useAppDispatch();
    const originalIdx = cardColumnIdx;
    const nextIdx = columnIdx;
    const onSelect = () => {
      toggleNextColumn(false);
      return dispatch({ type: actionType.UPDATE_CARD_COLUMN, data: { cardIdx, originalIdx, nextIdx } });
    };
    return (
      <button onClick={onSelect} className="list-item">
        <img src={checkedCircleIcon} alt="checked circle" />
        <span className="label">{label}</span>
      </button>
    );
  };
  
  const NextColDropdown = () => {
    return (
      <div className="dropdown">
        <div>Move Card to:</div>
        <ul>
          {
            toDos.map((todo, idx) => cardColumnIdx !== idx && 
              <li key={todo.columnName}>
                <ListButton label={todo.columnName} columnIdx={idx} />
              </li>
            )
          }
        </ul>
      </div>
    );
  };

  return (
    <div className='card'>
        {
          (toDos.length > 1 && !searchString) &&
          <div className="item-cont">
              <button
                  onClick={() => toggleNextColumn(!showNextColumn)}
                  className="item"
              >
                  <img src={filterList} alt="Move to new column" />
              </button>
              {showNextColumn && <NextColDropdown />}
          </div>
        }
        <span className="card-title">{title}</span>
        <p className="description">{description}</p>
        <div className="tag">
            <img src={categoryIcon} alt="category" />
            <span className="tag-value">{tag}</span>
        </div>
        <div className="tag date">
            <img src={calendarIcon} alt="calendar_today" />
            <span className="tag-value">{dueDate}</span>
        </div>
    </div>
  );
}
