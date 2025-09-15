// src/App.jsx

import 'bootstrap/dist/css/bootstrap.css'
import { NavLink, useOutlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
// 1. css 를 import 할 수 있다. 전역으로 import 된다
// 2. app.module.css 를 import 해서 style 이라는 이름으로 사용하기 
//    css 파일명을 xxx.module.css 로 지으면 반드시 어떤 이름(여기서는 styles)으로 import 해서 사용해야한다. 
import styles from './css/app.module.css';  



function App() {
    // React Router v6 에서 제공하는 hook
    // 현재 경로에 맞는 자식 route component 를 반환한다
    const currentOutlet=useOutlet();

    // styles object 의 구조를 확인해보기
    console.log(styles);

    return (
        <div className="container">
            {/** javascript에서 - 는 빼기로 인식되기 때문에, {styles["my-bg"]} 로 입력해야함*/}
            <Nav className={styles["my-bg"]}> 
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/game">Game</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/study">Study</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/clients">Clients</Nav.Link>
                </Nav.Item>
            </Nav>
            {currentOutlet}
        </div>
    );
}

export default App;