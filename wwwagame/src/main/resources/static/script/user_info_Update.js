let bj_point = $("#log_bj_point").val();
let br_point = $("#log_br_point").val();
let updatePw = false;

// 오류메세지
let flagId = true;
let flagPw0 = true;
let flagPw1 = true;
let flagPw2 = true;
let flagNick = true;
let flagName = true;
let flagPhone = true;


//비밀번호
$('#join_pw1').keyup(() => {
    let pw = $('#join_pw1').val();
    console.log("pw : " + pw);
    let now_pw = $('#update_pw').val();
    if (!passwdCheck.test(pw)) {
        $('.errorPw1').text("특수문자,영문 대소문자,숫자를 섞어 8~30자내외로 작성해주세요")
        $('#join_pw2').attr('placeholder', '비밀번호를 다시 설정해주세요.');
        $('.pwicon1').attr('style', '');
        flagPw1 = false;
        return;
    }
    if (pw === now_pw) {
        $('.error_now').text("현재 비밀번호와 변경비밀번호가 동일합니다.")
        $('#join_pw1').attr('placeholder', '비밀번호를 다시 설정해주세요.');
        $('.pwicon1').attr('style', '');
        flagPw1 = false;
        return;
    }
    $('.errorPw1').text("");
    $('.pwicon');
    flagPw1 = true;
}).on('blur', () => {
    let pw1 = $('#join_pw1').val();
    let now_pw = $('#update_pw').val();
    if (!passwdCheck.test(pw1)) {
        $('#join_pw2').attr('readonly', true);
        return;
    }
    if (pw1 === now_pw) {
        $('#join_pw1').attr('readonly', true);
        $('#join_pw1').val('');
        return;
    }
    $('#join_pw2').attr('readonly', false);
    $('.pwicon1').attr('style', 'color:blue');
});

//비밀번호 확인
$('#join_pw2').keyup(() => {
    let pw2 = $('#join_pw2').val();
    let pw1 = $('#join_pw1').val();
    if (pw1.leng != 0 && pw2 !== pw1 || pw2.length === 0) {
        if ($("#join_pw1").val() != '') {
            $('.errorPw2').text("비밀번호가 일치하지 않습니다.");
            $('.pwicon2').attr('style', '');
            flagPw2 = false;
            return;
        } else {
            $('.errorPw1').text('');
        }

    } else {
        $('.errorPw2').text("");
        $('.pwicon2').attr('style', 'color:blue');
        flagPw2 = true;
        updatePw = true;

    }
}).on('blur', function () {
    let pw = $('#join_pw1').val();
    if (pw.length === 0) {
        if ($("#join_pw1").val() != '') {
            $('.errorPw2').text("비밀번호가 일치하지 않습니다.");
            $('.pwicon2').attr('style', '');
            flagPw2 = false;
            return;
        } else {
            $('.errorPw1').text('');
        }
    }
})

//이름확인
$('#join_name').keyup(() => {
    let leng = $('#join_name').val().length;
    if (leng < 2 || leng > 30) {
        $('.errorName').text("2~30글자 내외로 입력해주세요.");
        $('.nic_name').attr('style', '');
        flagName = false;
        return;
    }
    $('.errorName').text("");
    $('.nic_name').attr('style', 'color:blue');
    flagName = true;
});
//닉네임확인
$('#join_nick').keyup(() => {
    let leng = $('#join_nick').val().length;
    if (leng < 2 || leng > 10) {
        $('.errorNick').text("2~10글자 내외로 입력해주세요.");
        $('.nic_nick').attr('style', '');
        flagNick = false;
        return;
    } else {
        //중복닉네임
        let leng = $('#join_nick').val().length;
        if (leng < 2 || leng > 10) {
            $('.errorNick').text("2~10글자 내외로 입력해주세요.");
            $('.nic_nick').attr('style', '');
            flagNick = false;
            return;
        }
        let typing_nick = $('#join_nick').val();
        let url = '/find/user';
        let nick = {
            nick: typing_nick
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(nick)
        }).then(response => response.json())
            .then(result => {
                if (result === true) {
                    if (typing_nick != $("#log_nick").val()) {
                        $(".errorNick").text("중복된 닉네임 입니다.");
                        $('.nic_nick').attr('style', '');
                        flagNick = false;
                        return;
                    }
                }
            });
        $(".errorNick").text("");
        $('.nic_nick').attr('style', 'color : blue');
        flagNick = true;

    }
});
$('#join_nick').on('blur', function () {
    let nick = $('#join_nick').val();
    if (forbiddenCheck(nick, "#join_nick")) {
        return;
    }
})

