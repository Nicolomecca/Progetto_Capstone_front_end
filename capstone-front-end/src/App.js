import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/style/custom-style.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormRegister from './components/FormRegister';

function App() {
  return (
<BrowserRouter>
<Routes>
<Route path='/*' element={<FormRegister />} />
</Routes>
</BrowserRouter>
  );
}

export default App;
