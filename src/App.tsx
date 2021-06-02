import Header from './Header/Header';
import Stages from './stages/Stages';
import { AppProvider } from './context/app.context';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Header />
        <Stages />
      </AppProvider>
    </div>
  );
}

export default App;
