import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  filterContacts = (evt) => {
    this.setState({ filter: evt.target.value });
  };

  updateStateSubmit = (id, name, number) => {
    this.setState((previousState) => ({
      contacts: [...previousState.contacts, { id, name, number }],
    }));
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContacts = (contactId) => {
    this.setState((previousState) => ({
      contacts: previousState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const contactsList = this.getVisibleContacts();
    const { contacts, filter } = this.state;
    return (
      <>
        <h1>Phonebook</h1>

        <ContactForm contacts={contacts} updateState={this.updateStateSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} filterContacts={this.filterContacts} />
        <ContactList contacts={contactsList} onDelete={this.deleteContacts} />
      </>
    );
  }
}

export default App;
