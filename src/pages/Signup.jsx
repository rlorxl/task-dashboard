import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../styled/style';
import styled from 'styled-components';
import { BsArrowRightShort } from 'react-icons/bs';
import Input from '../components/UI/Input';
import useHttp from '../hooks/useHttp';

const Signup = () => {
  const navigate = useNavigate();
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isLoading, error, sendRequest } = useHttp();

  const emailValidateHandler = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (
      !emailRegex.test(emailInputRef.current.value) &&
      emailInputRef.current.value.length > 0
    ) {
      setErrorMessage('이메일 형식에 맞게 입력해주세요.');
    } else {
      setErrorMessage('');
      setEmailIsValid(true);
    }
  };

  const passwordValidateHandler = () => {
    if (
      passwordInputRef.current.value.length > 0 &&
      passwordInputRef.current.value.length < 6
    ) {
      setErrorMessage('패스워드를 6자리 이상 입력해주세요.');
    } else {
      setErrorMessage('');
      setPasswordIsValid(true);
    }
  };

  const fetchUser = () => {
    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  const errorHandler = (err) => {
    console.log(err.message);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (emailIsValid && passwordIsValid) {
      sendRequest(
        {
          url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtr9PdL9GSyR6LjtOhuX-3W0-R6vhb4h0',
          method: 'POST',
          body: {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            returnSecureToken: true,
          },
          headers: { 'Content-Type': 'application/json' },
        },
        fetchUser,
        'Something is Wrong!',
        errorHandler
      );
    }
  };

  return (
    <Wrapper>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <Input
          type='email'
          placeholder='이메일 입력'
          ref={emailInputRef}
          onChange={emailValidateHandler}
        />
        <Input
          type='password'
          placeholder='패스워드 입력'
          ref={passwordInputRef}
          onChange={passwordValidateHandler}
        />
        {<ErrorMessage>{errorMessage}</ErrorMessage>}
        <SignupBtn>
          Create account
          <BsArrowRightShort />
        </SignupBtn>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 450px;
  height: 250px;
  margin: 0 auto;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translatex(-50%);
  text-align: center;
`;

const SignupBtn = styled(Button)`
  font-size: 1.1em;
  font-weight: bold;
  margin-top: 25px;
  color: #fff;
  &:hover {
    color: ${({ theme }) => theme.color.carrot};
  }

  svg {
    font-size: 1.7em;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.8em;
  color: ${({ theme }) => theme.color.carrot};
  padding-left: 8px;
`;

export default Signup;