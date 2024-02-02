import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from './Loader';

function App() {

    let [data, setdata] = useState([]);
    let [tmp, settmp] = useState([]);
    let [nm, setnm] = useState([]);

    useEffect(() => {

        axios.get('https://rickandmortyapi.com/api/character')
            .then(function (response) {
                console.log(response.data.results);
                setdata(response.data.results);
                settmp(response.data.results);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    let ser = () => {

        let arr = [];

        arr = tmp.filter((el, id) => {
            return el.name == nm;
        })
        console.log(arr);
        setdata(arr);
    }


    return (

        <div className="App">
            {
                data.length == '0' ? <Loader></Loader> :
                    <div className="boss">
                        <div className="main">
                            <Container fluid>
                                <div className="nav d-flex  align-items-center justify-content-between py-3">
                                    <div className="nav-ma">
                                        <div className="logo">
                                            <img src={require(`./1.png`)}></img>
                                        </div>
                                    </div>
                                    <div className="li">
                                        <button>Docs</button>
                                        <button>About</button>
                                        <button className='lst'>SUPPORT US</button>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div className="head">
                            <h1>The Rick and Morty API</h1>
                        </div>
                        <div className="search m-5 d-flex justify-content-center">
                            <input type="text" onChange={(e) => { setnm(e.target.value) }}></input>
                            <input type="button" value="search" onClick={() => { ser() }}></input>
                        </div>
                        <div className="bx">
                            <Container fluid>
                                <div>
                                    <Row>
                                        {
                                            data.map((ele, ind) => {
                                                return (
                                                    <Col xl={6} className='cal my-2'>
                                                        <div className="box d-flex white">
                                                            <div className="img">
                                                                <img src={ele.image}></img>
                                                            </div>
                                                            <div className="info p-3 w-100 d-flex align-items-center">
                                                                <div className="flx">
                                                                    <div className="heading">
                                                                        <h3>{ele.name}</h3>
                                                                    </div>
                                                                    <div className="status d-flex align-items-center">
                                                                        <div className="dot me-2" style={{ backgroundColor: ele.status == "Alive" ? "#55cc44" : ele.status == "Dead" ? "#d63d2e" : "#9e9e9e" }}></div><span>{ele.status} - {ele.species}</span>
                                                                    </div>
                                                                    <div className="address mt-3">
                                                                        <div className="cap">
                                                                            <span>Last known location:</span>
                                                                            <p>{ele.location.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="seen">
                                                                        <span>First seen in:</span>
                                                                        <p>{ele.origin.name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </div>
            }

        </div>
    );
}

export default App;
