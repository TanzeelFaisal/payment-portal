import React from 'react';
import './Layout.css';

const Layout = ({ children }) => (
  <div class="layout">
    <div class="header"/>
    {children}
    <div class="footer"/>
  </div>
);

export default Layout;