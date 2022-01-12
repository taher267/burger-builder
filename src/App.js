import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Store } from './redux/Store';

import Main from './Components/Main';

function App() {
  return (
    <div className='App'>
      <Provider store={Store}>
        <BrowserRouter><Main /></BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
