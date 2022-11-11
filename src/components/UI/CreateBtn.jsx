import styled from 'styled-components';
import { BiPlusCircle } from 'react-icons/bi';
import { Button } from '../../styled/style';

const CreateBtn = (props) => {
  const showModalHandler = () => {
    props.onShow();
  };

  return (
    <BtnArea onClick={showModalHandler}>
      <CreateNew>
        <span>Create New</span>
        <span>
          <BiPlusCircle />
        </span>
      </CreateNew>
    </BtnArea>
  );
};

const BtnArea = styled.div`
  width: 170px;
  float: right;
`;

const CreateNew = styled(Button)`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  border: 1.5px solid ${({ theme }) => theme.color.carrot};
  border-radius: 1em;
  text-decoration: none;
  color: ${({ theme }) => theme.color.carrot};
  margin-top: 1em;

  svg {
    font-size: 1.2em;
    padding-top: 2px;
  }
`;

export default CreateBtn;
