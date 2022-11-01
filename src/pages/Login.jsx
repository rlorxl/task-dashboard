import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsArrowRightShort } from 'react-icons/bs';
import Logo from '../components/UI/Logo';
import Input from '../components/UI/Input';
import AuthContext from '../store/auth-context';
import { Button } from '../styled/style';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const auth = getAuth(app);

  const [isAllTouched, setIsAllTouched] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const touchedHandler = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    const valid =
      emailRegex.test(emailInputRef.current.value) &&
      passwordInputRef.current.value.length > 4;

    if (valid) {
      setIsAllTouched(true);
    } else {
      setIsAllTouched(false);
    }
  };

  const fetchUser = (user) => {
    authCtx.login(user.accessToken);
    navigate('/home');
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(
      auth,
      emailInputRef.current.value,
      passwordInputRef.current.value
    )
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user);
        fetchUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
        alert('이메일, 패스워드를 확인해 주세요.');
        setIsAllTouched(false);
      });
  };

  return (
    <Wrapper>
      <Logo />
      <SignupLink to='/signup'>
        Signup
        <BsArrowRightShort />
      </SignupLink>

      <form onSubmit={loginHandler}>
        <Input
          type='text'
          placeholder='이메일'
          ref={emailInputRef}
          onChange={touchedHandler}
          autoFocus
        />
        <Input
          type='password'
          placeholder='패스워드'
          ref={passwordInputRef}
          onChange={touchedHandler}
        />
        {isAllTouched && <LoginBtn>Press Enter</LoginBtn>}
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

  p {
    color: ${({ theme }) => theme.color.carrot};
    font-size: 0.8em;
  }
`;

const LoginBtn = styled(Button)`
  color: ${({ theme }) => theme.color.carrot};
  font-size: 1.3em;
  margin-top: 40px;
  animation: fadeIn 0.7s ease;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }
`;

const SignupLink = styled(Link)`
  display: flex;
  justify-content: end;
  align-items: center;
  color: #fff;
  text-align: end;
  padding-right: 8px;

  &:hover {
    text-decoration: underline;
  }

  svg {
    font-size: 1.6em;
  }
`;

export default Login;
