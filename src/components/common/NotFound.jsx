import React from 'react';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    alert('잘못된 접근입니다.');
  }, []);
  return <div></div>;
};

export default NotFound;
