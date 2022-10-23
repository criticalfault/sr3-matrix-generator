import './App.css';
import Container from 'react-bootstrap/Container';
import SecuritySheaf from './components/SecuritySheaf';

function App() {
  return (
    <div className="App">
      <Container id="backgroundImage">
        <SecuritySheaf/>
      </Container>
    </div>
  );
}

export default App;