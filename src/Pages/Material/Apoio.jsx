import { useState, useEffect, useContext } from 'react'

import { UserConexts } from '../../userContexts/user';

import firebase from '../../services/firebaseConnection';

import './apoio.css'

import { Link, useHistory } from 'react-router-dom';

import * as AiIcons from 'react-icons/ai';



 // JSX OU html da página ( ainda incompleto )
function Apoio() {

  const { userLogged, setUserLogged } = useContext(UserConexts);

  const history = useHistory();

      

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
 

  return (

      <>
        <Link to='/Home'>
            <AiIcons.AiOutlineDoubleLeft className='icon' color='#b9548c' size={30} />
        </Link>

        <div className='container-apoio'>
            <div className='div-material'>  
                    <h4>MATERIAL DE APOIO</h4>
            </div>

            <br></br>

            <p>Matemática</p>
            <div className='div-conteudos'>  
              <details>
                  <summary>Módulo 1: Números</summary>
                  <a href="https://brasilescola.uol.com.br/matematica/numeros-irracionais.htm" target="_blank">- Números Irracionais</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/matematica/notacao-cientifica.htm" target="_blank">- Notação Científica</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/o-que-e/matematica/o-que-sao-produtos-notav
                            eis.htm" target="_blank">- Produtos Notáveis</a>
              </details>

              <details>
                  <summary>Módulo 2: Álgebra - Funções</summary>
                  <a href="https://brasilescola.uol.com.br/matematica/funcoes.htm" target="_blank">- Tipos de Função</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/matematica/funcao-linear.htm" target="_blank">- Comparação de Função</a> 
              </details>

              <details>
                  <summary>Módulo 3: Álgebra - Razões e Proporções</summary>
                  <a href="https://brasilescola.uol.com.br/matematica/razao.htm" target="_blank">- Razão</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/matematica/proporcao.htm" target="_blank">- Proporção</a> 
              </details>

              <details>
                  <summary>Módulo 4: Álgebra - Expressões Algébricas</summary>
                  <a href="https://brasilescola.uol.com.br/matematica/fatoracao-expressao-algebrica.ht
                            m" target="_blank">- Fatoração de Expressões Algébricas</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/matematica/equacao-2-grau.htm" target="_blank">- Equação de 2° Grau</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/amp/matematica/formula-bhaskara.htm" target="_blank">- Fórmula de Bhaskara</a> 
              </details>

              <details>
                  <summary>Módulo 5: Geometria</summary>
                  <a href="https://brasilescola.uol.com.br/matematica/teorema-tales.htm" target="_blank">- Teorema De Tales</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/matematica/angulos.htm" target="_blank">- Ângulos</a> <br></br>
                  <a href="(https://brasilescola.uol.com.br/matematica/teorema-pitagoras.htm" target="_blank">- Teorema de Pitágoras</a> 
              </details>

              <details>
                  <summary>Módulo 6: Grandezas e Medidas</summary>
                  <a href="https://brasilescola.uol.com.br/matematica/volume-prisma.htm" target="_blank">- Volume de Prisma</a> <br></br>
                  <a href="https://brasilescola.uol.com.br/matematica/volume-cilindro.htm" target="_blank">- Volume Do Cilindro</a> <br></br>
                
              </details>
            </div>

            <br></br>

            <p>Português</p>

              <div className='div-conteudos'>  
                <details>
                    <summary>Módulo 1: Gêneros Textuais</summary>
                    <a href="https://brasilescola.uol.com.br/redacao/generos-textuais.htm" target="_blank">- Tipos de Gêneros Textuais</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/redacao/textos-humoristicos.htm" target="_blank">- Gêneros Humorísticos</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/redacao/producao-texto.htm" target="_blank">- Produção de Textos</a>
                </details>

                <details>
                    <summary>Módulo 2: Classes Gramaticais</summary>
                    <a href="https://brasilescola.uol.com.br/gramatica/classes-palavras.htm" target="_blank">- Classes de Palavras</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/gramatica/concordancia-verbal-nominal.htm" target="_blank">- Concordância Verbal e Nominal</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/gramatica/regencia-verbal.htm" target="_blank">- Regência Verbal</a>
                </details>

                <details>
                    <summary>Módulo 3: Figuras de Linguagem</summary>
                    <a href="https://brasilescola.uol.com.br/gramatica/figuras-linguagem.htm" target="_blank">- Figuras de Linguagem</a> <br></br>
                </details>

                <details>
                    <summary>Módulo 4: Fonética</summary>
                    <a href="https://brasilescola.uol.com.br/o-que-e/portugues/o-que-fonetica.htm" target="_blank">- O que é Fonética</a> <br></br>
                    <a href="https://www.todamateria.com.br/fonema-e-letra" target="_blank">- Fonemas e Letras</a> <br></br>
                </details>

                <details>
                    <summary>Módulo 5: Frases e Palavras</summary>
                    <a href="https://brasilescola.uol.com.br/gramatica/paronimos-homonimos.htm" target="_blank">- Homônimos e Paronimos</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/gramatica/regencia.htm" target="_blank">- Regência</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/gramatica/estilistica.htm" target="_blank">- Estilística</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/gramatica/tipos-frases.htm" target="_blank">- Tipos de Frases</a> <br></br>
                </details>

                <details>
                    <summary>Módulo 6: Sinais de Pontuação</summary>
                    <a href="https://brasilescola.uol.com.br/gramatica/sinais-pontuacao.htm" target="_blank">- Pontuação</a> <br></br>
                    <a href="https://brasilescola.uol.com.br/gramatica/acentuacao-grafica.htm" target="_blank">- Acentuação Gráfica</a> <br></br>
                </details>

              </div>

              
        </div>

    </>

  );

}

export default Apoio;
