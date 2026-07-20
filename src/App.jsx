import './App.css'
import {Route, Routes, useLocation} from "react-router";
import {useState} from "react";

import BootSequence from './components/BootSequence.jsx';
import Terminal from './components/Terminal.jsx';
import Login from './pages/Login.jsx';

import './App.css';


//TODO: 로그인 화면 / 회원가입 화면 / CLI / 별 (내 사진 opacity 조절해서 그림형태에서 사진형태로) / webview로 git 보여주고
function App() {
    const [isBootComplete, setIsBootComplete] = useState(false);
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;

    //ldg0819 Terminal 뒷배경으로
    const isLoginOverlay  = Boolean(backgroundLocation);
  return (
      <main className="app">
          {/* BootSequence 또는 Terminal이 표시되는 배경 */}
          <div
              className="route-background"
              inert={
                  isLoginOverlay
                      ? ''
                      : undefined
              }
              aria-hidden={isLoginOverlay}
          >
          <Routes location={backgroundLocation || location}>
              {isBootComplete ? (
                  <Route
                      path="/"
                      element={<Terminal />}
                  />
              ) : (
                  <Route
                      path="/"
                      element={<BootSequence
                          onComplete={() => setIsBootComplete(true)}
                      />}
                  />
              )}
              {/* 주소창에서 /login으로 직접 접근한 경우 */}
              <Route
                  path="/login"
                  element={<Login />}
              />
          </Routes>
          {/* Terminal 위에 표시되는 Login */}
          {backgroundLocation && (
              <Routes>
                  <Route
                      path="/login"
                      element={
                          <div className="route-overlay">
                              <Login modal />
                          </div>
                      }
                  />
              </Routes>
          )}
          </div>
      </main>
  )
}

export default App
