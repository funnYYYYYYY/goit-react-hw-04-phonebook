import { useState, useEffect } from 'react';

import Form from './Form/Form';
import { ContactsList } from './contactsBook/Contacts';
import shortid from 'shortid';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    const normalizedName = data.name.toLowerCase();

    const checkByName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (checkByName) {
      alert(`${data.name} is already in contacts `);
    } else {
      setContacts(prev => [...prev, { id: shortid.generate(), ...data }]);
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

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

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
        {contacts.length > 0 && (
          <ContactsList
            deleteContact={handleDeleteContact}
            contacts={visibleContacts}
          />
        )}
      </Section>
    </div>
  );
}
