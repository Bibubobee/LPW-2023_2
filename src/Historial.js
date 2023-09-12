import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import "bootstrap/dist/css/bootstrap.min.css"

function Historial() {
  return (
    <div className="App">
      <header className='px-4 my-1'>
        Historial de solicitudes
      </header>
      <main>
        <Container>
        <Row className='px-4 my-3'>
            <Col sm={4}>
              <p>Nombre</p>
            </Col>
            <Col sm={4}>
              <p>Libro</p>
            </Col>
            <Col sm={4}>
              <p>Estado</p>
            </Col>
          </Row>
          <Row className='px-4 my-2 square border'>
            <Col sm={4}>
              <p>Juan</p>
              <p>Carlos</p>
              <p>Marco</p>
            </Col>
            <Col sm={4}>
              <p>El Codigo DaVinci</p>
              <p>Manifiesto Comunista</p>
              <p>Los versos satánicos</p>
            </Col>
            <Col sm={4}>
              <p>
                <Badge bg="primary">Entregado</Badge>
              </p>
              <p>
                <Badge bg="warning">En espera</Badge>
              </p>
              <p>
                <Badge bg="danger">Atrasado</Badge>
              </p>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Historial;
