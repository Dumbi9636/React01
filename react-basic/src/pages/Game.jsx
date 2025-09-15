// src/pages/Game.jsx

import { useState } from 'react';
import styles from '../css/game.module.css';
import cn from 'classnames';
function Game() {

    // 버튼 클릭 여부를 상태값으로 관리 
    const [clicked, setClicked] = useState(false);

    const handleButton = () =>{
        setClicked(!clicked);
    };
    
    const classArray =  ["btn", { "bg-success": clicked }, { "text-danger": clicked }, {"fw-bold": clicked}];
    
    return (
        <>
            <h1 className={styles["my-bg"]}>Game 페이지</h1>
            <br />
            <hr />
            <button onClick={handleButton}>버튼</button>
            <br />
            <p className={cn(classArray)}>배경색은 초록색 텍스트는 빨간색입니다</p>
            <br />
        </>
    );
}

export default Game;