import React from 'react';
//Bootstrap será utilizado na página
import 'bootstrap/dist/css/bootstrap.min.css';
//Utilizaremos estas funcionalidades do Bootstrap
import {Container,Row, Col, Button,Alert,Breadcrumb, Card, Form} from 'react-bootstrap';
import './Signup_Success.css';

function Signup_Success(){
    return(
        <main>
        {/*removido o container fluid e trocado por um div porque o container tem padding à esquerda e direita*/}
            <div id="success_Message">
                <Row style={{ margin: '0' }}>
                    <span id='rowHead'>Ragnarok Community</span>
                </Row>
                <Row id='rowBody' style={{ margin: '0' }}>
                    <span>
                    Obrigado por registrar se na Rangarok Community.
                    </span>
                    <span>
                    Para completar o vosso registro, verifique o seu email por instruções de ativivação da sua conta. Enquanto não ativar a sua conta não poderá postar nestes fórums.
                    </span>
                </Row>
            </div>  
        </main>
    );
}
export default Signup_Success;