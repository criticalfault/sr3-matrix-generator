import './App.css';
import Container from 'react-bootstrap/Container';
import SecuritySheaf from './components/SecuritySheaf';

function App() {
  return (
    <div className="App">
      <Container>
        <SecuritySheaf key={1}/>
      </Container>
    </div>
  );
}

export default App;