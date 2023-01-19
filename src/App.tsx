//import { useState } from 'react';
import { Header } from './components/Header';
import styles from './App.module.css';
import { Board } from './components/Board';

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Board />
      </div>
    </div>
  )
}

export default App
