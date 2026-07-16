import './App.css'
import { useState } from 'react';
import BootSequence from './components/BootSequence.jsx';
import Terminal from './components/Terminal.jsx';

function App() {
    const [isBootComplete, setIsBootComplete] = useState(false);

  return (
    <main>
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
