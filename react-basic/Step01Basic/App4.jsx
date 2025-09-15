import React, { useEffect, useState } from 'react'; // 함수형 에서 동작하는 hook

function App4() { // App4는 함수형 컴포넌트 
    // 회원 목록을 상태값으로 관리하기
    const [members, setMembers] = useState([]); // 초기값은 빈배열, 이 빈배열을 서버로부터 받아오려고한다
    // 회원정보를 수정중인지 여부를 상태값으로 관리하기
    const [editing, setEditing] = useState(false); // 초기값은 false로 
    // 선택한 회원의 정보를 상태값으로 관리하기
    const [member, setMember] = useState({num:0, name:"", addr:""}); // 초기값은 회원의 번호, 이름, 주소인 object 로 관리 
    // react 는 undefined, false, null 값을 화면에 출력하지않음. 초기의 object 는 null 값이기때문에 화면에 출력되지 않는다. 
    // 선택한 한명의 회원 정보를 뿌려줘야한다. 서버로부터 get방식을 받아와서 상태값을 변경시켜야한다. 

    /*
        useXXX() 형식을 react 에서 자주 사용하는데 이걸 hook 이라고한다. 
        hook react 에서 사용하는 유틸리티라고 생각하면 된다. 
        상태값 관리: useState
        컴포넌트 활성화/비활성화 시 동작 : useEffect

            useEffect(()=>{}, [])
        
        두번째 매개변수에 빈 배열을 전달하면 첫번째 매개변수에 전달한 함수가 
        이 component(App4 component) 가 준비되었을때 최초 1번 호출된다. 
        무언가 준비할 것이 있으면 해당 함수 안에서 준비하면된다.  
    */
    // 로딩 시점에 준비할 데이터 정보 관리 
    useEffect(()=>{
        getMembers(); //useEffect 안에 getMembers를 넣은 이유 = "컴포넌트 처음 준비될 때 서버에서 목록 가져오기 위해"
        // 이후에도 추가/수정/삭제가 끝나면 getMembers() 다시 불러서 목록 갱신 → 새로고침 없이 최신 데이터 표시
    }, []);


    // 회원 목록을 요청해서 상태값을 변경해주는 함수를 따로 만들어 놓고 useEffect 에서 함수를 호출해서 사용할 수 있다.
    const getMembers = ()=>{
        // table 에 출력할 회원 목록을 받아와서 state 를 변경시킨다 
        fetch("/api/v1/members")
        .then(res => res.json())
        .then(data =>{
            setMembers(data);
        });
    }


    // 삭제 버튼을 눌렀을때 호출되는 함수 
    const handleDelete = (num) =>{
        const isDelete = confirm(num+"번 회원을 삭제할까요?");
        if(isDelete){
            fetch(`/api/v1/members/${num}`, {
                method:"delete"
            })
            .then(res=>res.json())
            .then(data=>{
                // 삭제 성공시 여기가 호출된다.
                getMembers();
            });
        }
    }


    // 이름과 주소를 변경했을때 실행할 함수
    const handleChange = (e) => {
        // 이벤트가 일어난 요소의 name 속성의 값 "name" or "addr"
        const name = e.target.name;
        // 이벤트가 일어난 요소에 입력한 값 "클라이언트가 입력한 문자열"
        const value = e.target.value;
        // 상태값 변경하기 
        setMember({
            ...member, // 기존의 object 안에 있는 값을 펼처놓고 
            [name] : value // 수정한 내용의 value 만 덮어쓰기 한다  
            // key 값에 []는 방에 이름이 문자열로 존재한다는 의미이다. 
            // 변수안에 있는 문자열로 key 값을 결정하고 싶다는 것 
            // (즉, name 이라는 참조값을 통해 변수에 있는 key 값인 e.target.name; 으로) 
            // 대괄호가 없으면 그저 그 변수안에 value 값이 들어가는 것이다, 하지만 우리는 그 변수를 참조하고자 하려고 하는 것임 넣는것이 아니라..! 
            // 결국 member 를 펼쳐놓고 원하는 key 값인 name 이라는 참조변수를 value 값(e.target.value=현재 입력한 값)으로 넣겠다는 의미(덮어쓰겠다는 의미이다.)
            // 위의 경우는 변수를 따로 선언하지 않고 줄여서 한번에 쓴 것 그래서 [name] : value 가 된다.
            
        });
        
    }


    // 회원정보 수정 form 에 submit 이벤트가 일어났을때 실행할 함수 등록
    const handleUpdateSubmit= (e)=>{
        // 폼 전송 막기
        e.preventDefault();
        const form = e.target; // 수정 form 요소의 참조값 

        fetch(form.action,{ 
            method:"put", //form.method 라고 하는 것은 get 이랑 post 방식만 가능하다. put방식은 form.action 처럼 사용이 불가능하다.  
            headers:{"Content-Type":"application/json"}, // json 문자열을 보낸다고 알림 
            body:JSON.stringify(member) // 상태값으로 관리되는 member object 를 json 문자열로 변경
        })
            .then(res=>res.json())
            .then(data=>{
                // 수정 성공시 호출되는 함수
                alert(`${data.num}번 회원 정보를 수정했습니다`)
                setEditing(false);
                setMember({
                    num:0, name:"", addr:""
                });
                getMembers(); // 리프레쉬, 수정된 것을 바로 확인가능 (redirect 기능과 유사)
            });
    };


    

    return (
        <div className="container">            
            
            { editing && <div>
                <h1><span>{member.num}</span>번 회원 수정양식</h1>
                <form onSubmit={handleUpdateSubmit} action={`/api/v1/members/${member.num}`} method="post">
                    <div>
                        <label htmlFor="name">이름</label>
                        <input onChange={handleChange} type="text" name="name" id="name" value={member.name} />
                    </div>
                    <div>
                        <label htmlFor="addr">주소</label>
                        <input onChange={handleChange} type="text" name="addr" id="addr" value={member.addr} />
                    </div>
                    <button type="submit">수정확인</button>
                    <button onClick={()=>setEditing(false)} type="button">취소</button> 
                </form>
            </div>}


            <h1>회원추가 양식</h1>
            <form action="/api/v1/members" method="post" onSubmit={(e)=>{
                // 폼 제출 막기 
                e.preventDefault(); // preventDefault() 는 폼 제출을 막는다. 
                // 이벤트가 일어난 바로 그 요소(form)
                const form = e.target;
                // 폼에 입력한 내용을 담고 있는 FormData 객체를 얻어낸다. 
                const formData = new FormData(form);
                // 폼에 입력한 내용을 object 로 변환
                const obj = Object.fromEntries(formData); // fromEntries ()는 변환
                // object 를 JSON 문자열로 변환
                const json = JSON.stringify(obj); // 참조값 obj 를 JSON.stringify 를 이용해서 JSON 문자열로 변환할 수 있다. 
                
                // fetch() 함수를 이용해서 전송하기
                fetch(form.action, { // {} 는  obejct 에 대한 옵션을 바꿀 수 있다. 
                    method:form.method, // 요청 method, form.method 가 아닌 post 라고 적어도 된다
                    headers:{"Content-Type":"application/json"}, // 요청 header
                    body:json // 요청 body
                }) 
                .then(res => res.json())
                .then(data=>{
                    // data 는 방금 추가한 회원 정보 
                    console.log(data);
                    getMembers();
                });
            // 전송된 이 데이터는 Spring boot server 에서 @RequestBody 로 추출할 수 있다.
            }}>
                <input type="text" name="name" placeholder='이름 입력...' />
                <input type="text" name="addr" placeholder="주소 입력..." />
                <button type="submit">추가</button>
            </form>


            <h1>회원목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>주소</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(item => (
                        <tr key={item.num}>
                        <td>{item.num}</td>
                        <td>{item.name}</td>
                        <td>{item.addr}</td>
                        <td>
                            <button onClick={()=>{
                                setEditing(true);
                                // 수정할 회원의 정보를 받아와서 상태값을 변경한다.
                                fetch(`/api/v1/members/${item.num}`)
                                .then(res=>res.json())
                                .then(data=>setMember(data));
                            }}>Edit</button>
                        </td>
                        <td>
                            <button onClick={()=>handleDelete(item.num)}>x</button> 
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}

export default App4;
