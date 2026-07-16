import './App.css'
// import { useState } from 'react';
import BootSequence from './components/BootSequence.jsx';
import Terminal from './components/Terminal.jsx';
import Login from './pages/Login.jsx';
import './App.css';
import {Route, Routes, useLocation} from "react-router";
import {useState} from "react";

//TODO: 로그인 화면 / 회원가입 화면 / CLI / 별 (내 사진 opacity 조절해서 그림형태에서 사진형태로) / webview로 git 보여주고
function App() {
    const [isBootComplete, setIsBootComplete] = useState(false);
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;

  return (
      <>
          <Routes
              location={backgroundLocation || location}
          >
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
              <Route
                  path="/login"
                  element={<Login />}
              />
          </Routes>

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
      </>
    // <main className="app">
    //     {isBootComplete ? (
    //         <Terminal />
    //     ) : (
    //         <BootSequence
    //             onComplete={() => setIsBootComplete(true)}
    //         />
    //     )}
    // </main>
  )
}

export default App
