import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ToDoList from './components/ToDo/ToDoList';
import NotFound from './components/NotFound';
import { FaGithub } from 'react-icons/fa'; 

function App() {

  return (
    <div>
      <BrowserRouter>
        <header>
        <a href='https://github.com/Iinaus'><FaGithub /> Iinaus </a>
          <nav>
            <Link to='/'>Home</Link>{' '}
            <Link to='/todolist'>To-do</Link>{' '}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/todolist' element={<ToDoList />} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
