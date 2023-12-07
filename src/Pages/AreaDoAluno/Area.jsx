import { useState, useEffect, useContext } from 'react'

import { UserConexts } from '../../userContexts/user';

import './area.css'

import avatar from '../../img/avatar.png'

import { Link, useHistory } from 'react-router-dom';

import firebase from '../../services/firebaseConnection';


import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';


function Area() {

// estados para armazenar informacões do usuário
    const [user, setUser] = useState([])
    
    const { userLogged, setUserLogged } = useContext(UserConexts);

    const history = useHistory();

   // funcão para checar usuário logado

  useEffect(() => {
        async function checkLogin() {
          // metodo do firebase ultilizado para checar usuário online
          await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setUserLogged({
                uid: user.uid,
                email: user.email,
    
              })
          
            } else {
              setUserLogged('')
              history.replace('/')
            }
          })
        }
    
        checkLogin();
    
      }, [])


      // funcão para buscar todos os usuários no banco

    useEffect(() => {

        async function loadUsers() {
     // metodo do firebase ultilizado para buscar todos os usuário no banco
          await firebase.firestore().collection('Usuarios').onSnapshot((doc) => {
            let DataUser = [];
    
              
            doc.forEach((doc) => {
              DataUser.push({
                id: doc.id,
                nome: doc.data().nome,
                email: doc.data().email,
                score: doc.data().score,
              })
    
            })

            // pegar as informaçõe do aluno logado e mostrar as informações

            let selectt = DataUser.filter((item) => {
                return (item.id.toString() === userLogged.uid)
          
              })

              setUser(selectt)

          })
    
        }
    
        loadUsers()

    // executa esse toda vez que essa variável mudar
      }, [userLogged])

      // convertendo score 
      let score = user.map((dados)=> dados.score.toString())
      let stringScore = score.toString()
      let numberScore = parseInt(stringScore)

    
  return (

      <>
        <Link to='/Home'>
            <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
        </Link>

        <div className='container-area'>
           <div className='sub-area'>
                <div className='div-esquerda'>
                    <div className='div-img-avatar'>
                      <img src={avatar} width={80} />
                    </div>
                    <div className='div-medalhas'>
                        <p>MINHAS MEDALHAS</p>
                        {/* <small style={{marginTop:'5%'}}>Você ainda não conquistou medalhas...</small> */}
                        <div className='div-position-medalhas'>
                          <div>
                              <FaIcons.FaFirstOrderAlt className='icon' color='#492d02' size={30} />
                              <div className='div-ajuste'>
                                  <small>Bronze</small>
                                  {numberScore > 14 ? <AiIcons.AiOutlineCheck className='icon-items' color='green' size={30} /> :  <BsIcons.BsXLg className='icon-items' color='#550909' size={30} /> }
                                  
                              </div>                          
                          </div>

                          <div>
                              <FaIcons.FaFirstOrder className='icon' color='#adaaa4' size={30} />
                              <div className='div-ajuste'>
                                  <small>Prata</small>
                                  {numberScore >= 29 ? <AiIcons.AiOutlineCheck className='icon-items' color='green' size={30} /> :  <BsIcons.BsXLg className='icon-items' color='#550909' size={30} /> }
                              </div>  
                          </div>
                           
                           <div>
                              <FaIcons.FaEmpire className='icon' color='#fcbf65' size={30} />
                              <div className='div-ajuste'>
                                  <small>Ouro</small>
                                  {numberScore >= 45 ? <AiIcons.AiOutlineCheck className='icon-items' color='green' size={30} /> :  <BsIcons.BsXLg className='icon-items' color='#550909' size={30} /> }
                              </div>  
                           </div>
                           
                          
                        </div>
                       
                    </div> 
                </div>
                <div className='div-direita'>
                    <div className='div-nome'>
                       Aluno (a): <h4> {user.map((item)=> item.nome)} </h4> 
                    </div>  
                    <div className='div-processo'>
                      <p>PROGRESSO</p>
                      <p> {user.map((item)=> (item.score / 45).toFixed(2) * 100 ) }%</p>
                    </div>
                    
                </div>
           </div>
        </div>

    </>

  );

}

export default Area;
