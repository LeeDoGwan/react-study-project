import './App.css'
import { useState } from 'react';
import BootSequence from './components/BootSequence.jsx';
import Terminal from './components/Terminal.jsx';
import './App.css';

function App() {
    const [isBootComplete, setIsBootComplete] = useState(false);

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
