import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css';

function Login({ modal = false }) {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (loginId === 'lee' && password === '1234') {
            setMessage('Login successful.');

            return;
        }

        setMessage('Invalid username or password.');
    };

    const handleClose = () => {
        if (modal) {
            navigate(-1);
            return;
        }

        navigate('/');
    };

    return (
        <main
            className={
                modal
                    ? 'Login Login--modal'
                    : 'Login'
            }
        >
            <button
                type="button"
                className="login-close"
                onClick={handleClose}
                aria-label="로그인 화면 닫기"
            >
                ×
            </button>

            <section className="login-panel">
                <header className="login-header">
                    <p className="login-path">
                        authentication://myHome
                    </p>

                    <h1>System Login</h1>

                    <p>
                        Enter your credentials to continue.
                    </p>
                </header>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        <span>Username</span>

                        <input
                            type="text"
                            value={loginId}
                            onChange={(event) => {
                                setLoginId(event.target.value);
                            }}
                            autoFocus
                            autoComplete="username"
                        />
                    </label>

                    <label>
                        <span>Password</span>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            autoComplete="current-password"
                        />
                    </label>

                    <button type="submit">
                        Login
                    </button>
                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}
            </section>
        </main>
    );
}

export default Login;