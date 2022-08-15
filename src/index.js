import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { ModalProvider } from './Context/modalContext/ModalContext';
import { MontungProvider } from './Context/MontungContext';
import { NavProvider } from './Context/NavContext';
import { TunggakanProvider } from './Context/TunggakanContext';
import { UsulanProvider } from './Context/UsulanContext';
import { SelesaiProvider } from './Context/SelesaiContext';
import { TambahProvider } from './Context/modalContext/TambahContext';
import { ProfileProvider } from './Context/ProfileContext';
import Pages from './Pages';

import reportWebVitals from './reportWebVitals';







ReactDOM.render(
  <React.StrictMode>
    <NavProvider>
      <TunggakanProvider>
        <UsulanProvider>
          <SelesaiProvider>
            <ModalProvider>
              <MontungProvider>
                <TambahProvider>
                  <ProfileProvider>
                    <Pages />
                  </ProfileProvider >
                </TambahProvider >
              </MontungProvider >
            </ModalProvider >
          </SelesaiProvider >
        </UsulanProvider >
      </TunggakanProvider >
    </NavProvider >
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
