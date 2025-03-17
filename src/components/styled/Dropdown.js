import styled from 'styled-components';

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #2126319d;
  padding: 0.25rem 0.75rem;
  border-radius: 10px;
  background-color: #212631;
`;

const Select = styled.select`
  background-color: transparent;
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  color: #ffffff;

  option {
    background-color: #212631;
    color: #ffffff;
  }
`;

export { Dropdown, Select };