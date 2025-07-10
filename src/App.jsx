
import './App.css'
import './components/FormAnketa.jsx'
import FormAnketa from "./components/FormAnketa.jsx";
import Navbar from "./components/Navbar";
import {Container} from "react-bootstrap";


function App() {

  return (
    <>
        <div className="main-wrapper">

            <Navbar className="my-navbar" />

            <Container className="main-container">
                <FormAnketa />
            </Container>

        </div>


    </>
  )
}

export default App
