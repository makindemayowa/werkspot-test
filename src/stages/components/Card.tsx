import * as React from 'react';
import { IListData } from '../../types';
import categoryIcon from '../../images/category.svg';
import calendarIcon from '../../images/calendar.svg';
import sdotsIcon from '../../images/3dots.svg';
import checkedCircleIcon from '../../images/checked-circle.svg';
import editIcon from '../../images/edit-icon.svg';
import removeIcon from '../../images/remove-icon.svg';
import { actionType, useAppDispatch, useAppState } from '../../context/app.context';
import { EditModalContent, useModal } from './Modal';

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
  const [showCardDropdown, toggleCardDropdown] = React.useState(false);
  const { toDos, searchString } = useAppState();
  
  const dispatch = useAppDispatch();

  const ListButton = ({ label, columnIdx }: IListButtonProps) => {
    const originalIdx = cardColumnIdx;
    const nextIdx = columnIdx;
    const onSelect = () => {
      toggleCardDropdown(false);
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
    const { hide, show, Modal } = useModal();
  
    const closeModal = () => {
      hide();
      toggleCardDropdown(false);
    }

    const submitEdit = (title: string, description: string) => {
      const updatedCard = Object.assign(row, {
        title: title ? title : row.title,
        description: description ? description : row.description
      })
      dispatch({ type: actionType.EDIT_CARD, data: { cardIdx, cardColumnIdx, updatedCard } });
      toggleCardDropdown(false);
      return hide();
    }

    const submitDelete = () => {
      dispatch({ type: actionType.DELETE_CARD, data: { cardIdx, cardColumnIdx } });
      return hide();
    }
  
    return (
      <div className="dropdown">
        <div className="edit-icon-container" onClick={show}>
          <img src={editIcon} alt="edit icon" />
          <span>
            Edit Card
          </span>
        </div>
        <div className="edit-icon-container" onClick={submitDelete}>
          <img src={removeIcon} alt="delete icon" />
          <span>
            Delete Card
          </span>
        </div>
        <Modal>
          <EditModalContent hide={closeModal} row={row} submitEdit={submitEdit} />
        </Modal>
        {
          toDos.length > 1 && <div>

          <div>Move Card to:</div>
            <ul>
              {
                toDos.map((todo, idx) => cardColumnIdx !== idx && 
                  <li key={todo.columnName} className="dropdown-li-item">
                    <ListButton label={todo.columnName} columnIdx={idx} />
                  </li>
                )
              }
            </ul>
          </div>
        }
      </div>
    );
  };

  return (
    <div className='card'>
        {
          !searchString &&
          <div className="item-cont">
              <button
                  onClick={() => toggleCardDropdown(!showCardDropdown)}
                  className="item"
              >
                  <img src={sdotsIcon} alt="dropdown icon" />
              </button>
              {showCardDropdown && <NextColDropdown />}
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
