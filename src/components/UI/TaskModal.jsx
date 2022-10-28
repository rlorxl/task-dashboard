import ReactDOM from 'react-dom';

import styled from 'styled-components';
import { Button } from '../../styled/style';

import Backdrop from './modal/Backdrop';
import Modal from './modal/Modal';
import Category from '../modal/CreateCategory';
import CreateMemo from '../modal/CreateMemo';

const backdropRoot = document.querySelector('#backdrop-root');
const modalRoot = document.querySelector('#modal-root');

const TaskModal = (props) => {
  const closeModalHandler = () => {
    props.close();
  };

  const ModalChildren = (
    <>
      <h2>New Task</h2>
      <Category />
      <CreateMemo />
      <BtnArea>
        <Button onClick={closeModalHandler}>Cancel</Button>
        <Button>Create</Button>
      </BtnArea>
    </>
  );

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, backdropRoot)}
      {ReactDOM.createPortal(<Modal>{ModalChildren}</Modal>, modalRoot)}
    </>
  );
};

const BtnArea = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;

  button {
    color: ${({ theme }) => theme.color.carrot};
    width: 120px;
    height: 55px;
    border: 1.5px solid ${({ theme }) => theme.color.carrot};
    font-size: 1.1em;

    &:nth-child(1) {
      margin-right: 15px;
      border: 1.5px solid ${({ theme }) => theme.color.gray};
      color: ${({ theme }) => theme.color.gray};

      &:hover {
        background-color: rgba(101, 101, 101, 0.25);
        color: ${({ theme }) => theme.color.gray};
      }
    }
  }
`;

export default TaskModal;
