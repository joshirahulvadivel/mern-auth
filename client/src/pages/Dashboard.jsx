import {useContext} from 'react';
import {UserContext} from '../../context/userContext'

export default function Dashboard() {
    const{user} = useContext(UserContext)
  return (
    <div>
        <h1>Dashboard</h1>
        {!!user && (<h2>Hi {user.name}!</h2>)}
    </div>
  )
} 



 /* import React, { useContext } from 'react';
  import { UserContext } from '../../context/userContext';
  
  export default function Dashboard() {
      const { user } = useContext(UserContext);
  
      return (
          <div>
              <h1>Dashboard</h1>
              {user ? (
                  <h2>Hi {user.name}!</h2>
              ) : (
                  <div>
                      <h2>Loading...</h2> 
                      <h3>Your token expires in an hour</h3>   
                  </div>
              )}
          </div>
      );
  }
  */