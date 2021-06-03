import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IListData } from '../../types';
import './modal.scss';

const ModalPortal = React.memo(({ children }) => {
  const modalEle = document.getElementById('modal');
  if (!modalEle) return null;
  const modalBg = <div className="modal-background"></div>;
  
  return ReactDOM.createPortal(
    <div className="modal is-active">
      {modalBg}
      {children}
    </div>,
    modalEle
  );
});

export const useModal = () => {
  const [ isActive, setIsActive ] = React.useState(false);
  const show = () => setIsActive(true);
  const hide = () => setIsActive(false);
  const Modal = ({ children }: {children: any}) => (
    <>
      { isActive && <ModalPortal>{children}</ModalPortal> }
    </>
  );
  
  return {
    show, 
    hide, 
    Modal
  }
}

export const EditModalContent = ({ hide, row, submitEdit, errorMessage }: {
    hide: () => void,
    row?: IListData,
    submitEdit: (title: string, description: string) => void,
    errorMessage?: string
}) => {
  const [title, setTitle] = React.useState<string>(row ? row.title : '');
  const [description, setDescription] = React.useState<string>(row ? row.description : '');
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    submitEdit(title, description)
  }

  return (
    <div className="modal-content">
      <div className="modal-header">
          {
             row ? `Edit ${row.title}` : 'Create new card' 
          }
      </div>
      <div className="modal-body">
          <div>
            <div>Title:</div>
            <br />
            <div>
              <input type="text" value={title} onChange={(e) => updateTitle(e, setTitle)} />
            </div>
          </div>
          <br />
          <div>
            <div>Description:</div>
            <br />
            <div>
              <input type="text" value={description} onChange={(e) => updateTitle(e, setDescription)} />
            </div>
          </div>
          {
            errorMessage &&
            <>
            <br />
            <div className="error-text">
                {errorMessage}
            </div>
            </>
          }

      </div>
      <div className="modal-footer">
        <button onClick={onSubmit}>
          Submit
        </button>
        &nbsp;
        &nbsp;
        <button onClick={hide}>
          Close
        </button>
      </div>
    </div>
  );
};
