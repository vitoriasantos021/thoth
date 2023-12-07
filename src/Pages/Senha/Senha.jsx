import React, { useState, useEffect } from 'react'

import firebase from '../../services/firebaseConnection';

import * as AiIcons from 'react-icons/ai';

import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import './senha.css'

// usado para navegar através das páginas
import { Link } from 'react-router-dom';


const Senha = () => {

    // states ultilizadas para pegar informações
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [load, setLoad] = useState(false)


    // funcão para redefinir a senha
    function RefazerSenha() {
        setLoad(true)

        firebase.auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                alert('Enviamos um link para você!')
                setEmail('')
                setLoad(false)
                window.location.href = "./";
            })
            .catch((error) => {
                alert('Erro ao enviar e-mail')
                console.log(error)
                setEmail('')

            }).finally(() => setLoad(false))
    }
    

    return (
        <>

            <div className='div-voltar'>
                <Link to="./">
                    <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
                </Link>
            </div>

            <div className='container-senha'>
                <div className='div-senha'>
                    <p>Digite seu email</p>
                        <input className="input" type='text' placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn" onClick={RefazerSenha}>
                        {load ? <CircularProgress isIndeterminate color='green' size={20} /> : 'Enviar link' }   </button>
                </div>
                    
            </div>

        </>
    )
}

export default Senha