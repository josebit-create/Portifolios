// react
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import { useState, useEffect} from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// css
import './App.css';

// pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

// components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// context
import { AuthProvider } from './context/AuthContext';




function App() {

  const [user, setUser] = useState()
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })


  }, [auth])

  if(loadingUser){
    return <p>Carregando....</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/search' element={<Search />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path='/dashboard/posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/" />} />
            <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes> 
        </div>
        <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
