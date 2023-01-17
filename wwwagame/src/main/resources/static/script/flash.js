// 1. axios 전역 설정
axios.defaults.withCredentials = true; // withCredentials 전역 설정

// 2. axiod 옵션 객체로 넣기
axios.post(`${EndPoint.APIServer}/myauth/login/`, {
    profile: {username: username, password: password}
}, {
    withCredentials: true // 쿠키 cors 통신 설정
})
    .then(response => {
        console.log(response);
        console.log(response.data);
    })

const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*', // 출처 허용 옵션
    credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));