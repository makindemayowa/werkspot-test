import * as React from 'react';
import moment from 'moment';
import { actionType, useAppDispatch } from '../../context/app.context';
import { IListData, colors, tags } from '../../types';
import Card from './Card';

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
    const [newCardTitle, setNewCardTitle] = React.useState('');
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCardTitle(event.target.value)
    };
    const createNewCard = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextweek = () => {
            const today = new Date();
            var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
            return nextweek;
        }
        const newCard = {
            id: btoa(`${Math.random()}`).substring(0,12),
            title: newCardTitle,
            description: 'Description goes here',
            tag: tags[Math.floor(Math.random() * tags.length)],
            assignee: 'Peter Drury',
            dueDate: moment(nextweek()).format('DD-MM-YYYY')
        };
        setNewCardTitle('');
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
                <div className="add-new-card">
                    <form onSubmit={createNewCard}>
                        <input
                            value={newCardTitle}
                            onChange={onChange}
                            type="text"
                            placeholder="Add a new card...hit enter when done"
                        />
                    </form>      
                </div>
            </div>
        </div>
    );
};

export default Column;
