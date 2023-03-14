import React from 'react';
import Profile from './profile';
import { useState } from 'react'; 

export const UserContext = React.createContext();
export default function(){
    const [name,setName] = useState("sara")
    setTimeout(()=>{
        setName("satyam")
    },2000)

    return (
    <UserContext.Provider value={name}>
    <p>This is user component<br></br>
        <Profile />
    </p>
    </UserContext.Provider>
    )
}