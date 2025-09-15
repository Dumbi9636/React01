import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// SPA 를 구현하기 위한 RouterProvider 를 import
// Single Page Application 
// 원래는 AppComponent 하나만 import 해서 App2..3..4.. 를 만들었는데, 
// RouterProvide 를 렌더링 한다. Routerprovider 에는 {router} 폴더를 import 해서 제공을 한다. 
// index.jsx 에서 연결된 router 속성을 이용해서 path 를 지정한다.
import { RouterProvider } from 'react-router-dom'
// routing 정보를 담고 있는 router 폴더 import
// 파일명이 index 이기 때문에 폴더명만 import 해도 되지만, 파일명이 index가 아니게 된다면 router/파일명 으로 파일명까지 작성해줘야한다 
import router from './router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router} />
  </StrictMode>,
)
