// src/pages/ClientFrom.jsx


import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';



function ClientForm() {
    // route 이동을 위한 함수
    const navigate = useNavigate(); 
    // 에러를 상태값으로 관리 
    const [errors, setErrors] = useState({}); 


    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const obj = Object.fromEntries(formData);
        
        axios[form.method](form.action, obj)
        .then(res => {
            navigate(`/clients/${res.data.num}`, {
                state:{message:"고객정보를 추가했습니다"}
            });
        })
        .catch(err =>{
            // client 정보 추가 실패! (@valid 위반)
            console.log(err);
            // @Valid 에러 객체를 state 에 넣어준다. 
            setErrors(err.response.data.errors)
        }) 
    }



    return (
        <>
        <h1 className="mt-3 mb-3">새 Client 등록 양식</h1>
        <form action="/api/v3/clients" onSubmit={handleSubmit} method="post" > 
            <div className="mb-3">
                <label className="form-label" htmlFor="userName">이름</label>
                <input className="form-control" type="text" name="userName" id="userName" required/>
                {errors.userName && <small className="text-danger">{errors.userName}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="birthday">생일(선택)</label>
                <input className="form-control" type="date" name="birthday" id="birthday"/>
                <small className="form-text text-muted">나중에 입력가능</small>
                {errors.birthday && <small className="text-danger">{errors.birthday}</small>}
            </div>
            <button className="btn btn-success" type="submit" >등록</button>
        </form>
        </>
    );
}

export default ClientForm;