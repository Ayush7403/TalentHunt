import React from 'react'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDom from 'react-dom/client'

const persistor = persistStore(store);

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading ={null} persistor = {persistor}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster/>
  </React.StrictMode>,
)
