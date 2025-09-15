// src/pages/clients

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


function Clients() {
   
    // 서버에서 응답받은 데이터를 상태값으로 관리한다 
    const[clients, setClients] = useState([]);

    // 컴포넌트 활성화 시점에 
    useEffect(()=>{
        // api 서버로부터 고객목록을 얻어와서 
        axios.get("/api/v3/clients") // fetch 와 동일하게 promise 를 반환한다 
        .then(res => {
            console.log(res);
            // res.data 에 서버가 응답한 data 가 들어있다. 
            // 상태값으로 넣어준다. 
            setClients(res.data); // res.data 를 이용해서 상태값을 관리한다  
        })
        .catch(err => console.log(err));
    }, []);
    
    return (
    <>
    <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="mt-3">고객 목록</h2>
    <Button as={NavLink} to="/clients/new" variant="primary" className="mt-3">
        + 고객 추가
    </Button>
    </div>

    <div className="card shadow-sm">
        <div className="card-body p-0">
            <table className="table table-hover mb-0 align-middle text-center">
                <thead className="table-light">
                    <tr>
                    <th style={{ width: "10%" }}>번호</th>
                    <th style={{ width: "25%" }}>이름</th>
                    <th style={{ width: "20%" }}>생일</th>
                    <th style={{ width: "25%" }}>등록일</th>
                    <th style={{ width: "20%" }}>자세히</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((item) => (
                    <tr key={item.num}>
                        <td className="fw-bold">{item.num}</td>
                        <td>{item.userName}</td>
                        <td>{item.birthday}</td>
                        <td>{item.createdAt}</td>
                        <td>
                            <Button as={NavLink} to={`/clients/${item.num}`} variant="outline-primary" size="sm">보기</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
    );
}

export default Clients;