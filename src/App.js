import './App.css';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import HomePage from './components/homepage/Homepage';
import Services from './components/services/Services';
import AboutMe from './components/about_me/AboutMe';
import ContactPage from './components/contact/ContactPage'

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route exact path='/' Component={HomePage}/>
          <Route exact path='services' Component={Services}/>
          <Route exact path='about-me' Component={AboutMe}/>
          <Route exact path='contact' Component={ContactPage}/>
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
