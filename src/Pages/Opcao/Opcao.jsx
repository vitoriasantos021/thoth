import React, { useState, useEffect, useContext } from 'react'

import { UserConexts } from '../../userContexts/user';

// string de conexão do banco de dados firebase
import firebase from '../../services/firebaseConnection';

// icones
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';

// icones 
import { Button, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import './opcao.css'

// usado para navegar através das páginas
import { Link, useHistory } from 'react-router-dom';


    const Opcao = () => {

        const[titulo, setTitulo] = useState('')
        const[user, setUser] = useState([])
        const[pontos, setPontos] = useState('')

        const { userLogged, setUserLogged } = useContext(UserConexts);

        const history = useHistory();
    

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

    // funcão para pegar dados sobre titulo da matéria
    useEffect(() => {
        const storageTitulo = localStorage.getItem('infoAlunos');

        // se tiver dados, pega do armazenamento e coloca dentro da state 'titulo'
        if (storageTitulo) {
            setTitulo(JSON.parse(storageTitulo))

            // se não tiver nada, entra aqui!
        } else {
            console.log('Sem dados!.')
        }

    }, [])


  
        useEffect(() => {

            async function dadosAtualizado(){

                await firebase.firestore().collection('Usuarios').onSnapshot((doc)=> {
                    let DataDados = [];

                    doc.forEach((doc)=> {
                        DataDados.push({
                            id: doc.id,
                            progresso: doc.data().progresso,
                            score: doc.data().score,
                    })

                })

                let idTexto =  localStorage.getItem('dadosAluno');
                let idDados =   JSON.parse(idTexto)
                let idString =   idDados.map((item) => item.id).toString()
            
                // metodo javascript ultilizado para filtrar as perguntas de acordo com a matéria 
                let selectt = DataDados.filter((item) => {
                    return (item.id == idString  )
            })

                setUser(selectt)

            })

        }

        dadosAtualizado()
           
        }, [])



  setTimeout(() => {
    coletarScore()
}, 500);





  function coletarScore(){

    if(titulo == 'Matematica'){
        let stringMat =  user.map((item)=> item.progresso.map((dados)=> (dados.matematica).toString()))
        let stringNumberMat = parseInt(stringMat)
        setPontos(stringNumberMat)
        localStorage.setItem('score', JSON.stringify(stringNumberMat))

    }

    else if (titulo == 'Portugues'){
        let stringPort =  user.map((item)=> item.progresso.map((dados)=> (dados.portugues).toString()))
        let stringNumberPort = parseInt(stringPort)
        setPontos(stringNumberPort)
        localStorage.setItem('score', JSON.stringify(stringNumberPort))
        
    }

    else if (titulo == 'Misto'){
        let stringMist =  user.map((item)=> item.progresso.map((dados)=> (dados.misto).toString()))
        let stringNumberMist = parseInt(stringMist) 
        setPontos(stringNumberMist)
        localStorage.setItem('score', JSON.stringify(stringNumberMist))

    }


  }

// funcão usada para alerta de acesso as questôes, dependendo da pontuação já alacançada

    function AlertaNivel1(){
        if(pontos >= 5 ){
            alert('Você já concluiu esse Nível')
        }else{
            window.location.href = `${titulo}`
        }

    }


  function AlertaNivel2(){
    
    if(pontos <= 4 ){
        alert('Nivel indisponivel') 
        return;
     }

    if(pontos >= 10){
        alert('Você já concluiu esse Nível')
    } 
    
    else{
         window.location.href = `${titulo}`
         }
   
  }

  function AlertaNivel3(){
    if(pontos < 10 ){
        alert('Nivel indisponível') 
        return;
     }

    if(pontos >= 15){
        alert('Parabéns você concluiu o quiz')
    } 
    
    else{
         window.location.href = `${titulo}`
         }
   
  }

    return (
        <>

            <div className='div-voltar'>
                <Link to="./Home">
                    <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
                </Link>
                    <p style={{color:"#000"}}>{titulo}</p>
                <Link to="">
                   
                </Link>

            </div>

            <div className='container-opcao'>

                {pontos >= 15 ? (
                    <div style={{display:'flex', alignItems:'center', justifyContent: 'center', flexDirection:'column'}}>
                       <strong style={{fontSize:32}}> Parabéns!!! </strong> 
                       <div style={{ width:'100%', display:'flex', alignItems:'center', justifyContent: 'center', flexDirection:'column'}}>
                            <small>Você conluiu o Quiz</small>
                            <small>Categoria {titulo}</small>  
                       </div>
                    </div>
                   
                ): 
                   (
               
            <div className='div-opcao'>
                    <Button  backgroundColor='transparent'  border='none' className='btn-nivel'  onClick={AlertaNivel1} >
                            <h1>Nivel 1</h1>
                            {pontos <= 4 ? <GiIcons.GiPadlock className='icon' color='#037e22' size={30} /> :  <GiIcons.GiPadlockOpen className='icon' color='#D5850A' size={30} /> }   

                    </Button>

                    <Button  backgroundColor='transparent'  border='none' className='btn-nivel' onClick={AlertaNivel2} >
                            <h1>Nivel 2</h1>
                            {pontos >= 5 && pontos < 10 ? <GiIcons.GiPadlock className='icon' color='#037e22' size={30} /> : pontos >= 10 ? <GiIcons.GiPadlockOpen className='icon' color='#D5850A' size={30} /> : <GiIcons.GiPadlockOpen className='icon' color='#b80909' size={30} /> }     

                    </Button>

                    <Button backgroundColor='transparent' border='none' className='btn-nivel' onClick={AlertaNivel3} >
                            <h1>Nivel 3</h1>
                            {pontos <= 9 ? <GiIcons.GiPadlock className='icon' color='#b80909' size={30} /> : pontos >= 15 ? <GiIcons.GiPadlockOpen className='icon' color='#D5850A' size={30} /> : <GiIcons.GiPadlockOpen className='icon' color='#037e22' size={30} /> }     

                    </Button>
                    
                </div>

                   ) 
                }
               
               
                    
            </div>

        </>
    )
}

export default Opcao;
