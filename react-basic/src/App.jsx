// src/App.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink, useOutlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function App() {
    // React Router v6 에서 제공하는 hook
    // 현재 경로에 맞는 자식 route component 를 반환한다
    const currentOutlet=useOutlet();

    return (
        <div className="container pt-4">
            <Nav variant='pills'>
                {/*
                    UI 는 react bootstrap 의 Nav.Link 이지만
                    as={NavLink} 설정으로 동작은 react router 의 NavLink 의 동작을 한다 
                    어디로 이동할지에 대한 정보는 to="경로" 에 작성하면 된다
                */}
                <Nav.Item>
                    <Nav.Link as ={NavLink} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as ={NavLink} to="/study">Study</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as ={NavLink} to="/play">Play</Nav.Link>
                </Nav.Item>
                 <Nav.Item>
                    <Nav.Link as ={NavLink} to="/member">회원 목록</Nav.Link>
                </Nav.Item>
            </Nav>
            {currentOutlet}
        </div>
    );
}

export default App;