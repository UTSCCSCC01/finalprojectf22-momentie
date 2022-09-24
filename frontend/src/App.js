import logo from './logo.svg';
import './App.css';

function button_on_click(callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/login?username=candy&password=cane");

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => console.log(xhr.responseText);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      callback(xhr);
    }
  }

  xhr.send();
}

function App() {
  return (
    <div className="App">
      <button id="dummy"
        onClick={() => button_on_click(callback)}
      >
        "click me!!!!!!!"
      </button>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;