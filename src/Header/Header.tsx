import * as React from 'react'
import './index.scss';
import removeRedEyeIcon from '../images/remove-red-eye.svg';
import searchIcon from '../images/search.svg';
import { actionType, useAppDispatch } from '../context/app.context';

export default function Header() {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const dispatch = useAppDispatch()

  const onSearchtermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    dispatch({ type: actionType.SET_SEARCH, data: searchTerm });
  }, [searchTerm, dispatch])

  return (
    <div className="container-fluid header">
      <div className="flex">
        <div>
          <div className="item-cont">
            <div className="item">
                <img src={removeRedEyeIcon} alt="remove red eye icon" />
                <span>Statuses</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="item-cont">
              <div className="item input">
                <img src={searchIcon} alt="search icon" />
                <input
                  value={searchTerm}
                  onChange={onSearchtermChange}
                  type="text"
                  placeholder="Search by title"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
