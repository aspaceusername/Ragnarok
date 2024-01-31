//Barra de navegação
//O projeto é em React
import React from 'react';
//Bootstrap será utilizado na página
import 'bootstrap/dist/css/bootstrap.min.css';
//Utilizaremos estas funcionalidades do Bootstrap
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const Submit = async (e) => {
        e.preventDefault();

        try {
            const form = e.target;
            const formData = new FormData(form);

            // Garante que as chaves coincidem com os nomes das colunas no google sheet
            const email = formData.get('Email');
            const password = formData.get('Password');

            // Verifica se os valores não são nulos ou indefinidos antes de converter para strings
            const emailString = email ? email.toString() : '';
            const passwordString = password ? password.toString() : '';

            // Faz um pedido POST para a API do seu SheetDB para guardar os dados do utilizador
            const response = await fetch(
                "https://sheetdb.io/api/v1/6ynr12flm6ov8",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Email: emailString, Password: passwordString }),
                }
            );

            if (response.ok) {
                console.log('Registo bem-sucedido');

                // Redireciona para a página de sucesso
                navigate('/Signup_Success');
            } else {
                console.error('Registo falhou');
            }
        } catch (error) {
            console.error('Registo falhou:', error.message);
        }
    };

    return (
        // Encapsula todo o conteúdo no main
        <main>
            {/* Removido o container fluid e trocado por uma div porque o container tem padding à esquerda e direita */}
            <div>
                {/* Form porque o utilizador vai preencher um "formulário" de username e password onde vai nos interessar depois analisar a informação */}
                {/* <Form className="form" onSubmit={(e)=>Submit(e)}> */}
                <Form className="form " onSubmit={Submit}>
                    <Row>
                        {/* md porque este conteúdo está a assumir como tamanho mínimo de tela 768 pixeis em comprimento */}
                        <Row>
                            {/* Form group garante certas funcionalidades QOL */}
                            <Col className='col-6 col-md-4'>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" name="Email" placeholder='email@email.com' />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row md>
                            <Col className='col-6 col-md-4'>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="Password" placeholder='Password' />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Row>
                    {/* botão para entregar o formulário */}
                    <div align="center">
                        <Button variant="secondary" type="submit" value="Submit">Register</Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}

export default Signup;
