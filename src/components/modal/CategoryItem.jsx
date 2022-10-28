import styled from 'styled-components';

const CategoryItem = () => {
  return <Category>category</Category>;
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
`;

export default CategoryItem;
