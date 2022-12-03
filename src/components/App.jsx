import { useState, useEffect } from 'react';

import Form from './Form/Form';
import { ContactsList } from './contactsBook/Contacts';
import shortid from 'shortid';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

const LS_KEY = 'contact';

const firstContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(firstContacts);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const normalizedName = data.name.toLowerCase();

    const checkByName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (checkByName) {
      alert(`${data.name} is already in contacts `);
    } else {
      setContacts(prev => ({
        ...data,
        id: shortid.generate(),
        ...prev.contacts,
      }));
    }
  };

  const handleDeleteContact = id => {
    setContacts(prevState => {
      return contacts.filter(el => el.id !== id);
    });
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const dataNumbers = localStorage.getItem(LS_KEY);

    if (dataNumbers) {
      setContacts(JSON.parse(dataNumbers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getVisibleContacts();

  return (
    <div
      style={{
        height: '100vh',
        padding: '20px',
        color: '#010101',
      }}
    >
      <Section title="PhoneBook">
        <Form onSubmit={formSubmitHandler} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          deleteContact={handleDeleteContact}
          contacts={visibleContacts}
        />
      </Section>
    </div>
  );
}
