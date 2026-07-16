import {useRef, useState} from 'react';
import './Terminal.css';
import TypeItRenderer from "./TypeItRenderer.jsx";

const SHELL_TYPE_OPTIONS = {
    speed: 5,
    cursor: false,
};


function Terminal() {
    const [input, setInput] = useState('');
    const [lines, setLines] = useState([]);
    const [phase, setPhase] = useState('username');
    const [username, setUsername] = useState('');

    const outputRef = useRef(null);

    const handleSubmit = (event) => {
        //ldg0819 form 제출 시 새로고침 방지
        event.preventDefault();
        const value = input.trim();

        if (!value) {
            return;
        }

        switch (phase) {
            case 'username': // 아이디 처리
                setUsername(value);
                if (value === 'lee'){
                    setPhase('password');
                }
                break;

            case 'password': // 비밀번호 처리
                if (value === '1234') {
                    setPhase('shell');
                } else {
                    setUsername('');
                    setPhase('username');
                }
                break;

            case 'shell': // 명령어 처리
                handleCommand(value);
                setLines((previousLines) => [
                    ...previousLines,
                    username + '@myHome:~$ ' + value,
                ]);
                break;

            default:
                break;
        }
        setInput('');
        scrollToBottom();
    };

    const handleCommand = (value) => {
        const [command, ...args] =
            value.split(/\s+/);

        switch (command) {
            case 'help':
                break;

            case 'echo':
                console.log(args.join(' '));
                break;

            case 'clear':
                setLines([]);
                break;

            case 'logout':
                setUsername('');
                setPhase('username');
                break;

            default:
                break;
        }
    };

    const getPrompt = () => {
        switch (phase) {
            case 'username':
                return 'myHome login:';

            case 'password':
                return 'Password:';

            case 'shell':
                return username + '@myHome:~$';

            default:
                return '';
        }
    };
    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            const output = outputRef.current;

            if (!output) {
                return;
            }

            const hasVerticalScroll =
                output.scrollHeight > output.clientHeight;

            if (hasVerticalScroll) {
                output.scrollTop = output.scrollHeight;
            }
        });
    };
    return (
        <section className="terminal">
            <div
                ref={outputRef}
                className="terminal-output">
                {lines.map((line, index) => (
                    <TypeItRenderer
                        key={`${index}-${line}`}
                        text={line}
                        className="terminal-line"
                        options={SHELL_TYPE_OPTIONS}
                    />
                ))}
            </div>
            <form className="terminal-input-row" onSubmit={handleSubmit}>
                <span>{getPrompt()}</span>
                <input
                    type={
                        phase === 'password'
                            ? 'password'
                            : 'text'
                    }
                    value={input}
                    onChange={(event) => {

                        setInput(event.target.value);
                    }}
                />
            </form>
        </section>
    );
}

export default Terminal;