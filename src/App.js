
// importando o metodo router, para possobilitar as navegões em toda parte do projeto
import Routes from './routes';
import UserProvider from './userContexts/user';

// metodo ultizado para configuarar a nevegação de paginas, depois que criado o router
function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
