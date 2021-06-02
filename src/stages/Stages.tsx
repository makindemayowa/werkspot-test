import * as React from 'react';
import { ITodoData } from '../types';
import Column from './components/Column';
import './index.scss';
import { actionType, useAppDispatch, useAppState } from '../context/app.context';

export default function Stages() {
    const dispatch = useAppDispatch();
    const { toDos, searchString } = useAppState();
    const [newListValue, setNewListValue] = React.useState('');
    const [columns, setColumns] = React.useState<ITodoData[]>(toDos);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewListValue(event.target.value)
    };

    React.useEffect(() => {
        if (searchString) {
            setColumns(toDos);
            const arrToFilter = Array.from(columns);
            const updatedColumns = arrToFilter.map((arr) => {
                return ({
                    columnName: arr.columnName,
                    rows: arr.rows.filter((row) =>
                        row.title.toLowerCase().includes(searchString.toLowerCase()))
                })
            })
            setColumns(updatedColumns);
        } else {
            setColumns(toDos);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString, toDos])

    const createNewColumn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newColumn = {
            columnName: newListValue,
            rows: []    
        };
        const updatedColumn = [...columns, newColumn];
        setNewListValue('');
        setColumns(updatedColumn);
        return dispatch({ type: actionType.SET_TODOS, data: updatedColumn });
    }

    return (
        <div className="stages">
            {
                columns.map((column: ITodoData, idx: number) => {
                    return (
                        <Column index={idx} column={column} key={idx} />
                    )
                })
            }
            <div className="column">
                <div className="add-new-list">
                    <form onSubmit={createNewColumn}>
                        <input
                            value={newListValue}
                            onChange={onChange}
                            type="text"
                            placeholder="Add a new list...hit enter when done"
                        />
                    </form>     
                </div>
            </div>
        </div>
    );
}
