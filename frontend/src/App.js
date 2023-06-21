import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SendForm from "./components/SendForm";
import GoogleMaps from "./components/GoogleMaps";
import {Container} from "react-bootstrap";
import Footer from "./components/Footer";

function App() {
    return (
        <Provider store={store}>
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <SendForm />
                    </Col>
                </Row>
                <Row className='pt-4'>
                    <Col>
                        <GoogleMaps/>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
        </Provider>
    );
}

export default App;
