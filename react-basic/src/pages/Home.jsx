// src/pages/Home.jsx
import { useState } from 'react';
import styles from '../css/index.module.css';

// npm install classnames 된 모듈을 import 해서 cn 이라는 이름으로 사용하기
// cn 은 function type 이다 따라서 cn() 형식으로 사용한다 
// cn() 안에 배열[]을 전달할 수 있다. 
import cn from 'classnames';


function Home() {
    // cn( ) 안에 배열을 전달할 수 있으니까 미리 만들어진 배열을 넣을 수 있다. 
    const classArray = ["btn btn-warning"];
    // cn({"btn":true, "btn-success":true}) => object 를 전달할 수도 있다. boolean type 으로 제어한다 
    const classObject = {"btn":true, "btn-success":true}; 

    // 만약에 특정 클래스를 적용할지말지를 조건부로 하고 싶다면 그때그때 다르게 하고 싶다면 classnames 를 사용하는게 좋다
    // [ ]배열이나 { }object 가 state 상태값으로 관리한다면 클래스가 자동으로 추가되거나 제거되면서 제어할 수 있는 기능을 구현할 수 있다. 


    // 체크박스의 체크 상태는 boolean type 으로 관리할 수 있다.
    const [checked, setChecked] = useState(false);

    // onChange 이벤트가 발생했을때 실행할 함수
    const handleChange = (e)=>{
        // 체크 박스 체크 여부를 알아내서 
        const isChecked = e.target.checked;
        // 상태값에 반영한다
        setChecked(isChecked); // boolean type 이기 때문에 isChecked 이면 true 를 리턴한다 
        
    };

    // 특정 메세지의 style 을 object 로 관리하기 
    const [messageStyle, setMessageStyle] = useState({
        "bg-success" : false,
        "text-danger" : false
    });

    const handleChange2 = (e)=>{
        // 체크박스의 value : e.target.value
        // 체크박스의 체크여부 : e.target.checked
        const value = e.target.value; // checkbox 의 value 값 (bg-info, text-danger)
        const isChecked = e.target.checked; // checkbox 의 체크여부 (true , false) => false 가 나오도록 상태값을 조정하면 색이 해제됨
        // 위 두줄은 구조분해할당으로 한줄로도 작성할 수 있다. 
        // const{value, isChecked} = e.target;

        // 상태값 변경하기
        setMessageStyle({
            ...messageStyle, // 펼쳐놓고 ... 
            [value]:isChecked // value 를 isChecked => true 로 상태값을 변경한다 
        });
    };

    return (
        <>
            <h1 className={styles["my-bg"]}>Index 페이지</h1>
            <button className="btn ms-2 btn-primary">버튼1</button>
            <button className={cn("btn ms-2", "btn-secondary")}>버튼2</button>
            <button className={cn(["btn ms-2", "btn-danger"])}>버튼3</button>
            <button className={cn("btn ms-2", classArray)}>버튼4</button>
             <button className={cn({"btn ms-2":true, "btn-success":true})}>버튼5</button>
            <button className={cn("btn ms-2", classObject)}>버튼6</button> 
            <button className={cn("btn-lg ms-2", classObject)}>버튼7</button>
            <hr />
            <h3 className="mb-3">checkbox 의 체크상태를 state 로 관리</h3>
            <label htmlFor="checkbox">
                <input onChange={handleChange} type="checkbox" checked={checked}/> 체크해보세요
            </label>
            <p className={cn({"bg-info":checked})}>어쩌구.. 저쩌구...</p> {/** 상태값인 checked 로 관리함으로써 bg-info 라는 css class 를 부여하여 checked 이벤트가 발생했을때 css를 적용할 수 있다 */}

            <h3>checkbox 의 value 도 같이 사용해보기</h3>
            <label>
                <input onChange={handleChange2} type="checkbox" value="bg-success" />초록색 배경
            </label>
            <label>
                <input onChange={handleChange2} type="checkbox" value="text-danger" />빨간색 글자
            </label>
            <p className={cn(messageStyle)}>어쩌구... 저쩌구...</p>
        </>
    );
}

export default Home