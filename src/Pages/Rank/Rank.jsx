
import { useState, useEffect, useContext } from 'react'

import { UserConexts } from '../../userContexts/user';

import './rank.css'

import { Link, useHistory } from 'react-router-dom';

import firebase from '../../services/firebaseConnection';

import * as AiIcons from 'react-icons/ai';


function Rank() {


    const [user, setUser] = useState([])
    const [materia, setMateria ] = useState('Portugues');

    const [filtroMateria, setFiltroMateria] = useState([])

    let [cont, setCont] = useState(1);

    const { userLogged, setUserLogged } = useContext(UserConexts);

    const history = useHistory();
      

    // seleciona a matéria e mostra os dados do banco
    function handleChangeSelect(e) {
        setMateria(e.target.value);
    }


      useEffect(() => {
        async function checkLogin() {
          // metodo do firebase ultilizado para checar usuário online
          await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // usuario logado
              setUserLogged({
                uid: user.uid,
                email: user.email,
    
              })
          
            } else {
              // se não entra aqui
              setUserLogged('')
              history.replace('/')
            }
          })
        }
    
        checkLogin();
    
      }, [])

      // funcão para buscar no banco da dados, lista de alunos e pontuações de acordo com a matéria selecionada
    useEffect(() => {

        async function laodDados() {
    
          // método pontuacão de cada matéria
          await firebase.firestore().collection(`${materia}`).onSnapshot((doc) => {
            let DataInfos = [];
    
            doc.forEach((doc) => {
              DataInfos.push({
                id: doc.id,
                nome: doc.data().nome,
                score: doc.data().score,
              })

            // funcão javascript quem tem maior pontuacão.
            // armazena o resultado na vaiável sortScore depois joga dentro da state 'filtroMateria'
              let sortScore = DataInfos.sort((a, b) => {
                return a?.score >= b?.score ? -1 : 1;
            });
    
            setFiltroMateria(sortScore)

            })
           
          })
    
        }
    
        laodDados()
    
        
      }, [materia])

  return (

      <>
        <div className='container-rank'>

            <div className='div-voltar-rank'>    
                <Link to="./Home">
                    <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
                </Link>

            </div>


            <div className='div-titulo'>
                 <p>Ranking por Matéria</p>  

            </div>

                <section className='sessao-selecao'>
                    <div>
                         <small>Escolha a matéria:</small>
                    </div>
                    <div>
                        <select className='select' value={materia} onChange={handleChangeSelect} >
                            <option value="Selecionar">Selecione</option>
                            <option value="Portugues">Português</option>
                            <option value="Matematica">Matemática</option>
                            <option value="Misto">Misto </option>
                        </select>
                    </div>
                </section>

                {filtroMateria == 0 ? (
                  <small>Aguardando filtro...</small>
                )
                
                :

                <>

                {filtroMateria.map((item)=> {
                  return(
                    <div className='div-order'>
                      <div className='div-nome-rank'>
                            <small>{cont++}º </small>
                            <small style={{marginLeft: '5%'}}>{item.nome}</ small>
                        <div className='div-pontos'>
                             <small >{item.score} pontos</small>
                         </div>
                      </div>
                         
                    </div>

                  )
                })}

                </>

                }

                
                    
        </div>    

    </>

  );

}

export default Rank;
