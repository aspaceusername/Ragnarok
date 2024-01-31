import React, { useState, useEffect } from 'react';
import Comment from '../../Comment';
import './General.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function Guilds() {
  const [newCommentTitle, setNewCommentTitle] = useState('');
  const [existingComments, setExistingComments] = useState([]);

  useEffect(() => {
    // comentários pre-existentes
    const fetchComments = async () => {
      try {
        const response = await fetch('https://sheetdb.io/api/v1/7jsc9tsp9z10i/search?Page=Guilds');
        if (!response.ok) {
          throw new Error('Falha ao buscar comentários');
        }

        const data = await response.json();
        // Atualiza comentários existentes
        setExistingComments(data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error.message);
      }
    };

    fetchComments();
  }, []); // executado apenas uma vez quando o componente é rendered

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (newCommentTitle.trim() !== '') {
      // Atualiza o array de comentários existentes
      setExistingComments((prevComments) => [
        ...prevComments,
        {
          Title: newCommentTitle,
          Comment: '',
          Date: '',
        },
      ]);

      setNewCommentTitle('');
    }
  };

  // Agrupa os comentários por título
  const groupedComments = existingComments.reduce((acc, comment) => {
    const title = comment.Title;
    if (!acc[title]) {
      acc[title] = [];
    }
    acc[title].push(comment);
    return acc;
  }, {});

  return (
    <>
      {/* Formulário para criar um novo comentário */}
      <Form onSubmit={handleCreateComment}>
        <Row className="general-container">
          <Col>
            <Form.Control
              type="text"
              placeholder="Insert Thread Title"
              value={newCommentTitle}
              onChange={(e) => setNewCommentTitle(e.target.value)}
            />
          </Col>
          <Col>
            <Button type="submit">Create Thread</Button>
          </Col>
        </Row>
      </Form>

      {/* Renderiza os comentários agrupados */}
      {Object.entries(groupedComments).map(([title, comments]) => (
        <Comment key={title} title={title} page="Guilds" comments={comments} />
      ))}
    </>
  );
}

export default Guilds;