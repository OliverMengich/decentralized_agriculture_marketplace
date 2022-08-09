import React from 'react';
import './App.css';
import Home from './pages/Home/home-page';
import UserAccount from './pages/User_Account/user-account';
import Vendors from './pages/Vendors/vendors';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/user' element={<UserAccount/>} />
          <Route path='/vendors' element={<Vendors/>} />
        </Routes>
      </BrowserRouter>

    );
  }
}

export default App;
