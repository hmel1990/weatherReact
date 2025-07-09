
import './App.css'
import './components/FormAnketa.jsx'
import FormAnketa from "./components/FormAnketa.jsx";
import Navbar from "./components/Navbar";
import {Container} from "react-bootstrap";


function App() {

  return (
    <>
        <Container className="main-container">
            <Navbar />
            <FormAnketa />
        </Container>


    </>
  )
}

export default App
