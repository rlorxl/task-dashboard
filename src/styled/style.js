import styled from 'styled-components';

const Card = styled.div`
  max-width: 1600px;
  height: 640px;
  margin: 3rem auto 5rem;
  border-radius: 20px;
  padding: 2.5em 4em;
  background-color: #19191c;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* gap: 3%; */

  @media screen and (max-width: 720px) {
    max-width: 480px;
    padding: 2em;
  }
`;

const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border-radius: 15px;
`;

export { Card, Button };
