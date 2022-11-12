import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Input = forwardRef((props, ref) => {
  return <CustomInput {...props} ref={ref} />;
});

const CustomInput = styled.input`
  width: 48%;
  height: 50px;
  border: none;
  border-radius: 13px;
  background: #fff;
  text-indent: 20px;
  margin-top: 10px;
  outline: none;
  margin-right: 13px;
  color: ${({ theme }) => theme.color.gray};

  &:nth-child(2) {
    margin-right: 0;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.gray2};
  }

  &:focus {
    background: ${({ theme }) => theme.color.carrot};
    color: #fff;
    &::placeholder {
      color: #fff;
    }
  }
`;

export default Input;
