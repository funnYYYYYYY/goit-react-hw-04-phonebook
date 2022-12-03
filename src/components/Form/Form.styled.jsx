import styled from 'styled-components';

const Container = styled.form`
  border: 1px solid black;
  display: block;
  padding: 20px;
  width: 250px;
  height: 200px;
`;

const Label = styled.label`
  display: block;
  height: 20px;
  &:not(:last-child) {
    margin-bottom: 65px;
  }
`;

const Input = styled.input`
  display: block;
  height: 25px;
  font-size: 18px;
  margin-top: 5px;

  &:focus {
    outline: none;

    border: 2px solid #468949;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: orange;
    color: blue;
  }
`;

const Title = styled.div`
  font-size: 30px;
  color: black;
  font-style: italic;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export { Container, Label, Input, Button, Title };
