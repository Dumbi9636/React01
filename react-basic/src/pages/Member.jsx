// src/pages/Member.jsx

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Member() {

    // 회원 목록을 상태값으로 관리한다 
    const [members, setMembers] = useState([]);

    // 컴포넌트가 활성화 될때 회원목록 받아오기(최초 1번) -> useEffect 를 사용
    useEffect(()=>{
        fetch("/api/v1/members")
        .then(res=>res.json())
        .then(data => setMembers(data));
    }, []);

    return (
        <>
           <h1 className="mt-5 mb-5">회원 목록입니다</h1> 
           <table className="table table-stripted">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>자세히</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(item => 
                        <tr>
                            <td>{item.num}</td>
                            <td>{item.name}</td>
                            <td>
                                <NavLink to={`/members/${item.num}`}>보기</NavLink>
                            </td>
                        </tr>
                    )}
                </tbody>
           </table>
        </>
    );
}

export default Member;