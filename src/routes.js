// método de navegação criado, para navegar nas páginas 'react-router-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

// paginas dos projetos
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Senha from './Pages/Senha/Senha';
import Matematica from './Pages/Perguntas/Matematica';
import Portugues from './Pages/Perguntas/Portugues';
import Misto from './Pages/Perguntas/Misto';
import Cadastrar from './Pages/Cadastrar/Cadastrar';
import CadastrarPerguntas from './Pages/cadastrarPerguntas/Cadastrar';
import Area from './Pages/AreaDoAluno/Area';
import Apoio from './Pages/Material/Apoio';
import Rank from './Pages/Rank/Rank';
import Opcao from './Pages/Opcao/Opcao';
import Header from './components/Header';


const Routes = () => {

    // importando todas as páginas
    // colocando entre esses dois componentes do 'react-router-dom'
    return (
        <BrowserRouter>
            <Switch>
                {/*a primeira página de login, e a página principal, sempre que o site abrir, vem para essa página*/}
                <Route exact path='/' component={Login} />
                <Route exact path='/Home' component={Home} />
                <Route exact path='/Portugues' component={Portugues} />
                <Route exact path='/Matematica' component={Matematica} />
                <Route exact path='/Misto' component={Misto} />
                <Route exact path='/Header' component={Header} />
                <Route exact path='/Cadastrar' component={Cadastrar} />
                <Route exact path='/CadastrarPerguntas' component={CadastrarPerguntas} />
                <Route exact path='/Area' component={Area} />
                <Route exact path='/Rank' component={Rank} />
                <Route exact path='/Apoio' component={Apoio} />
                <Route exact path='/Opcao' component={Opcao} />
                <Route exact path='/Senha' component={Senha} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;