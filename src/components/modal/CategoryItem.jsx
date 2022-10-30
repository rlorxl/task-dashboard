import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

const CategoryItem = ({ item, onSelect }) => {
  const { selectedCategory } = useSelector((state) => state.task);

  const selectHandler = () => {
    onSelect(item);
  };

  return (
    <Category onClick={selectHandler} active={selectedCategory === item}>
      {item}
    </Category>
  );
};

const Category = styled.li`
  padding: 12px 18px;
  border: 1.5px solid ${({ theme }) => theme.color.carrot};
  border-radius: 15px;
  color: ${({ theme }) => theme.color.carrot};
  cursor: pointer;

  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.color.carrot};
  }

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.color.carrot};
      color: #fff;
    `}
`;

export default CategoryItem;
