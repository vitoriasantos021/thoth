
// página ultilizada para criar variáveis globais, onde as mesmas poderá ser ultilizada em toda e qualquer parte do projeto, sendo possivel
// as mesmas também se atualizar.

import { createContext, useState } from 'react'

export const UserConexts = createContext({});

function UserProvider({ children }) {

        const [user, setUser] = useState([])
        const [dados, setDados] = useState({})

        const [userLogged, setUserLogged] = useState(false)

        return (
                <UserConexts.Provider value={{ user, setUser, dados, setDados, userLogged, setUserLogged }}>
                        {children}
                </UserConexts.Provider>

        )
}

export default UserProvider;