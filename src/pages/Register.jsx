import {useState} from 'react';
import {
    useLocation,
    useNavigate,
} from 'react-router';
import './Login.css';

function Register({modal = false}) {
    const navigate = useNavigate();
    const location = useLocation();

    const backgroundLocation =
        location.state?.backgroundLocation;

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedLoginId = loginId.trim();

        if (
            !trimmedLoginId ||
            !password ||
            !passwordConfirm
        ) {
            setMessage('Please enter all required fields.');
            return;
        }

        if (password.length < 4) {
            setMessage(
                'Password must be at least 4 characters.',
            );
            return;
        }

        if (password !== passwordConfirm) {
            setMessage('Passwords do not match.');
            return;
        }

        const loginLocationState = {
            registered: true,
            ...(backgroundLocation && {
                backgroundLocation,
            }),
        };

        navigate('/login', {
            replace: true,
            state: loginLocationState,
        });
    };

    // 로그인 페이지로 돌아가기
    const handleLogin = () => {
        if (backgroundLocation) {
            navigate('/login', {
                state: {
                    backgroundLocation,
                },
            });
            return;
        }

        navigate('/login');
    };

    // 회원가입 모달 닫기
    const handleClose = () => {
        if (!modal) {
            return;
        }

        navigate(-1);
    };

    return (
        <main
            className={
                modal
                    ? 'Login Login--modal'
                    : 'Login'
            }
        >
            {modal && (
                <button
                    type="button"
                    className="login-close"
                    onClick={handleClose}
                    aria-label="Close registration"
                >
                    ×
                </button>
            )}

            <section className="login-panel">
                <header className="login-header">
                    <p className="login-path">
                        authentication://myHome/register
                    </p>

                    <h1>Create Account</h1>

                    <p>
                        Register a new system account.
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
                            autoComplete="new-password"
                        />
                    </label>

                    <label>
                        <span>Confirm Password</span>

                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={(event) => {
                                setPasswordConfirm(
                                    event.target.value,
                                );
                            }}
                            autoComplete="new-password"
                        />
                    </label>

                    <div className="login-actions">
                        <button type="submit">
                            Create Account
                        </button>

                        <button
                            type="button"
                            className="login-secondary"
                            onClick={handleLogin}
                        >
                            Back to Login
                        </button>
                    </div>
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

export default Register;