import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/custom-style.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormLogin from './components/FormLogin';
import FormSignUp from './components/FormSignUp.jsx';

function App() {
  return (
<BrowserRouter>
<Routes>
<Route path='/login' element={<FormLogin />} />
<Route path='/sign-up' element ={ <FormSignUp/>} />
</Routes>
</BrowserRouter>
  );
}

export default App;
