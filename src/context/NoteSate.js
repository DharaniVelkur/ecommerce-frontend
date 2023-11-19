import React, { useState } from 'react'
import notecontext from './NoteContext'
const NoteSate = (props) => {
    const [selectedoption,setSelectedoption]= useState("banglore");
    const [account,setAccount] =useState(false);
  return (
    <notecontext.Provider value={{selectedoption,setSelectedoption,account,setAccount}}>
      {props.children}
    </notecontext.Provider>
  )
}

export default NoteSate;
