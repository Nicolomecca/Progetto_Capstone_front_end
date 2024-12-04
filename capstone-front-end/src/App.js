import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/custom-style.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormLogin from './components/Autenticazione/FormLogin.jsx';
import FormSignUp from './components/Autenticazione/FormSignUp.jsx';
import Welcome from './components/Welcome.jsx';
import Home from './components/Home.jsx'
import ChooseLanguage from './components/Quiz/ChooseLanguage.jsx';
import AssessmentQuiz from './components/Quiz/AssessmentQuiz.jsx';
import ProgrammingLanguageDetails from './components/ProgrammingLanguageDetails.jsx';
import TheoryFullView from './components/TheoryFullView';
import QuizPage from './components/Quiz/QuizPage.jsx';
import MyNavbar from './components/MyNavbar';
import MyQuizzes from './components/Quiz/MyQuizzes.jsx';
import Ranking from './components/Ranking.jsx';
import UserProfile from './components/UserProfile.jsx';
import Practice from './components/Practice.jsx';
import Technologies from './components/Technologies.jsx';

const Layout = ({ children }) => (
  <>
   
    <MyNavbar />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<FormLogin />} />
        <Route path='/signup' element={<FormSignUp />} />
        <Route path='/assessment' element={<AssessmentQuiz />} />
        <Route path='/*' element={<Welcome />} />
        <Route path='/home' element={<Layout><Home /></Layout>} />
        <Route path='/language' element={<ChooseLanguage />} />
        <Route path='/theory' element={<Layout><ProgrammingLanguageDetails /></Layout>} />
        <Route path="/theory/:languageName" element={<Layout><TheoryFullView /></Layout>} />
        <Route path="/quiz" element={<Layout> <QuizPage /></Layout>} />
        <Route path= "/technologies" element ={<Layout><Technologies/></Layout>} />
        <Route path="/quiz-history" element ={<Layout><MyQuizzes/></Layout>} />
        <Route path="/ranking" element ={<Layout><Ranking/></Layout>} />
        <Route path="/profile" element ={<Layout><UserProfile/></Layout>} />
        <Route path="/practice" element ={<Layout><Practice/></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;