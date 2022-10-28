import styled from 'styled-components';

const MemoItem = () => {
  return (
    <Memo>
      <textarea name='txt' placeholder='일정을 입력하세요'></textarea>
    </Memo>
  );
};

const Memo = styled.li`
  position: relative;

  textarea {
    font-size: 0.9rem;
    width: 100%;
    height: 3rem;
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.color.black};
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 1rem 0;
    resize: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.color.gray};
    opacity: 0.3;
  }

  &:last-child::after {
    opacity: 0;
  }
`;

export default MemoItem;
