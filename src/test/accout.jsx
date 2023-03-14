import React from 'react';
import {UserContext} from './user'
export default function() {
    console.log("user context is",UserContext)
    return (<p>
        <UserContext.Consumer>{name=><p>This is account component {name}</p>}</UserContext.Consumer>
        
    </p>)
}