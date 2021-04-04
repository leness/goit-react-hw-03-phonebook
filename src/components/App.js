import { Component } from "react";
import ContactForm from './ContactForm';
import Filter from './Filter'
import ContactList from './ContactList';
import shortid from 'shortid';

class App extends Component {
state = {
   contacts: [
],
  filter: '',
}
  
  formSubmitHandler = ({ name, number }) => {
    if (this.state.contacts.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = { id: shortid.generate(), name, number };
      console.log(newContact);

    this.setState(({contacts}) => ({
      contacts: [...contacts, newContact]
    }))
    }
  }

  changeFilter = (e) => {
    this.setState({filter: e.currentTarget.value})
  }

  getVisibleContacs = () => {
    const { filter, contacts } = this.state;
    const normalizeSearch = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeSearch),
    );
  };

  deleteContact = (contactId) => {
    this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact=>contact.id!==contactId)
  }))
  }
  
  componentDidMount() {
    console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
      }
}

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле contacts, записываю в хранилище');
      
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
}
  }

  render() {
   console.log('App render');
    const visibleContacts = this.getVisibleContacs();
    
    return (
      <div>
       
  <h1>Phonebook</h1>
  <ContactForm onSubmit={ this.formSubmitHandler} />

  <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChange={this.changeFilter}
        />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact} />

       </div>
    )
  }
}

export default App;
