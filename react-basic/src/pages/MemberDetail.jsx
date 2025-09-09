// src/pages/MemberDetail.jsx

import React, { useEffect, useState } from 'react';
import { data, useParams } from 'react-router-dom';

function MemberDetail() {
    // 자세히 보여줄 회원의 번호를 읽어와서
    // react router 에서 제공해주는 hook 을 이용해서
    // "/members/:num" 에서 num 에 해당하는 자세히 보여줄 회원의 번호를 얻어낸다
    const {num} = useParams(); // useParams 는 obejct type 을 리턴 {num}

    // API 서버에 해당 회원 한명의 정보를 받아와서 ui 에 출력한다 
    const [dto, setDto] = useState({});

    useEffect(()=>{
        fetch(`/api/v1/members/${num}`)
        .then(res=>res.json())
        .then(data => setDto(data));
    });
    return <>
            <h1>회원 자세히 보기</h1>
            <p>번호: <strong>{dto.num}</strong></p>
            <p>이름: <strong>{dto.name}</strong></p>
            <p>주소: <strong>{dto.addr}</strong></p>
        </>
    
}

export default MemberDetail;