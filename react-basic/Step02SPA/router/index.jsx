/* 
    src/router/index.jsx

    - 파일명을 index.js or index.jsx 로 작성하면 외부에서 
      router 폴더까지만 import 했을때 자동으로 index.js or index.jsx 
      파일에서 export default 된 자원을 사용할 수 있다 

    - index 는 약속된 파일명이다 

*/

import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Play from "../pages/Play"; 
import Study from "../pages/Study";
import Member from "../pages/Member";
import MemberDetail from "../pages/MemberDetail";
import MemberForm from "../pages/MemberForm";
import MemberUpdateForm from "../components/MemberUpdateForm";
//import paths from "./member";


// 페이지 routing 정보를 배열에 미리 저장해둔다. 
const routes=[
    // spring boot 서버에 넣어서 실행하면 최초 로딩될때  /index.html 경로로 로딩된다.
    // 그럴때도  Home 컴포넌트가 활성화 될수 있도록 라우트 정보를 추가한다. 
    {path:"/index.html", element: <Home/>},
    {path:"/", element:<Home/>},    // 최상위 경로일때 Home component 가 활성화되도록 
    {path:"/study", element:<Study/>},
    {path:"/play", element:<Play/>},
    {path:"/members", element:<Member/>},
    {path:"/members/:num", element:<MemberDetail/>},
    {path:"/members/new", element:<MemberForm/>},
    {path:"/members/:num/edit", element:<MemberUpdateForm/>}
     // ...paths 배열을 member.js 처럼 작성해놓고 ...paths 처럼 정리해서 작성할 수도 있다. 
];


//export 해줄 router 객체를 만든다
const router = createHashRouter([{
    path:"/", // 이 경로일때 
    element:<App/>, // 이 component 를 활성화시킨다 
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);


// # 해시 없이 자연스러운 URL 주소를 보여주고 싶을때 BrowserRouter 를 사용한다. 
// 개발환경에서는 괜찮지만 배포된 상태에서 클라이언트가 새로고침되면 index부터 로딩되는 문제점이 있다. 
// 그래서 보통 # 해시 라우터를 사용한다. 
const router2 = createBrowserRouter([{
    path:"/", // 이 경로일때 
    element:<App/>, // 이 component 를 활성화시킨다 
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역활을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시되지 않게  
            element: route.element //어떤 컴포넌트를 활성화 할것인지 
        }
    })
}]);

export default router;
