import logo from './logo.svg';
import './PaginaLibro.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import "bootstrap/dist/css/bootstrap.min.css"

function PaginaLibro() {
  return (
    <div class="PaginaLibro">
      <main>
        <div class="container">
          <Row className='px-4 my-5'>
            <Col sm={7}>
              <Image src="https://imagessl8.casadellibro.com/a/l/t7/28/9788408175728.jpg" 
              fluid
              rounded
              className=''
              width={350}  
              />
            </Col>
            <Col sm={5}>
              <h1 className='font-weigh-light'>El Codigo Da Vinci</h1>
              <p className='my-5'> Sinopsis: Robert Langdon recibe una llamada en mitad de la noche: 
              el conservador del museo del Louvre ha sido asesinado en extrañas circunstancias y junto a 
              su cadáver ha aparecido un desconcertante mensaje cifrado. Al profundizar en la investigación, 
              Langdon, experto en simbología, descubre que las pistas conducen a las obras de Leonardo Da Vinci…y que
              están a la vista de todos, ocultas por el ingenio del pintor. 
              </p>
              <p className='my-5'>
                Fecha de Publicación: 29-08-2017
              </p>
              <p className='my-5'>
                Autor: Dan Brown
              </p>
              <div className='d-grid gap-2'>
                <Button variant='primary' size='lg'>Pedir en Mesa</Button>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
}

export default PaginaLibro;
