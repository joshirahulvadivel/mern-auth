import React, { useState } from 'react';
import axios from 'axios'; 
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const registerUser = async (e) => { 
    e.preventDefault();
    const { name, email, password } = data;

    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        email,
        password
      });

    
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ name: '', email: '', password: '' }); 
        toast.success('Registration Successful. Welcome!');
        navigate('/login');
      }
      
      console.log('Registration successful:', response.data);
    } catch (error) {
      
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ padding: '200px' }}>
      <form onSubmit={registerUser}>
        <div style={{ marginBottom: '20px' }}>
          <label>Name</label>
          <input
            type="text"
            placeholder="enter name..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            style={{ display: 'block', marginTop: '5px' }} 
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Email</label>
          <input
            type="text"
            placeholder="enter email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            style={{ display: 'block', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Password</label>
          <input
            type="password" 
            placeholder="enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            style={{ display: 'block', marginTop: '5px' }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
