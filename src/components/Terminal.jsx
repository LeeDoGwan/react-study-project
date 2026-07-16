import { useState } from 'react';


function Terminal() {
    const [input, setInput] = useState('');
    const [lines, setLines] = useState([]);
    const [phase, setPhase] = useState('username');
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        //ldg0819 form 제출 시 새로고침 방지
        event.preventDefault();

        const value = input.trim();

        if (!value) {
            return;
        }

        switch (phase) {
            // 아이디 처리
            case 'username':
                setUsername(value);
                setPhase('password');
                break;

            case 'password':
                if (value === 'lee') {
                    setPhase('shell');
                } else {
                    setUsername('');
                    setPhase('username');
                }
                break;

            case 'shell':
                // 명령어 처리
                break;

            default:
                break;
        }

        setLines((previousLines) => [
            ...previousLines,
            value,
        ]);


        setInput('');
    };

    const getPrompt = () => {
        switch (phase) {
            case 'username':
                return 'myHome login:';

            case 'password':
                return 'Password:';

            case 'shell':
                return 'visitor@myHome:~$';

            default:
                return '';
        }
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <span>{getPrompt()}</span>
                <input
                    type={
                        phase === 'password' ? 'password' : 'text'
                    }
                    value={input}
                    onChange={(event) => {
                        setInput(event.target.value);
                    }}
                />
                {lines.map((line, index) => (
                    <div key={index}>
                        {line}
                    </div>

                ))}
            </form>

        </section>
    );
}

export default Terminal;