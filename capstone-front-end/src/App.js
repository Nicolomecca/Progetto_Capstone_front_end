import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/custom-style.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormLogin from './components/FormLogin';
import FormSignUp from './components/FormSignUp.jsx';
import Welcome from './components/Welcome.jsx';
import Home from './components/Home.jsx'
import ChooseLanguage from './components/ChooseLanguage.jsx';
import AssessmentQuiz from './components/AssessmentQuiz.jsx';
import ProgrammingLanguageDetails from './components/ProgrammingLanguageDetails.jsx';
import TheoryFullView from './components/TheoryFullView';


function App() {
  return (
<BrowserRouter>
<Routes>
<Route path='/login' element={<FormLogin />} />
<Route path='/signup' element ={ <FormSignUp/>} />
<Route path='/*' element ={<Welcome/>} />
<Route path ='/home' element ={<Home/>} />
<Route path ='/language' element ={<ChooseLanguage/>}/>
<Route path ='/assessment' element ={<AssessmentQuiz/>}/>
<Route path='/theory' element={<ProgrammingLanguageDetails/>} />
<Route path="/theory/:languageName" element={<TheoryFullView />} />

</Routes>
</BrowserRouter>
  );
}

export default App;
