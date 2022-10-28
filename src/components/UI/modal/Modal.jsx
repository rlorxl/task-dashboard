import React from 'react';
import styled from 'styled-components';

const Modal = (props) => {
  return <ModalArea>{props.children}</ModalArea>;
};

const ModalArea = styled.div`
  width: 800px;
  height: 500px;
  background: #fff;
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 25px;
  padding: 35px;
  color: ${({ theme }) => theme.color.black};
  z-index: 10;
`;

export default Modal;
