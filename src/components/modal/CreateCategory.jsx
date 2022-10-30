import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import { Button } from '../../styled/style';
import { BiPlus } from 'react-icons/bi';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../../store/task-slice';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const CreateCategory = () => {
  const categoryInputRef = useRef();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.task);

  // useEffect(() => {
  //   const db = getDatabase();
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   const userId = user.uid;
  //   const userRef = ref(db, `planit/${userId}/user`);

  //   console.log('add category');
  //   set(userRef, { categories: categories });
  // }, [categories]);

  const addCategory = async (e) => {
    e.preventDefault();
    if (categoryInputRef.current.value.trim() !== '') {
      dispatch(taskActions.addCategory(categoryInputRef.current.value));
    }
  };

  const selectCategory = (name) => {
    dispatch(taskActions.setCategory(name));
  };

  return (
    <div>
      <TitleArea>
        <h3>Category</h3>
        <AddCategory>
          <form onSubmit={addCategory}>
            <input type='text' autoFocus ref={categoryInputRef} />
            <Button>
              <BiPlus />
            </Button>
          </form>
        </AddCategory>
      </TitleArea>
      <CategoryListArea>
        {categories.map((item) => (
          <CategoryItem key={item} item={item} onSelect={selectCategory} />
        ))}
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
