import './App.css';

import {
    Route,
    Routes,
} from 'react-router';
import {useState} from 'react';

import BootSequence from './components/BootSequence.jsx';
import TerminalLayout from './layouts/TerminalLayout.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
// import Projects from './pages/Projects.jsx';

function App() {
    const [isBootComplete, setIsBootComplete] =
        useState(false);

    if (!isBootComplete) {
        return (
            <BootSequence
                onComplete={() => {
                    setIsBootComplete(true);
                }}
            />
        );
    }

    return (
        <Routes>
            {/* Terminal을 항상 유지하는 레이아웃 */}
            <Route
                path="/"
                element={<TerminalLayout />}
            >
                {/* Terminal 위에 표시되는 페이지 */}
                <Route
                    path="login"
                    element={<Login modal />}
                />

                <Route
                    path="register"
                    element={<Register modal />}
                />

                {/*
                <Route
                    path="projects"
                    element={<Projects modal />}
                />
                */}
            </Route>
        </Routes>
    );
}

export default App;