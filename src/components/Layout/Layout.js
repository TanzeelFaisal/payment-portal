import React from 'react';
import './Layout.css';

const Layout = ({ children }) => (
  <div class="layout">
    <div class="header"/>
    <div className='main-container'>
      {children}
    </div>
    <div class="footer"/>
  </div>
);

export default Layout;