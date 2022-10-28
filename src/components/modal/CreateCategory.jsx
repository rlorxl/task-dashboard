import styled from 'styled-components';
import { Button } from '../../styled/style';
import { BiPlus } from 'react-icons/bi';
import CategoryItem from './CategoryItem';

const CreateCategory = () => {
  return (
    <div>
      <TitleArea>
        <h3>Category</h3>
        <AddCategory>
          <form>
            <input type='text' autoFocus />
          </form>
          <Button>
            <BiPlus />
          </Button>
        </AddCategory>
      </TitleArea>
      <CategoryListArea>
        <CategoryItem />
      </CategoryListArea>
    </div>
  );
};

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    color: ${({ theme }) => theme.color.black};
    font-weight: normal;
    margin-top: 1.2em;
  }

  button {
    width: 35px;
    height: 35px;
    border: 1.5px solid ${({ theme }) => theme.color.carrot};
    border-radius: 8px;
    background: #fff;

    svg {
      font-size: 1.5em;
      color: ${({ theme }) => theme.color.carrot};
    }

    &:hover {
      background: #fff;
    }
  }
`;

const AddCategory = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 12em;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 1em;
    border-bottom: 1.5px solid ${({ theme }) => theme.color.carrot};
    padding: 0.4em;
    margin-right: 8px;
    color: ${({ theme }) => theme.color.black};
  }
`;

const CategoryListArea = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
`;

export default CreateCategory;
