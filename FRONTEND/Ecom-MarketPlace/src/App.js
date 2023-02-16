import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/searchbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Searchbar />
      <Footer />
    </div>
  )
}

export default App;
