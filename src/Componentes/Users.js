import React, { useState, useEffect } from 'react';
import { Row, Button, Modal, Form } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Função para procurar usuários ao fazer render
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://sheetdb.io/api/v1/6ynr12flm6ov8');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (email) => {
    try {
      // apaga o usuário com o email correspondente
      const response = await fetch(`https://sheetdb.io/api/v1/6ynr12flm6ov8/search?Email=${email}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Atualiza a lista de users removendo o users apagado
      setUsers((prevUsers) => prevUsers.filter((user) => user.Email !== email));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const renameUser = async () => {
    try {
      // Seleciona o formulário de renomeação
      const form = document.querySelector(".form2");
      const formData = new FormData(form);

      // Obtém o novo email do formulário
      const newEmail = formData.get("Email");

      // Atualiza o email do user usando o método PATCH
      const response = await fetch(`https://sheetdb.io/api/v1/6ynr12flm6ov8/Email/${selectedUserEmail}`, {
        method: 'PATCH',
        body: JSON.stringify({
          Email: newEmail,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to rename user');
      }

      // Fecha o modal após a renomeação bem-sucedida
      setShowModal(false);
      console.log('User renamed successfully');

      // Atualiza o estado de users para fazer uma nova renderização
      const updatedUsers = users.map(user => {
        if (user.Email === selectedUserEmail) {
          // Atualiza o email para o usuário selecionado
          return { ...user, Email: newEmail };
        }
        return user;
      });

      // Define os users atualizados no estado
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error renaming user:', error.message);
    }
  };

  return (
    <div id="usersContainer" style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {users.map((user) => (
        <div key={user.Email}>
          <Row style={{ margin: '0' }}>
            <span>{user.Email}</span>
            <Button variant="danger" onClick={() => deleteUser(user.Email)}>
              Delete
            </Button>
            <Button
              variant="info"
              onClick={() => {
                setSelectedUserEmail(user.Email);
                // Abre o modal para renomear
                setShowModal(true);
              }}
            >
              Rename
            </Button>
          </Row>
        </div>
      ))}

      {/* Modal de Renomeação de Usuário */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rename User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form2" onSubmit={(e) => { e.preventDefault(); renameUser(); }}>
            <Form.Group controlId="formNewEmail">
              <Form.Label>New Email</Form.Label>
              <Form.Control type="email" name="Email" placeholder='email@email.com'/>
            </Form.Group>
            <Button variant="secondary" type="submit">Rename</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;



