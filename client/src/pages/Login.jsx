import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        try {
            const { data: response } = await axios.post(
                'http://localhost:8000/login',
                { email, password },
                // { withCredentials: true } 
            );
            console.log(response);

            if (response.error) {
                toast.error(response.error);
            } else {
                setData({ email: '', password: '' }); 
                navigate('/dashboard'); 
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please try again.');
        }
    };

    return (
        <div style={{ padding: '200px' }}>
            <form onSubmit={loginUser}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter email..."
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        style={{ display: 'block', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password..."
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        style={{ display: 'block', marginTop: '5px' }}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
