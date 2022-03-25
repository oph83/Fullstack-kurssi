import React from 'react'

const Notification = ({ message, style }) => {
  const changeStyle = style ? "add" : "error"
    if (message === null) {
      return null
    }
  
    return (
      <div className={changeStyle}>
        {message}
      </div>
    )
  }

export default Notification