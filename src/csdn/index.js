import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../../component/csdn/csdn.js';
import './index.scss';

ReactDOM.render(
    <div className="page">
        <Home />
    </div>,
    document.getElementById('page')
);