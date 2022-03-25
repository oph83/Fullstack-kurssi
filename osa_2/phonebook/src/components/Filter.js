import React from 'react'

const Filter = (props) => {
    return (
        <div>
          filter shown with <input 
          type="search"
          value={props.searchPerson}
          onChange={props.handleSearchChange}/> 
        </div>
        
    )
}
    
export default Filter