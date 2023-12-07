import { useState, useContext, useEffect } from "react";
import './perguntas.css'

import { UserConexts } from '../../userContexts/user';

import { Link, useHistory } from 'react-router-dom';

import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';

import firebase from '../../services/firebaseConnection';

function Matematica() {

  const { user, setUser, dados, setDados, userLogged, setUserLogged } = useContext(UserConexts);

  const [perguntas, setPerguntas] =useState([])

  const [showScore, setShoeScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [dataMateria, setDataMateria] = useState([])

  const [load, setLoad] = useState(true)

  const history = useHistory();
    

  // let numeroSorteado = parseInt(Math.random() * 5)
  // let questaoSorteada = perguntas[numeroSorteado]


        // funcão para checar usuário logado
        useEffect(() => {
          async function checkLogin() {
            await firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                // usuario logado entra aqui
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

  
  // Ultilizado para carregar as informações antes do sistema iniciar, 
  // nesse sentido ultiliza-se p metodo 'localStorage.getItem('novoAluno')' para buscar no armazenamento do navegador
  // essas informalções com foram gravadas com a chave 'novoALuno'

  // funcão para pegar dados do usuário
  useEffect(() => {
    const storageUser = localStorage.getItem('novoAluno');

    // se tiver dados, pega do armazenamento e coloca dentro da state 'user'
    if (storageUser) {
        setUser(JSON.parse(storageUser))

        // se não tiver nada, entra aqui!
    } else {
        console.log('Sem usuário logado!.')
    }

}, [])


// funcão para pegar dados do usuário
  useEffect(() => {
    const storageDados = localStorage.getItem('dadosAluno');

     // se tiver dados, pega do armazenamento e coloca dentro da state 'user'
    if (storageDados) {
        setDados(JSON.parse(storageDados))

         // se não tiver nada, entra aqui!
    } else {
        console.log('Sem dados de aluno!.')
    }

  }, [])


        // funcão para avanço de perguntas                                                 
        function handleAnswer(isCorrect){
          if (isCorrect == 'true') {
            setScore(score + 1);
        }

          const nextQuestion = currentQuestion + 1;

        if (nextQuestion < perguntas.length) {

          setCurrentQuestion(nextQuestion)


        } else {

          setShoeScore(true);
          // setTimeout(() => {
          //   window.location.reload();

          // }, 5000)

          // salvarProgresso()

        }
      }


     // função para carregar materias
     useEffect(() => {

      async function loadMatererias() {

      await firebase.firestore().collection('Matematica').onSnapshot((doc) => {
          let dataPortugues = [];

          doc.forEach((doc) => {
            dataPortugues.push({
              id: doc.id,
              code: doc.data().code,
          })
      
        })

        let uidLog = user.map((item)=> item.uid).toString()

         // filtrar user atual 
         let selectt = dataPortugues.filter((item) => {
         return (item.code == uidLog)
       
     })

        setDataMateria(selectt)
        setLoad(false)

        })
        // .catch(() => {
        //     console.log('Erro ao buscar no Banco!!!')
        // })

    }

      loadMatererias()

    }, [currentQuestion])



        // função para carregar perguntas
        useEffect(() => {

          async function loadPerguntas() {

          await firebase.firestore().collection('Perguntas').onSnapshot((doc) => {
              let DataPerguntas = [];

              doc.forEach((doc) => {
              DataPerguntas.push({
                  id: doc.id,
                  materia: doc.data().materia,
                  nivel: doc.data().nivel,
                  options: doc.data().options,
                  questionText: doc.data().questionText,
              })
          
            })

            let dataPontos =  localStorage.getItem('score');
  
            let dataNivel = dataPontos <= 4 ? '1' : dataPontos <= 5 || dataPontos <= 9 ? '2' : '3'
                
             // metodo javascript ultilizado para filtrar as perguntas de acordo com a matéria 
            let selectt = DataPerguntas.filter((item) => {
              return (item.materia === 'Matematica' && item.nivel === dataNivel)
  
               
            })
  
            setPerguntas(selectt)
            setLoad(false)

            })
            // .catch(() => {
            //     console.log('Erro ao buscar no Banco!!!')
            // })

        }

          loadPerguntas()

      }, [])


    // funcão para atualizar progresso 
      async function salvarProgresso(){

        let id = user.map((item)=> item.uid).toString()
        let pontosPortugues =  parseInt(dados.map((item)=> item.progresso[0].portugues))
        let pontosMisto =  parseInt(dados.map((item)=> item.progresso[0].misto))
  
        let total = score + pontosPortugues + pontosMisto 
  
        // score do usario atual
        // let scoreString = scoreUser.map((item)=> item.score).toString()
        // let scoreNumber = parseInt(scoreString)
  
        // informando nivel atual das perguntas
        let dadosNivel = perguntas.map((item)=> item.nivel)
        let filterArray = dadosNivel.filter((item, index)=> dadosNivel.indexOf(item) === index)
        let nivelAtualString = filterArray.toString()
        let nivelAtualNumber = parseInt(nivelAtualString)
  
        if(nivelAtualNumber == 2 ){
  
              await firebase.firestore().collection('Usuarios')
              .doc(id)
              .update({
                progresso: [{ matematica: 5 + score , portugues: pontosPortugues, misto: pontosMisto }],
                score: 5 + total ,
              })
  
            .then(() => {
              // chamando a função salvarDados
              salvarDados()
              console.log('Progresso salvo!')
              return;
  
            })
            .catch((error)=> {
              console.log('Erro ao salvar progresso' + error)
            })
  
            return;
  
        } else if (nivelAtualNumber == 3 ) {
  
              await firebase.firestore().collection('Usuarios')
              .doc(id)
              .update({
                progresso: [{ matematica: 10 + score , portugues: pontosPortugues, misto: pontosMisto }],
                score: 10 + total ,
              })
  
            .then(() => {
              // chamando a função salvarDados
              salvarDados()
              console.log('Progresso salvo!')
              return;
  
            })
            .catch((error)=> {
              console.log('Erro ao salvar progresso' + error)
            })
  
            return;
  
        }else{
  
        await firebase.firestore().collection('Usuarios')
        .doc(id)
        .update({
          progresso: [{ matematica: score , portugues: pontosPortugues, misto: pontosMisto }],
          score: total ,
        })
  
      .then(() => {
        // chamando a função salvarDados
        salvarDados()
        console.log('Progresso salvo!')
  
      })
      .catch((error)=> {
        console.log('Erro ao salvar progresso' + error)
      })
  
      }
  
  }


      // funcão salvar prgresso
      async function salvarDados() {

        let id = user.map((item)=> item.uid).toString()
        let nome = dados.map((item)=> item.nome).toString()

        let idMateria = dataMateria.map((item) => item.id).toString()

        if(idMateria == [] ){

              await firebase.firestore().collection('Matematica')
              .doc()
              .set({ 
                  code: id,
                  nome: nome,
                  score: score,
              })
              .then(() => {
                  console.log('Salvo com sucesso!')

              })
              .catch((error) => {
                  console.log(error + 'Deu algum erro')
              })
              
        }else{

          await firebase.firestore().collection('Matematica')
          .doc(idMateria)
          .update({ 
              code: id,
              nome: nome,
              score: score,
          })
          .then(() => {
              console.log('Salvo com sucesso!')

          })
          .catch((error) => {
              console.log(error + 'Deu algum erro')
          })

      // setImages([])
      // setUrls([])

        }



      }
    
      // funcão para salvar tudo
      function handleFinish(){
        salvarProgresso()

        // tempo usado para redirecionar para tela home
        setTimeout(() => {
          window.location.href = "./Home";
        }, 1500)
      
    }

  return (

    <>
      <div className='div-voltar-perguntas'>
          <Link to='/Home'>
            <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
          </Link>
       </div>
    
    <div className="container-perguntas">

      <div className="app">
      {showScore ? (
        <div className="score-section">
          <h3 className="final">
            Voce pontuou {score} de {perguntas.length} <br></br>
            {/* Reiniciando quiz em  {contador} segundos */}
          </h3>

          <div className="div-user">
               <button onClick={handleFinish}>Ir menu</button>  
          </div>

        </div>
      ) : (

        <div className="question-section">
                      
                     <div className="question-count">
                       <span> Questão {currentQuestion + 1} </span> / {perguntas.length}
                     </div>

                     {load ? 'Carregando sua experiência' : (
  
                        <>
                          <div>

                            {perguntas == '' ?  <small>Não há perguntas cadastradas! aguarde... </small> : (
                            <>
                            
                              <div className="question-text">
                                    {perguntas[currentQuestion].questionText}
                              </div>
                              <div className="answer-section">
                                  {perguntas[currentQuestion].options.map(
                                    (options, index) => (
                                      <button className="btnCadastrar" onClick={() => handleAnswer(options.isCorrect)} key={index}> {options.opcao + ':'}  {options.opcaoTexto}</button>
                                    )
                                  )}
                              </div> 

                            </>
                            ) }

                            </div>

                     
                        </>
                  

                     ) }


                          <div className="div-user">
                            <small>Logado: {user.map((item)=> item.email)} </small>  
                          </div>
                          
                   </div>


    )

        }

    </div>


        </div>
      
        </>
      );
    }

export default Matematica;