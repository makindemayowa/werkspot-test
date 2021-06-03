import * as React from 'react';
import moment from 'moment';
import { actionType, useAppDispatch } from '../../context/app.context';
import { IListData, colors, tags } from '../../types';
import Card from './Card';
import { EditModalContent, useModal } from './Modal';

const Column = ({
  index,
  column,
}: {
  index: number;
  column: {
    columnName: string;
    rows: IListData[];
  };
}) => {
    const dispatch = useAppDispatch();
    const { hide, show, Modal } = useModal();
    const [errorMessage, setErrorMessage] = React.useState('');

    const submitEdit = (title: string, description: string) => {
        if (!title || !description) return setErrorMessage('Title and description fields cannot be empty');
        const nextweek = () => {
            const today = new Date();
            const nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
            return nextweek;
        }
        const newCard = {
            id: btoa(`${Math.random()}`).substring(0,12),
            title: title,
            description: description,
            tag: tags[Math.floor(Math.random() * tags.length)],
            assignee: 'Peter Drury',
            dueDate: moment(nextweek()).format('DD-MM-YYYY')
        };
        setErrorMessage('')
        hide()
        return dispatch({ type: actionType.ADD_NEW_CARD, data: { columnIndex: index, newCard } });
    }

    return (
        <div className="column">
            <div className="column-header">
                <span className="count" style={{ backgroundColor: colors[index] || '#90eebf' }}>
                    {column.rows.length}
                </span>
                <span className="title">{column.columnName}</span>
            </div>
            <div className="column-body">
                {column.rows.map((row, idx) => {
                    return (
                        <Card cardColumnIdx={index} row={row} cardIdx={idx} key={idx} />
                    )
                })}
                <div className="add-new-card" onClick={show}>
                    Add a new card
                </div>
                <Modal>
                    <EditModalContent hide={hide} submitEdit={submitEdit} errorMessage={errorMessage}/>
                </Modal>
            </div>
        </div>
    );
};

export default Column;
