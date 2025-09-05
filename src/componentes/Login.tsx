import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (userName.toLowerCase() !== 'jorge' || password !== '12345') {
      alert('Usuario o contraseña inválidos');
      setUserName('');
      setPassword('');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', userName);  
      navigate('/');
    }, 2000);
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h1>La Bodega Online</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userName">Usuario:</label>
            <input
              id="userName"
              type="text"
              className="form-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Usuario"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;