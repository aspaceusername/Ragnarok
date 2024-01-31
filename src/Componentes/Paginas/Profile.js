//Bootstrap será utilizado na página
import 'bootstrap/dist/css/bootstrap.min.css';
//Utilizaremos estas funcionalidades do Bootstrap
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import React from 'react';
import { useAuth } from './AuthContext'; // Importa o contexto de autenticação
import './Profile.css';
import Users from '../Users'; // Importa o componente Users

function Profile() {
    const { userEmail } = useAuth();
    const isAdmin = userEmail === 'admin@admin';
    
    return (
        <main>
            {/* Removido o container fluid e trocado por uma div porque o container tem padding à esquerda e direita */}
            <div id="success_Message">
                <Row style={{ margin: '0' }}>
                    <div className='div3'>
                        <div className='div4'>
                            <img src='./poring.ico' alt="Profile" className="profile-picture" width="100vw" height="100vw" />
                            <div className='div1'>
                                <span className="largetext">
                                    <strong><span className="group2">{userEmail}</span></strong>
                                </span>
                                <div className='div2'>[novice]</div>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row id='rowBody' style={{ margin: '0' }}>
                    <span>
                        Está logado na sua conta
                    </span>
                    <span>
                        Esta é a sua página de perfil
                    </span>
                </Row>

                {isAdmin && (
                    <>
                        <h2>Administração de Utilizadores</h2>
                        <Users />
                    </>
                )}
            </div>
        </main>
    );
}

export default Profile;

