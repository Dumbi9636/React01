// src/pages/ClientUpdateForm.jsx

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

function ClientUpdateForm() {

    const [dto, setDto] = useState({
        userName:"",
        birthday:""
    });
    const {num} = useParams();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // 원본 dto 값을 상태값으로 관리 
    const [originalDto, setOriginalDto] = useState({});

    useEffect(()=>{
        (async ()=>{
            try{
            // promise 가 해결(서버가 응답) 되면 res 에는 응답 객체가 대입된다.  
            const res = await axios.get(`/api/v3/clients/${num}`)
            // 상태값 변경하기 
            setDto(res.data);
            setOriginalDto(res.data);
            }catch(err){
                console.log(err);
            }
       })(); // 함수를 만들어서 바로 호출
    }, [])


    const handleChange = (e) =>{ // input 요소에 입력한 데이터의 참조값은 e
        setDto({
            ...dto, // 기존의 상태값인 dto 를 펼쳐놓고
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.put(e.target.action, dto);  
            alert(`${dto.num}번 회원 정보를 수정했습니다`);
            navigate(`/clients/${num}`, {
                state:{
                    message:"수정된 고객정보입니다"}
            });
        }catch(err){ 
            console.log(err);
            setErrors(err.response.data.errors)
        }   
    }
    

    return (
        <>
            <h1>고객 정보 수정 양식</h1>
            <form action={`/api/v3/clients/${num}`} onSubmit={handleSubmit}>
                <div>
                    <label className="form-label" htmlFor="userName">이름</label>
                    <input className="form-control" type="text" id="userName" name="userName" value={dto.userName} onChange={handleChange} />
                     {errors.userName && <small className="text-danger">{errors.userName}</small>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="birthday">생일</label>
                    <input className="form-control" type="date" id="birthday" name="birthday" value={dto.birthday} onChange={handleChange} />
                    {errors.birthday && <small className="text-danger">{errors.birthday}</small>}
                </div>
                <Button type="submit" variant="primary">수정 확인</Button>
                <Button variant="secondary ms-2" as={NavLink} to ={`/clients/`}>목록으로</Button>
                <button onClick={()=>setDto(originalDto)} className="ms-1 btn btn-secondary" type="button">취소</button>
            </form>
        </>
    );
}

export default ClientUpdateForm;