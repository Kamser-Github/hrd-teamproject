function login(num) {
let id;
let pw;
    if (num === 1) {
        id = $("#id").val();
        pw = $("#pw").val();
    } else{
        id = $("#id2").val();
        pw = $("#pw2").val();
    }


    $.ajax({
        type: 'post',
        url: '/login/user?id=' + id + '&password=' + pw,
        success: function (result) { // 결과 성공 콜백함수
            if(result===true){
                swal("로그인 성공", "즐거운 게임이 되시길 바랍니다.", "success");
                setTimeout(function(){
                    location.reload();
                },1500);
                return;
            }
            swal("로그인 실패!", "아이디 혹은 비밀번호가 일치하지 않습니다.", "error");
        },
        error: function (request) { // 결과 에러 콜백함수
            console.log(request);
        }
    });
}

function logout(){
    $.ajax({
        type: 'post',           // 타입 (get, post, put 등등)
        url: '/logout/user',           // 요청할 서버url
        success: function (result) { // 결과 성공 콜백함수
            location.reload();
        },
        error: function (request) { // 결과 에러 콜백함수
            console.log(request);
        }
    });
}
$("#id").blur(function(){
    let result = nullCheck();
    if(result){
        $("#login_button").attr("disabled",false);
        return;
    }
    $("#login_button").attr("disabled",true);
})
$("#pw").blur(function(){
    let result = nullCheck();
    if(result){
        $("#login_button").attr("disabled",false);
        return;
    }
    $("#login_button").attr("disabled",true);
})
let nullCheck = function(){
    let flag = true;
    $(".login_form").each((i,item)=>{
        if(item.value===""){
            flag = false;
        }
    })
    return flag;
}
$("#login_button").on('click',function(){
    login();
});
