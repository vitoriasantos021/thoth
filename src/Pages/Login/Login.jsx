
import './login.css'
import { useState } from 'react'

import firebase from '../../services/firebaseConnection';

import { Link } from 'react-router-dom';

import * as AiIcons from 'react-icons/ai';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


import Header from '../../components/Header';

function Login() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [eye, setEye] = useState(false)
  const [load, setLoad] = useState(false)

  // funcão para logar usuários
  async function FazerLogin() {

    setLoad(true)
    // metodo firebase logar usuário no banco
    await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (value) => {

        await firebase.firestore().collection('Usuarios')
          .doc(value.user.uid)
          .get()
          .then((snapshot) => {
            let DataUser = [];
            DataUser.push({
              uid: value.user.uid,
              nome: nome,
              email: email,
            })

            alert('Logado com sucesso!')
            console.log('Logado com sucesso!')

            localStorage.setItem('novoAluno', JSON.stringify(DataUser))

          })

        setLoad(false)
        window.location.href = "./Home";

      })
      .catch((error) => {
        setLoad(false)
        alert('Erro ao logar!!!' + error)
      })
  }

  // funcão para visualiuzar caracteres do input
  function ocultarEye() {
    setEye(!eye)
  }

  return (

    <>

      <Header />

      <div className="container">

        <div className='login'>

          <div className='div-infos-detalhes'>
            <h3>Faça seu login</h3>
            <small>Para mais benefícios dentro da plataforma </small>
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
            <button className="btn" onClick={FazerLogin}>
              {load ? <CircularProgress isIndeterminate color='green' size={20} /> : 'Acessar'}   </button>
          </div>

          <div className='div-link'>
            <Link to='/Senha'>Recuperar senha</Link>
          </div>

        </div>

      </div>


    </>

  );

}

export default Login;
