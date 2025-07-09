
import './App.css'
import './components/FormAnketa.jsx'
import FormAnketa from "./components/FormAnketa.jsx";
import Navbar from "./components/Navbar";
import {Container} from "react-bootstrap";


function App() {

  return (
    <>

        <Navbar />

        <Container className="main-container">
            <img
                src="https://github.com/hmel1990/ProfilePhoto/blob/main/fop.jpg?raw=true"
                className="img-fluid"
                style={{height: "auto", objectFit: "contain", width: "100%", borderRadius: "15px", marginBottom:"50px"}}
                alt="fop"
            />
            <FormAnketa />
        </Container>


    </>
  )
}

export default App
