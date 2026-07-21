import {useState} from 'react';
import {
    useLocation,
    useNavigate,
} from 'react-router';
import './Login.css';

//영문과 숫자를 각각 최소 1개 포함, 특수문자 금지, 8~15자v
const ID_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

//영문과 특수문자를 각각 최소 1개 포함, 8~15자
const PASSWORD_REGEX =
    /^(?=.{8,15}$)(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])\S+$/;

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
        if (!ID_REGEX.test(trimmedLoginId)){
            setMessage('ID must be 8-15 characters and contain both letters and numbers.');
            return;
        } else if (!PASSWORD_REGEX.test(password)){
            setMessage('Password must be 8-15 characters, include at least one letter and one special character')
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

    const dirLogin = () =>{
        if (backgroundLocation) {
            navigate('/login', {
                state: {
                    backgroundLocation,
                },
            });
            return;
        }

        navigate('/login');
    }

    // 로그인 페이지로 돌아가기
    const handleLogin = () => {
        dirLogin();
    };

    // 회원가입 모달 닫기
    const handleClose = () => {
        dirLogin();
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
                        <button type="submit" className="login-register">
                            Create Account
                        </button>

                        <button
                            type="button"
                            className="login-submit"
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