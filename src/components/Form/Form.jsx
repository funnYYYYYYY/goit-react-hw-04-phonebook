import React, { useState } from 'react';
import { Container, Label, Input, Button } from './Form.styled';

export default function Form({ onSubmit }) {
  const [data, setData] = useState({
    name: '',
    number: '',
  });

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
    onSubmit(data);

    reset();
  };

  const reset = () => {
    setData({ name: '', number: '' });
  };

  return (
    <Container
      // onSubmit={evt => {
      //   evt.preventDefault();
      //   onSubmit(data.userName, data.number);
      //   reset();
      // }}

      onSubmit={handleSubmit}
    >
      <Label>
        Name
        <Input
          value={data.name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          value={data.number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Container>
  );
}
