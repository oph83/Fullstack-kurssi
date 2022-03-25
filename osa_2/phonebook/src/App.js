import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import Personform from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import { render } from '@testing-library/react';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson, setSearchPerson] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewNumber('');
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2400)
      });    
  };

  const removeButton = (id, person) => {
    console.log('delete ' + id)
    if (window.confirm(`Delete ${person}`) === true) {
      personService
       .remove(id)
       setErrorMessage(`Deleted ${person}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2400)
    } 
  }

  const alertClick = (event) => {
    event.preventDefault()
    if (window.confirm(`${newName} is already added, replace the old number with a new one`)) {
      const updateNumber = persons.find(n => n.name === newName)
      const id = updateNumber.id
      const changeNumber = { ...updateNumber, number: newNumber}
      console.log('update ' + id)

      personService
        .update(id, changeNumber)
        .then(changedNumber => {
          setErrorMessage(`Number updated`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2400);
        })
        .catch(error => {
          setStyle(!true)
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setStyle(true)
            setErrorMessage(null)
          }, 2400);
      
        })
    }
  }
        
  

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchPerson(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={style} />
      <Filter searchPerson={searchPerson} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <Personform persons={persons} addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} 
      alertClick={()=>alertClick}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchPerson={searchPerson} removeButton={removeButton}/>
    </div>
  );
}

export default App