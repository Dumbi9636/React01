// src/App.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { useOutlet } from 'react-router-dom';
import BsNavbar from './components/BsNavbar';

function App() {
    // React Router v6 에서 제공하는 hook
    // 현재 경로에 맞는 자식 route component 를 반환한다
    const currentOutlet=useOutlet();
    // useOutlet 은 return 되는 무언가를 렌더링한다 
    // 위치하고자하는 component 를 활성화시킬 수 있다. 이 정보는 index.jsx 에 있다
     
    return <>
        <BsNavbar/>
        <div className="container pt-4" style={{marginTop:"50px"}}>
            {/**nav bar 는 항상 표시됨 ( 고정 ) currentOutlet */}
            {currentOutlet}
        </div>
        
    </>
}

export default App;