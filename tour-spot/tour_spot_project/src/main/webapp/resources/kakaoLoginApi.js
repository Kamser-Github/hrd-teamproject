
// const REDIRECT_URI = 'http://localhost:8080/tour_spot_project/login';

// //<!--9b047ab7a3479c0c116c4327b5374bcc-->
// function login(){
//     Kakao.init('9b047ab7a3479c0c116c4327b5374bcc');
//     Kakao.Auth.authorize({
//         redirectUri: `${REDIRECT_URI}`,
//         prompts: 'login',
//     });
// }

const body = document.body;
const kakaoLogin = body.querySelector('.kakaoLogin');
const REST_API_KEY = 'f17145af917afa076cf92e7f58096053';
const REDIRECT_URI = 'http://localhost:8083/tour_spot_project/KakaoControllarAction'; // KakaoLogin 

kakaoLogin.addEventListener('click',function(){
	location.href=`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=f17145af917afa076cf92e7f58096053&redirect_uri=http://localhost:8083/tour_spot_project/KakaoControllarAction&prompt=login`;
});
