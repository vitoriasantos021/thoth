import React from 'react'
import './header.css'

// logo do projeto
import logo from '../img/logo.png'

// iconne
import * as AiIcons from 'react-icons/ai';

const Header = () => {

    // funcão para redirecionar para página de cadastrar novo usuário
    function novoUsuario() {
        window.location.href = "./Cadastrar";
    }

    return (
        <div className='container-header'>

            <div className='div-img'>
                <img src={logo} width={100} />
            </div>

            <div className='div-header'>
                <AiIcons.AiOutlineUserAdd className='icon' color='#1B54B1' size={20} />
                <span onClick={novoUsuario} style={{ color: '#1B54B1 ' }}>Cadastrar-se</span>
            </div>

        </div>
    )
}

export default Header