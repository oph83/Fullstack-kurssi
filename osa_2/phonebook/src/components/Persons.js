import React from 'react'

const Persons = (props) => {
    return (
        <div>
            {props.persons.filter(person => person.name.match(new RegExp(props.searchPerson, "i")))
            .map(person => <p key={person.id}>{person.name} {person.number}
            <button onClick={()=>props.removeButton(person.id, person.name)}>delete</button></p>)}
        </div>
    )
}

export default Persons