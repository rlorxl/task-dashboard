import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

const CategoryItem = ({ item, onSelect, onDelete }) => {
  const [showIcon, setShowIcon] = useState(false);
  const { selectedCategory } = useSelector((state) => state.task);

  const selectHandler = () => {
    onSelect(item);
  };

  const showDeleteIcon = () => {
    setShowIcon((prev) => !prev);
  };

  const deleteCategoryHandler = () => {
    onDelete(item);
  };

  return (
    <Category
      onClick={selectHandler}
      active={selectedCategory === item}
      onMouseEnter={showDeleteIcon}
      onMouseLeave={showDeleteIcon}
    >
      {item}
      <DeleteIcon>
        {showIcon && <TiDeleteOutline onClick={deleteCategoryHandler} />}
      </DeleteIcon>
    </Category>
  );
};

const Category = styled.li`
  padding: 12px 18px;
  border: 1.5px solid ${({ theme }) => theme.color.carrot};
  border-radius: 15px;
  color: ${({ theme }) => theme.color.carrot};
  cursor: pointer;
  position: relative;

  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.color.carrot};

    span {
      width: 1.2em;
      height: 1.2em;
      color: ${({ theme }) => theme.color.carrot};
      background-color: #fff;
      border-radius: 50%;
    }
  }

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.color.carrot};
      color: #fff;
    `}
`;

const DeleteIcon = styled.span`
  position: absolute;
  top: -7px;
  left: -7px;
  width: 1.6em;
  height: 1.6em;

  svg {
    position: absolute;
    top: -3px;
    left: -3px;
    font-size: 1.6em;
    z-index: 10;
  }
`;

export default CategoryItem;
