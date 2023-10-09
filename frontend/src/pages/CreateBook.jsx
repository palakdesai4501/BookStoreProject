import React, { useState } from 'react'
import BackButton from '../component/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ publishYear, setPublishYear ] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
    .post('http://localhost:5555/books', data)
    .then(() => {
      setLoading(false);
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      alert('An error happended. Please Chack console');
      console.log(error);
    });
  };

  return (
    <div>
      CreateBook
    </div>
  )
}

export default CreateBook
CreateBook