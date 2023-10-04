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
    <div class="Historial">
      <header class='px-4 my-1'>
        Historial de solicitudes
      </header>
      <main>
        <div class="container">
          <div class="row px-4 my-3">
            <div class="col-sm-4">
              <p>Nombre</p>
            </div>
            <div class="col-sm-4">
              <p>Libro</p>
            </div>
            <div class="col-sm-4">
              <p>Estado</p>
            </div>
          </div>
          <div class="row px-4 my-2 border">
            <div class="col-sm-4">
              <p>Juan</p>
              <p>Carlos</p>
              <p>Marco</p>
            </div>
            <div class="col-sm-4">
              <p>El Codigo DaVinci</p>
              <p>Manifiesto Comunista</p>
              <p>Los versos satánicos</p>
            </div>
            <div class="col-sm-4">
              <p>
                <span class="badge bg-primary">Entregado</span>
              </p>
              <p>
                <span class="badge bg-warning">En espera</span>
              </p>
              <p>
                <span class="badge bg-danger">Atrasado</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Historial;
