import './App.css'
import { useState } from 'react';
import BootSequence from './components/BootSequence.jsx';
import Terminal from './components/Terminal.jsx';
import './App.css';

function App() {
    const [isBootComplete, setIsBootComplete] = useState(false);
//TODO: 로그인 화면 / 회원가입 화면 / CLI / 별 (내 사진 opacity 조절해서 그림형태에서 사진형태로) / webview로 git 보여주고
  return (
    <main className="app">
        {isBootComplete ? (
            <Terminal />
        ) : (
            <BootSequence
                onComplete={() => setIsBootComplete(true)}
            />
        )}
    </main>
  )
}

export default App
