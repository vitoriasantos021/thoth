import React, { useState } from 'react'
import './cadastrar.css'

import { Link } from 'react-router-dom';

import * as AiIcons from 'react-icons/ai';

import firebase from '../../services/firebaseConnection';

const CadastrarPerguntas = () => {


    const [pergunta, setPergunta] = useState('')
    const [escoherMateria, setEscolherMateria] = useState('')
    const [escolherNivel, setEscolherNivel] = useState('')


    const [textoA, setTextoA] = useState('')
    const [textoB, setTextoB] = useState('')
    const [textoC, setTextoC] = useState('')
    const [textoD, setTextoD] = useState('')

    const [opcaoA, setOpcaoA] = useState('')
    const [opcaoB, setOpcaoB] = useState('')
    const [opcaoC, setOpcaoC] = useState('')
    const [opcaoD, setOpcaoD] = useState('')

    
    function handleEscolherMateria(e) {
        setEscolherMateria(e.target.value);
    }

    function handleEscolherNivel(e) {
        setEscolherNivel(e.target.value);
    }

    function handleOpcaoA(e) {
        setOpcaoA(e.target.value);
    }

    function handleOpcaoB(e) {
        setOpcaoB(e.target.value);
    }

    function handleOpcaoC(e) {
        setOpcaoC(e.target.value);
    }

    function handleOpcaoD(e) {
        setOpcaoD(e.target.value);
    }

    async function cadastrarPerguntas() {

        await firebase.firestore().collection('Perguntas')
            .doc()
            .set({
                materia: escoherMateria,
                nivel: escolherNivel,
                questionText: pergunta,
                options: [
                    { opcao:'a', opcaoTexto: textoA, isCorrect: opcaoA },
                    { opcao:'b', opcaoTexto: textoB, isCorrect: opcaoB },
                    { opcao:'c', opcaoTexto: textoC, isCorrect: opcaoC },
                    { opcao:'d', opcaoTexto: textoD, isCorrect: opcaoD },
                ],
            })
            .then(() => {
                setEscolherMateria('')
                setEscolherNivel('')
                setPergunta('')
                setTextoA('')
                setTextoB('')
                setTextoC('')
                setTextoD('')
                setOpcaoA('')
                setOpcaoB('')
                setOpcaoC('')
                setOpcaoD('')
                alert('Cadastrada com sucesso!')

            })
            .catch((error) => {
               alert('Ops! parace que deu algum erro!')
                console.log(error + 'Deu algum erro')
            })

        // setImages([])

    }


    return (
        <div className='container-cadastrar'><div className='div-voltar-rank'>    

        <Link to="./Home">
            <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
        </Link>

    </div>
            <p style={{color:'#ffffff', marginTop:'3%', borderWidth:'bold', fontSize:'22px'}}>Cadastrar novas perguntas</p>

            <div className='div-perguntas'>
                <div className='div-ajustes'>
                    <div className='div-materia'>
                            <p>Matéria:</p>
                            <select className='select' value={escoherMateria} onChange={handleEscolherMateria} >
                                <option value="Selecionar">Selecione</option>
                                <option value="Portugues">Portugues</option>
                                <option value="Matematica">Matematica</option>
                                <option value="Misto">Misto</option>
                            </select>
                        </div>

                        <div className='div-nivel'>
                            <p>Nível:</p>
                            <select className='select' value={escolherNivel} onChange={handleEscolherNivel} >
                                <option value="Selecionar">Selecione</option>
                                <option value="1">Nivel 1</option>
                                <option value="2">Nivel 2</option>
                                <option value="3">Nivel 3</option>
                            </select>
                        </div>
                </div>
                
                <div className='div-text-area'>
                    <textarea value={pergunta} onChange={(e)=> setPergunta(e.target.value)}  placeholder='Sua pergunta'/>
                </div>

                <div className='div-opcoes'>
                    <div>
                        <input value={textoA} onChange={(e)=> setTextoA(e.target.value)} placeholder='opcão A'/>
                        <select className='select' value={opcaoA} onChange={handleOpcaoA} >
                            <option value="Selecionar">Selecione</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>

                    <div>
                        <input placeholder='opcão B' value={textoB} onChange={(e)=> setTextoB(e.target.value)}/>
                        <select className='select' value={opcaoB} onChange={handleOpcaoB} >
                            <option value="Selecionar">Selecione</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>

                    <div>
                        <input placeholder='opcão C' value={textoC} onChange={(e)=> setTextoC(e.target.value)}/>
                        <select className='select' value={opcaoC} onChange={handleOpcaoC} >
                            <option value="Selecionar">Selecione</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>

                    <div>
                        <input placeholder='opcão D' value={textoD} onChange={(e)=> setTextoD(e.target.value)}/>
                        <select className='select' value={opcaoD} onChange={handleOpcaoD} >
                            <option value="Selecionar">Selecione</option>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>
                
                </div>

                    <div className='div-btn-cadastrar'>
                            <button className='btn-cadastrar' onClick={cadastrarPerguntas}>Cadastrar</button>
                    </div>
                    
            </div>
        </div>
    )
}

export default CadastrarPerguntas;
