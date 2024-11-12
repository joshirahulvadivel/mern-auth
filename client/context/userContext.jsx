/*import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch(error => {
                    console.error("Error fetching profile:", error);
                });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}


UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};*/

import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching profile:", error);
                });
        }
    }, [user]); // This effect will run once when the component mounts

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

