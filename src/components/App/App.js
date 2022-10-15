import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../Form';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { Box } from '../../components/Box';
import { MaineTitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' }, // test
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' }, // test
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' }, // test
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }, // test
    ],
    filter: '',
  };

  // Responsible for updating the state
  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  // Add new contacts, inform if contact already added, updating the state
  addContact = (name, number) => {
    const addName = this.state.contacts.map(contact => contact.name);
    addName.includes(name);
    if (addName.includes(name)) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  //Responsible for rendering the requested/all contacts
  findContactbyName = () => {
    const { filter, contacts } = this.state;
    const fiterNameToLowerCase = filter.toLowerCase();
    const findContactsbyName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(fiterNameToLowerCase)
    );

    return findContactsbyName;
  };

  //Responsible for deleting contacts
  deletContact = idx => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== idx),
    }));
  };

  render() {
    const { filter } = this.state;
    const renderContactsList = this.findContactbyName();
    return (
      <Box display="flex">
        <Box
          marginLeft="auto"
          marginRight="auto"
          padding={4}
          border="phonebook"
          backgroundColor="phonebookBcg"
          boxShadow="boxShadow"
          minWidth="400px"
        >
          <MaineTitle>Phonebook</MaineTitle>
          <ContactForm onSubmit={this.addContact} />
          <Filter filter={filter} onChange={this.handleInputChange} />
          <ContactList
            contactsQnt={renderContactsList.length}
            renderItems={renderContactsList}
            onDelitBtn={this.deletContact}
          />
        </Box>
      </Box>
    );
  }
}
