import {useState} from 'react';
import {useNavigate,
    useOutletContext,
} from 'react-router';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const {setUser} = useOutletContext();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedLoginId = loginId.trim();

        if (!trimmedLoginId || !password) {
            setMessage(
                'Please enter your username and password.',
            );
            return;
        }
        if (
            trimmedLoginId === 'lee' &&
            password === '1234'
        ) {
            setMessage('Login successful.');
            // TerminalLayout에 로그인 사용자 전달
            setUser({
                loginId: trimmedLoginId,
            });
            // 로그인 페이지를 닫고 Terminal로 돌아감
            navigate('/', {
                replace: true,
            });

            return;
        }

        setMessage('Invalid username or password.');
    };

    // 회원가입 페이지 이동
    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <main className="Login">

            <section className="login-panel">
                <header className="login-header">
                    <p className="login-path">
                        authentication://myHome/login
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
                                setLoginId(
                                    event.target.value,
                                );
                            }}
                            autoFocus
                            autoComplete="username"
                            spellCheck={false}
                        />
                    </label>

                    <label>
                        <span>Password</span>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(
                                    event.target.value,
                                );
                            }}
                            autoComplete="current-password"
                        />
                    </label>

                    <div className="login-actions">
                        <button
                            type="submit"
                            className="login-submit"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="login-register"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </div>
                </form>

                {message && (
                    <p
                        className="login-message"
                        role="status"
                    >
                        {message}
                    </p>
                )}
            </section>
        </main>
    );
}

export default Login;