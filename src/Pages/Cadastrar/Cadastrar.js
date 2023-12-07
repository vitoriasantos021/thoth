import React, { useState, useEffect } from 'react'

// string de conexão do banco de dados firebase
import firebase from '../../services/firebaseConnection';

// icones
import * as AiIcons from 'react-icons/ai';

// icones 
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import '../Login/login.css'

// usado para navegar através das páginas
import { Link } from 'react-router-dom';


const Cadastrar = () => {

    // states ultilizadas para pegar informações
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [eye, setEye] = useState(false)
    const [load, setLoad] = useState(false)


    // funcão para cadastrar usuários

    async function novoUsuario() {
        setLoad(true)

        if (nome == '' || email == '' || senha == '') {
            alert('Preencha todos os campos!')

            setLoad(false)
        }

        // metodo do firebase ultilizado para criar usuário no banco
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(async (value) => {
                // criando os campos que cada aluno terá ao criar a conta.
                await firebase.firestore().collection('Usuarios')
                    .doc(value.user.uid)
                    .set({
                        nome: nome,
                        email: email,
                        senha: senha,
                        progresso: [{ portugues: 0, matematica: 0, misto: 0 }],
                        score: 0
                    })

                    .then(() => {
                        setNome('')
                        setEmail('');
                        setSenha('');
                        alert('Cadastrado com sucesso!')
                        setLoad(false)
                        console.log('Cadastrado com sucesso!')
                    })

                window.location.href = "./";

            })
            // caso de algum erro, entra aqui, alertando ao usuário qual o erro que ocorreu
            .catch((error) => {

                if (error.code === 'auth/invalid-email') {
                    alert('Email inválido!')
                    setLoad(false)
                    console.log('Senha muito fraca..')

                }
                if (error.code === 'auth/weak-password') {
                    alert('Senha muito fraca..')
                    setLoad(false)
                    console.log('Senha muito fraca..')

                } else if (error.code === 'auth/email-already-in-use') {
                    alert('Esse email ja existe!')
                    setLoad(false)
                    console.log('Esse email ja existe!')
                }

            })

    }


    // funcão para visualiuzar caracteres do input
    function ocultarEye() {
        setEye(!eye)
    }


    return (
        <>

            <div className='div-voltar'>
                <Link to="./">
                    <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
                </Link>
            </div>

            <div className='container'>

                <div className='login'>

                    <div className='div-infos-detalhes'>
                        <h3 style={{ color: '#b9548c' }}> Faça seu cadastro</h3>
                    </div>

                    <div className='div-input-ajuste'>
                        {/* onde e ultilizado as states, cada uma com sua finalidade para armazenar as informações desejadas. */}
                        <input className="input" type='text' placeholder='Nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <div className='div-icon-eye'>
                            <AiIcons.AiOutlineUser className='icon' color='#b9548c' size={20} />
                        </div>
                    </div>

                    <div className='div-input-ajuste'>
                        <input className="input" type='text' placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='div-icon-eye'>
                            <AiIcons.AiOutlineMail className='icon' color='#b9548c' size={20} />
                        </div>
                    </div>

                    <div className='div-input-ajuste'>
                        <input className="input" type={eye ? 'text' : 'password'} placeholder='Senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <div className='div-icon-eye'>
                            {eye ? <AiIcons.AiOutlineEye onClick={ocultarEye} className='icon' color='#b9548c' size={20} /> : <AiIcons.AiOutlineEyeInvisible onClick={ocultarEye} className='icon' color='#b9548c' size={20} />}
                        </div>
                    </div>


                    <div className='div-button-login'>
                        <button className="btn" onClick={novoUsuario}>
                            {load ? <CircularProgress isIndeterminate color='green' size={20} /> : 'Cadastrar'}   </button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Cadastrar