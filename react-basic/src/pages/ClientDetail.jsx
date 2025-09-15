// src/pages/ClientDetail.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink,  useLocation,  useParams } from 'react-router-dom';

function ClientDetail() {

    // 회원 1명의 정보는 state 값으로 관리
    const [dto, setDto] = useState({});

    // location 객체에 state 라는 키값으로 담긴 내용을 읽어오기 위한 hook
    const {state} = useLocation();

    // "/clients/:num" 에서 num을 읽어내기 위한 hook 
    const {num} = useParams(); 

    useEffect(()=>{
        // 이름이 없는 화살표 함수를 만들자마자 call()
        (async ()=>{
            try{
                const res = await axios.get(`/api/v3/clients/${num}`)
                // 회원 한명의 정보를 상태값으로 넣어준다 
                setDto(res.data); 
                // 순차적으로 요청하는 경우에는 async try-catch 가 더 유용 (여기서 num 값을 res 에 전달 -> dto 에 담는 과정)
            }catch(err){
                console.log(err);
            }
        })();  // call 
    }, [num]);

    return (
        <>
            {state && <div className="alert alert-success">{state.message}</div>}

            <h2 className="mt-3 mb-4 text-center">고객 상세 정보</h2>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white fw-bold">
                    고객 번호 : {dto.num}
                </div>
                <div className="card-body">
                    <dl className="row mb-0">
                    <dt className="col-sm-3">이름</dt>
                    <dd className="col-sm-9">{dto.userName}</dd>

                    <dt className="col-sm-3">생일</dt>
                    <dd className="col-sm-9">{dto.birthday}</dd>

                    <dt className="col-sm-3">수정일</dt>
                    <dd className="col-sm-9">{dto.updatedAt}</dd>

                    <dt className="col-sm-3">등록일</dt>
                    <dd className="col-sm-9">{dto.createdAt}</dd>
                    </dl>
                </div>
                <div className="card-footer text-end">
                    <Button variant="secondary" as={NavLink} to="/clients/">목록으로</Button>
                    <Button className="ms-2" variant="primary" as={NavLink} to={`/clients/${dto.num}/edit`}>
                    수정
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ClientDetail;