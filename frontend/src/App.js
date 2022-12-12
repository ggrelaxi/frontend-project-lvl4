import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
    useEffect(() => {
        fetch('http://localhost:5001/api/v1/data')
            .then((res) => res.json())
            .then(console.log);
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
};
export default App;
