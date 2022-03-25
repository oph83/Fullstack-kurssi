import React from 'react'

const PersonForm = (props, id) => {

  const checkName = props.persons.some(person => person.name === props.newName);
  console.log(props.persons.some(person => person.name === props.newName));
  const checkClick = checkName ? props.alertClick(id) : props.addPerson

    return (
      <div>
        <form onSubmit={checkClick}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNoteChange} />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
      </div>
    )
}

export default PersonForm