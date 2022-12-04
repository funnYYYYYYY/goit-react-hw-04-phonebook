import { useState, useEffect } from 'react';

import Form from './Form/Form';
import { ContactsList } from './contactsBook/Contacts';
import shortid from 'shortid';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

const LS_KEY = 'contact';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem(LS_KEY, JSON.stringify(contacts)),
    [contacts]
  );

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

  // useEffect(() => {
  //   const dataNumbers = localStorage.getItem(LS_KEY);

  //   if (dataNumbers) {
  //     setContacts(JSON.parse(dataNumbers));
  //   }
  // }, []);

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

//  useEffect(() => {
//   const savedContacts = JSON.parse(window.localStorage.getItem('contacts'));
//   if (savedContacts?.length) {
//     setContacts([...savedContacts]);
//   }
// }, []);

// useEffect(() => {
//   if (!isFirstRender.current) {
//     window.localStorage.setItem('contacts', JSON.stringify(contacts));
//   }}