//전화번호 확인
$("#join_phone").keyup(() => {
    $("#join_phone").val($("#join_phone").val().replace(/[^0-9-]/gi, ''));
})
//전화번호 유효성검사
$("#join_phone").blur(() => {
    console.log("들어오나요?");
    console.log("길이 : " + $("#join_phone").val().length);
    console.log("3번째 : " + $("#join_phone").val().charAt(3));
    console.log("8번째 : " + $("#join_phone").val().charAt(8));
    if ($("#join_phone").val().length != 13) {
        $('.errorNumber').text("전화번호를 확인하세요");
        flagPhone = false;
        return;
    } else if ($("#join_phone").val().charAt(3) != '-' || $("#join_phone").val().charAt(8) != '-') {
        $('.errorNumber').text("전화번호를 확인하세요");
        flagPhone = false;
        return;
    } else {
        $('.errorNumber').text("");
        $('.ch_phone').attr('style', 'color:blue');
        flagPhone = true;
    }
})

//전체 유효성 체크
$('.join_submit').click(() => {
    let pw;
    if (updatePw) {   // 업데이트 함
        pw = $("#join_pw1").val();  // 변경할 비번
    } else {          // 기존 비번 그대로
        pw = $('#update_pw').val(); // 기존 비번
    }
    if (checkError() && checkNull()) {
        $.ajax({
            method: "POST",
            url: "/v1/search/user/id",
            data: {
                id: $('#join_id').val(),
                password: pw,
            }
        }).done(result => {
            if (result === '') {
                Swal("실패!", "현재 비밀번호가 일치 하지 않습니다.", "error");
                return;
            }
            flagId = true;
            flagPw0 = true;
            fetch('/v1/update/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    no: $('.update_no').val(),
                    id: $('#join_id').val(),
                    password: pw,
                    nick: $('#join_nick').val(),
                    name: $('#join_name').val(),
                    phone: $('#join_phone').val(),
                    bjPoint: bj_point,
                    brPoint: br_point
                })
            })
                .then(response => response.json())
                .then((result) => {
                    if (result) {

                        Swal.fire('수정되었습니다.')
                        setTimeout(function () {
                            location.href = '/content';
                        }, 2000);
                        return;
                    }
                    Swal.fire('정보가 일치하지 않습니다.')
                });
        });
    }
});

function checkNull() {
    const check_List = $('.requiredValue');
    const CHECK_POINTS = $('.requiredValue').length;
    let cnt = 0;
    for (let i = 0; i < CHECK_POINTS; i++) {
        if (check_List[i].value === '' && i != 2 && i != 3) {
            check_List[i].focus();
            alert('빈 값 : 해당 사항을 다시 확인해주세요');
            return false;
        }
    }
    return true;
}

function checkError() {
    if (flagId && flagPw0 && flagPw1 && flagPw2 && flagNick && flagName && flagPhone) {
        return true;
    } else if (flagId && flagPw0 && updatePw && flagNick && flagName && flagPhone) {
        return true;
    } else if (flagId && flagPw0 && flagNick && flagName && flagPhone) {
        return true;
    } else {
        alert('오류 : 해당 사항을 다시 확인해주세요');
    }
    return false;
}

function onArgee() {
    console.log("접속완료 ");
    $(".content-middle-start").html(`${choice_couse}`);
    $(".content-middle-end").html(`${choice_login}`);
    $("#agree_ok").addClass('d-none');
    $("#delete-user").removeClass('d-none');
}

const choice_couse = `
    <select class="form-select form-select-lg mb-3 delete-couse" aria-label=".form-select-lg example">
    <option selected disabled>탈퇴 사유를 작성해주세요</option>
    <option value="delete_cause_1 cause_memory">기록 삭제 목적</option>
    <option value="delete_cause_1 cause_uncomfortable">이용이 불편하고 장애가 많아서</option>
    <option value="delete_cause_1 cause_better">다른 사이트가 더 좋아서</option>
    <option value="delete_cause_1 cause_come">사용빈도가 낮아서</option>
    <option value="delete_cause_1 cause_contents">콘텐츠 불만</option>
    <option value="delete_cause_1 cause_other">기타 불만</option>
    </select>`;
const choice_login = `
<div class="form-floating mb-3 delete-login-form">
  <input type="email" class="form-control delete-login" id="floatingInput" placeholder="아이디를 입력해주세요" disabled>
  <label for="floatingInput">아이디</label>
</div>
<div class="form-floating">
  <input type="password" class="form-control delete-login" id="floatingPassword" placeholder="패스워드를 입력해주세요" disabled>
  <label for="floatingPassword">패스워드</label>
</div><br>`;

$('#agree_ok').on('click', onArgee);
$('#delete-user').on('click', function () {
    fetch("/v1/delete/user", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: $('#floatingInput').val(),
            password: $('#floatingPassword').val(),
            no: $('#user_no').val()
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data === true) {
                Swal.fire('탈퇴 되었습니다.')
                setTimeout(function () {
                    $.ajax({
                        method: "POST",
                        url: "/logout/user"
                    })
                    location.href = '/index';
                }, 2000);
                return;
            }
            Swal.fire('정보가 일치하지 않습니다.')
            return;
        });
})
$(".content-middle-start").change(function () {
    $(".delete-login").attr("disabled", false);
})
let passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%^*@()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,30}$/);