import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Obter os dados do formulário
      const form = e.target;
      const formData = new FormData(form);
      const email = formData.get("Email");
      const password = formData.get("Password");

      // adquirir dados a partir do Google Sheets
      const response = await fetch(
        `https://sheetdb.io/api/v1/6ynr12flm6ov8/search?Email=${email}&Password=${password}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const userData = await response.json();

      if (userData.length > 0) {
        console.log('Login bem-sucedido:', userData);
        const userEmail = email;
        login(userEmail);
        navigate('/');

        // redirecionar o utilizador
      } else {
        console.error('Credenciais inválidas');
        // mensagem de erro ao utilizador
      }
    } catch (error) {
      console.error('Login falhou:', error.message);
      // Lidar com outros erros ou exibir uma mensagem de erro
    }
  };

  return (
    <main>
      <div>
        <Form className="form" onSubmit={handleLogin}>
          <Row>
            <Col className='col-6 col-md-4'>
              <Form.Group controlId="formEmail">
                <Form.Label>Endereço de Email</Form.Label>
                <Form.Control type="email" name="Email" placeholder='email@email.com' />
              </Form.Group>
            </Col>
          </Row>
          <Row md>
            <Col className='col-6 col-md-4'>
              <Form.Group controlId="formPassword">
                <Form.Label>Palavra-passe</Form.Label>
                <Form.Control type="password" name="Password" placeholder='Palavra-passe' />
              </Form.Group>
            </Col>
          </Row>
          <div align="center">
            <Button variant="secondary" type="submit">Entrar</Button>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default Login;

