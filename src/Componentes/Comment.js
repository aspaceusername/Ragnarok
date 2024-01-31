import React, { useState, useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';

const Comment = ({ title, page }) => {
  // Estado para armazenar o conteúdo do comentário
  const [commentContent, setCommentContent] = useState('');
  // Estado para armazenar a hora atual
  const [showTime, setShowTime] = useState('');
  // Estado para armazenar os comentários existentes
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Função para atualizar o relógio
    const updateClock = () => {
      const date = new Date();
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };
      const dateTimeString = date.toLocaleString('en-US', options);
      setShowTime(dateTimeString);
    };

    updateClock();

    // Procurar os comentários existentes para a página e título especificados quando o componente é montado
    const fetchComments = async () => {
      try {
        // Procurar comentários com base no título e na página fornecidos
        const response = await fetch(`https://sheetdb.io/api/v1/7jsc9tsp9z10i/search?Title=${title}&Page=${page}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar comentários');
        }

        const data = await response.json();
        // Ordenar os comentários por data em ordem descendente (do mais recente para o mais antigo)
        const sortedComments = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setComments(sortedComments);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error.message);
      }
    };

    fetchComments();
  }, [title, page]);

  // Função para submeter um novo comentário
  const submitComment = async () => {
    try {
      // Enviar o novo comentário para a API com o título e com a página fornecidos
      const response = await fetch('https://sheetdb.io/api/v1/7jsc9tsp9z10i', {
        method: 'POST',
        body: JSON.stringify({
          Date: showTime,
          Comment: commentContent,
          Title: title,
          Page: page,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Falha ao enviar comentário. Erro: ${JSON.stringify(errorResponse)}`);
      }
  
      console.log('Comentário enviado com sucesso');
  
      // Procurar e atualizar os comentários para incluir o novo
      const commentsResponse = await fetch(`https://sheetdb.io/api/v1/7jsc9tsp9z10i/search?Title=${title}&Page=${page}`);
      if (!commentsResponse.ok) {
        throw new Error('Falha ao buscar comentários');
      }
  
      const updatedComments = await commentsResponse.json();
      // Ordenar os comentários por data em ordem descendente (do mais recente para o mais antigo)
      const sortedComments = updatedComments.sort((a, b) => new Date(b.Date) - new Date(a.Date));
      setComments(sortedComments);
      setCommentContent(''); // Limpar o input do comentário após o envio
    } catch (error) {
      console.error('Erro ao enviar comentário:', error.message);
    }
  };
  

  return (
    <main>
      <div id="success_Message">
        <Row style={{ margin: '0' }}>
          <span id='rowHead'>{title}</span>
        </Row>
        <Row id='rowBody' style={{ margin: '0' }}>
          <span>
            <Form.Control
              type="text"
              placeholder="Escreva o seu comentário..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
          </span>
        </Row>
        <Row id='rowBody' style={{ margin: '0' }}>
          <span>
            <Button variant="primary" onClick={submitComment}>
              Enviar Comentário
            </Button>
          </span>
        </Row>
        <Row id='rowBody' style={{ margin: '0' }}>
          <div id="commentsContainer" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {comments.map((comment) => (
              <div key={comment._id}>
                <Row style={{ margin: '0' }}>
                  <span id='rowHead'>{comment.Date}</span>
                </Row>
                <Row id='rowBody' style={{ margin: '0' }}>
                  <span>{comment.Comment}</span>
                </Row>
              </div>
            ))}
          </div>
        </Row>
      </div>
    </main>
  );
};

export default Comment;








