import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import loading01 from '../../assets/loadingImages/planet01.svg';
import loading02 from '../../assets/loadingImages/planet02.svg';
import loading03 from '../../assets/loadingImages/planet03.svg';
import loading04 from '../../assets/loadingImages/planet04.svg';
import loading05 from '../../assets/loadingImages/planet05.svg';
import loading06 from '../../assets/loadingImages/planet06.svg';
import loading07 from '../../assets/loadingImages/planet07.svg';
import loading08 from '../../assets/loadingImages/planet08.svg';
import loading09 from '../../assets/loadingImages/planet09.svg';
import loading10 from '../../assets/loadingImages/planet10.svg';
import loading11 from '../../assets/loadingImages/planet11.svg';
import loading12 from '../../assets/loadingImages/planet12.svg';
import loading13 from '../../assets/loadingImages/planet13.svg';
import loading14 from '../../assets/loadingImages/planet14.svg';
import loading15 from '../../assets/loadingImages/planet15.svg';
import loading16 from '../../assets/loadingImages/planet16.svg';
import useInterval from './useInterval';

const loadingImages = [
  loading01,
  loading02,
  loading03,
  loading04,
  loading05,
  loading06,
  loading07,
  loading08,
  loading09,
  loading10,
  loading11,
  loading12,
  loading13,
  loading14,
  loading15,
  loading16,
];

const Loading = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    if (count >= 15) setCount(0);
    setCount((prev) => prev + 1);
  }, 100);

  // useEffect(() => {
  //   let timer = setInterval(() => {
  //     if (count >= 15) setCount(0);
  //     setCount((prev) => prev + 1);
  //   }, 100);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Wrapper>
      <div>
        <LoadingImage src={loadingImages[count]} />
        <p>Loading...</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: ${({ theme }) => theme.color.carrot};

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  p {
    text-indent: 12px;
  }
`;

const LoadingImage = styled.img`
  width: 60px;
`;

export default Loading;
