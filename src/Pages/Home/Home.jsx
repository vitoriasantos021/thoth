
import { useContext, useState, useEffect } from 'react'

import { UserConexts } from '../../userContexts/user';

import './home.css'

// usado para navegar através das páginas
import { Link, useHistory } from 'react-router-dom';

// string de conexão do banco de dados firebase
import firebase from '../../services/firebaseConnection';

// Icones
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

import { Button } from '@chakra-ui/react';

function Home() {


    const [user, setUser] = useState([])
    // const [userLogged, setUserLogged] = useState({})

    const { userLogged, setUserLogged } = useContext(UserConexts);
   
    const history = useHistory();

   
 // funcão para checar usuário logado
    useEffect(() => {
        async function checkLogin() {
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
    
          await firebase.firestore().collection('Usuarios').onSnapshot((doc) => {
            let DataUser = [];
    
            doc.forEach((doc) => {
              DataUser.push({
                id: doc.id,
                nome: doc.data().nome,
                email: doc.data().email,
                progresso: doc.data().progresso,
                score: doc.data().score,
              })
    
            })

            let selectt = DataUser.filter((item) => {
                return (item.id.toString() === userLogged.uid)
          
              })

              setUser(selectt)
              localStorage.setItem('dadosAluno', JSON.stringify(selectt))
          })
    
        }
    
        loadUsers()
    
      }, [userLogged])


// funcão ultilizada para sair
     async function Sair(){
             if(window.confirm('Deseja sair?')) {
                alert('Você será deslogado!')
                  await firebase.auth().signOut();
                window.location.href = "./";
             } else {
              alert('Cancelado!')
             }
       }


    // funcão para iniciar quiz
    function acessarQuiz(e) {
      let nome = e.target.innerText
      localStorage.setItem('infoAlunos', JSON.stringify(nome))
  }
  

  // console.log(userLogged)


  return (

      <>
        <div className='div-voltar-home'>
            
             {/*tags utilizadas para navegar entre as paginas do sistem */}
                <Link to='/Apoio' className='div-link'>
                      <AiIcons.AiOutlineRead className='icon' color='#b9548c' size={30} />
                      <small>M. de apoio</small>
                </Link>

            <Link to="./Area" className='div-link'>
                <AiIcons.AiOutlineUserSwitch className='icon' color='#b9548c' size={30} />
                <small>A. do aluno</small>
            </Link>

            <Link to='/Rank' className='div-link'>
                <BsIcons.BsGraphUpArrow className='icon' color='#b9548c' size={30} />
                <small>Ranking</small>
            </Link>


            {user.map((item)=> item.email.toString() == 'juliamachado122004@gmail.com' && (
                <Link to='/cadastrarPerguntas' className='div-link'>
                     <AiIcons.AiFillSetting className='icon' color='#b9548c' size={30} />
                     <small>Admin</small>
                </Link>
            ))}


            <Link className='div-link'>
                <BsIcons.BsBoxArrowRight onClick={Sair} className='icon' color='#b9548c' size={30} />
                <small>Sair</small>
            </Link>
           
       </div>

        <div className="container-home">
      
            <div className='div-titulos'>
                <h3 style={{marginTop: '5%'}}>
                    Comece a jogar!
                </h3> 
              <small>
                   {/* usando a state user para renderizar o nome do aluno logado */}
                    {user.map((item)=> item.nome)}
              </small>
            </div>
               
            <div className='div-options'>
           
                <Link className='div-portugues'>
                    <Button backgroundColor='transparent' width='40%' border='none' fontSize={20} fontWeight='bold' onClick={acessarQuiz}>
                      <Link to='/Opcao' style={{color:'#fff'}}>
                         Portugues
                      </Link>
                    </Button>
                    <AiIcons.AiFillPlayCircle className='icon' color='#b9548c' size={30} />
                </Link>


                <div className='div-portugues'>
                    <Button backgroundColor='transparent' width='40%' border='none' fontSize={20} fontWeight='bold' onClick={acessarQuiz}>
                      <Link to='/Opcao' style={{color:'#fff'}}>
                         Matematica
                      </Link>
                    </Button>
                    <AiIcons.AiFillPlayCircle  className='icon' color='#b9548c' size={30} />
                </div>

            </div>

            <Link className='div-portugues'>
                    <Button backgroundColor='transparent' width='15%' border='none' fontSize={20} fontWeight='bold' onClick={acessarQuiz}>
                        <Link to='/Opcao' style={{color:'#fff'}}>
                          Misto
                        </Link>
                    </Button>
                    <AiIcons.AiFillPlayCircle className='icon' color='#b9548c' size={30} />
            </Link>

        </div>    

    </>

  );

}

export default Home;
