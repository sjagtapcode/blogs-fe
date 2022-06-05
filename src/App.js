import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import AuthProvider from './contexts/auth';
import ReviewBlog from './components/ReviewBlog';
import Profile from './components/Profile';
import CreateBlog from './components/CreateBlog';
import Blogs from './components/Blogs';
import NotFound from './components/NotFound';
import { Container } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Container>
            <Routes>
              <Route exact path='/' element={<Blogs />} />
              <Route exact path='/create-blog' element={<CreateBlog />} />
              <Route exact path='/review-blog' element={<ReviewBlog />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
