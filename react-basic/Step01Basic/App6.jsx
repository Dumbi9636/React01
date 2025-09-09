// src/App6.jsx

import React from 'react';

// 외부 FriendsComponent 를  import 해서 사용할 수 있다. 
import FriendsComponent from './components/FriendsComponent';

function App6() {
    const names=["김구라", "해골", "원숭이"];
    // 적절한 property 명으로 적절한 name 만 넣으면 잘 작동한다. 
    // 누군가 잘 만든 컴포넌트를 import 해서 사용할 수 있다. 
    return (
        <div className="container">
            <FriendsComponent names={names}/> 
        </div>
    );
}

export default App6;