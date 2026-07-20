import {useRef, useState, useEffect} from 'react';
import './Terminal.css';
import TypeItRenderer from "./TypeItRenderer.jsx";
import { executeCommand } from '../commands/commands.js';
import {
    useNavigate,
} from 'react-router';

const SHELL_TYPE_OPTIONS = {
    speed: 5,
    cursor: false,
};

function Terminal({user}) {
    //ldg0819 routes
    const navigate = useNavigate();

    const [input, setInput] = useState('');

    const [username, setUsername] = useState('');
    const [entries, setEntries] = useState([]);

    const outputRef = useRef(null);
    const inputRef = useRef(null);
    const hasOpenedLoginRef = useRef(false);

    const dirLogin = () =>{
        if (hasOpenedLoginRef.current) {
            return;
        }
        hasOpenedLoginRef.current = true;

        const frameId = requestAnimationFrame(() => {
            navigate('/login', {
                replace: true,
            });
        });

        return () => {
            cancelAnimationFrame(frameId);
        };
    }

    useEffect(() => {
        dirLogin();
    }, [navigate]);

    const handleSubmit = (event) => {
        //ldg0819 form 제출 시 새로고침 방지
        event.preventDefault();
        const value = input.trim();

        if (!value) {
            handleCommand("");
            inputAfter();
            return;
        }
        handleCommand(value);

        inputAfter();
    };

    //ldg0819 input after
    const inputAfter = () => {
        setInput('');
        scrollToBottom();
    }

    const handleCommand = (value) => {
        const result = executeCommand(value, {
            username: user?.loginId ?? '',
        });

        //ldg0819 clear
        if (result.clear) {
            setEntries([]);
            // setLines([]);
            return;
        }

        //ldg0819 결과값
        const newEntry = {
            id: crypto.randomUUID(),
            command: `${username}@myHome:~$ ${value}`,
            output: result.output,
            route: result.route ?? null,
        };
        setEntries((previousEntries) => [
            ...previousEntries,
            newEntry,
        ]);

        //ldg0819 로그아웃
        if (result.logout) {
            hasOpenedLoginRef.current = false;
            dirLogin();
        }
    };

    //ldg0819 터미널 포커스 -> 인풋 포커스
    const focusInput = (event) => {
        const target = event.target;

        if ( //ldg0819 input 포커스 -> 링크, 버튼 가는 상황 예외처리
            target.closest('a') ||
            target.closest('button')
        ) {
            return;
        }

        inputRef.current?.focus();
    };

    const getPrompt = () => {
        const name = user?.loginId?? '';
        return `${name}@myHome:~$`;
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
        <section
            className="terminal"
            onClick={focusInput}>
            <div
                ref={outputRef}
                className="terminal-output">
                {entries.map((entry) => (
                    <TypeItRenderer
                        key={entry.id}
                        command={entry.command}
                        output={entry.output}

                        className="terminal-entry"
                        options={SHELL_TYPE_OPTIONS}
                    />
                ))}
            </div>
            <form className="terminal-input-row" onSubmit={handleSubmit}>
                <span>{getPrompt()}</span>
                <input className="inSubmit" ref={inputRef}
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