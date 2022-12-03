import { Component } from 'react';

import { Form } from './Form/Form';
import { ContactsList } from './contactsBook/Contacts';
import shortid from 'shortid';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

const LS_KEY = 'contact';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const dataNumbers = localStorage.getItem(LS_KEY);

    if (dataNumbers) {
      this.setState({ contacts: JSON.parse(dataNumbers) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
  }

  formSubmitHandler = data => {
    const normalizedName = data.name.toLowerCase();

    const checkByName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );
    if (checkByName) {
      alert(`${data.name} is already in contacts `);
    } else {
      this.setState(prevState => ({
        contacts: [{ ...data, id: shortid.generate() }, ...prevState.contacts],
      }));
    }
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div
        style={{
          height: '100vh',
          padding: '20px',
          color: '#010101',
        }}
      >
        <Section title="PhoneBook">
          <Form onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactsList
            deleteContact={this.handleDeleteContact}
            contacts={visibleContacts}
          />
        </Section>
      </div>
    );
  }
}
