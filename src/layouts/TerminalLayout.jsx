import {
    Outlet,
    useLocation,
} from 'react-router';
import {useState} from "react";

import Terminal from '../components/Terminal.jsx';
import './TerminalLayout.css';


function TerminalLayout() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    // 자식 라우트가 있으면 Terminal 위에 페이지가 열린 상태
    const isPageOpen = location.pathname !== '/';

    return (
        <main className="app">
            {/* 항상 유지되는 Terminal */}
            <div
                className="route-background"
                inert={
                    isPageOpen ? '' : undefined
                }
                aria-hidden={isPageOpen}
            >
                <Terminal user={user}/>
            </div>

            {/* /login, /register 등의 페이지 */}
            {isPageOpen && (
                <div className="route-overlay">
                    <Outlet
                        context={{
                            user,
                            setUser,
                        }}
                    />
                </div>
            )}
        </main>
    );
}

export default TerminalLayout;