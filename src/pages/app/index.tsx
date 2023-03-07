import './styles.css';
import io from 'socket.io-client';
import { ChangeEvent, useEffect, useState, useRef } from 'react';

const socket = io("http://localhost:3333");

interface IMessages {
  message: string;
}

export const App = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessages[]>([]);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmitNewMessage = () => {
    setMessage('')
    socket.emit('send_message', { data: message })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value
    setMessage(data);
  }

  const handleLoadMessage = (data: string) => {
    setMessages(prev => [...prev, { message: data }]);
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('request_all_messages');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('all_messages', (data) => {
      setMessages(data);
    });

    socket.on('receive_message', ({ message }) => {
      handleLoadMessage(message)
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive_message');
      socket.off('send_all_messages');
    };
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <div className="app">
      <h2>
        Service IP Address
      </h2>
      <h2 className="ip">[INTERNAL_IP]</h2>
      <h4>[INTERNAL_TIMESTAMP]</h4>

      <div className="messages">
        {messages.map((item, key) => <p key={key}>{item.message}</p>)}
        <div ref={messagesEndRef} />
      </div>

      <div className="sender">
        <input type="text" value={message} onChange={handleChange} />
        <button onClick={handleSubmitNewMessage}>Send</button>
      </div>
    </div>
  );
}

