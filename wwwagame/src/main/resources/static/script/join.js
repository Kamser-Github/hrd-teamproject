// 오류 메세지 배열
let check_List = [];
const IDNUM = 0;
const PW1NUM = 1;
const PW2NUM = 2;
const NICKNUM = 3;
const NAMENUM = 4;
const PHONENUM = 5;

//아아디 중복검사
$('#join_id').keyup(() => {
    let test = $('#join_id').val();
    findID(test);
});

// 아이디 비속어검사
$('#join_id').on('blur', function () {
    let checkWords = $('#join_id').val();
    let removeResult = removeSpecial(checkWords);
    if (removeResult.length === 0) {
        return;
    }
    let checkEng = findByForbiddenEng(removeResult);
    if (checkEng) {
        $('#join_id').val('');
        swal("금칙어는 사용이 불가합니다", "다시 입력해주세요", "error");
    }
})

function findID(text) {
    $.ajax({
        method: "GET",
        url: '/user/dupl-id',
        data: {
            id: `${text}`
        }
    }).done(e => {
        if (e === true) {
            $('.errorID').text('이미 존재하는 아이디 입니다.');
            $('.idicon').attr('style', '');
            check_List[IDNUM] = false;
            return;
        }
        $('.errorID').text("");
        $('.idicon').attr('style', 'color:blue');
        check_List[IDNUM] = true;
    })
}

//아이디 정규식
$('#join_id').keyup(() => {
    $('#join_id').val($('#join_id').val().replace(/[^A-Za-z0-9_\-.]/gi, ''));
}).on('blur', () => {
    if (!userIdCheck.test($('#join_id').val())) {
        $('.errorID').text("영문,숫자포함 5~20자로 가능합니다.")
        $('.idicon').attr('style', '');
        check_List[IDNUM] = false;
        return;
    }
    $('.errorID').text("");
    check_List[IDNUM] = true;
});

//비밀번호
$('#join_pw1').keyup(() => {
    let pw = $('#join_pw1').val();
    if (!passwdCheck.test(pw)) {
        $('.errorPw1').text("특수문자,영문 대소문자,숫자를 섞어 8~30자내외로 작성해주세요")
        $('#join_pw2').attr('placeholder', '비밀번호를 다시 설정해주세요.');
        $('.pwicon1').attr('style', '');
        check_List[PW1NUM] = false;
        return;
    }
    $('.errorPw1').text("");
    check_List[PW1NUM] = true;
    $('.pwicon')
}).on('blur', () => {
    let pw = $('#join_pw1').val();
    if (!passwdCheck.test(pw)) {
        $('#join_pw2').attr('readonly', true);
        return;
    }
    $('#join_pw2').attr('readonly', false);
    $('.pwicon1').attr('style', 'color:blue');
});

//비밀번호 확인
$('#join_pw2').keyup(() => {
    let pw2 = $('#join_pw2').val();
    let pw1 = $('#join_pw1').val();
    if (pw1.leng != 0 && pw2 !== pw1) {
        $('.errorPw2').text("비밀번호가 일치하지 않습니다.");
        $('.pwicon2').attr('style', '');
        check_List[PW2NUM] = false;
        return;
    }
    $('.errorPw2').text("");
    $('.pwicon2').attr('style', 'color:blue');
    check_List[PW2NUM] = true;
});

//이름확인
$('#join_name').keyup(() => {
    let leng = $('#join_name').val().length;
    if (leng < 2 || leng > 30) {
        $('.errorName').text("2~30글자 내외로 입력해주세요.");
        $('.nic_name').attr('style', '');
        check_List[NAMENUM] = false;
        return;
    }
    $('.errorName').text("");
    $('.nic_name').attr('style', 'color:blue');
    check_List[NAMENUM] = true;
});

//전화번호 확인
$("#join_phone").keyup(() => {
    $("#join_phone").val($("#join_phone").val().replace(/[^0-9-]/gi, ''));
})
//전화번호 유효성검사
$("#join_phone").blur(() => {
    let phone = $("#join_phone").val();
    if (!phoneCheck.test(phone)) {
        $(".errorNumber").text("전화번호를 다시 확인해주세요.");
        $('.ch_phone').attr('style', '');
        check_List[PHONENUM] = false;
        return;
    }
    $(".errorNumber").text("");
    $.ajax({
        method: 'GET',
        url: '/user/dupl-phone',
        data: {
            phone: `${phone}`
        }
    }).done(result => {
        if (result === true) {
            $('.errorNumber').text('이미 존재하는 전화번호입니다.');
            $('.ch_phone').attr('style', '');
            check_List[PHONENUM] = false;
            return;
        }
        $('.errorNumber').text("");
        $('.ch_phone').attr('style', 'color:blue');
        check_List[PHONENUM] = true;
    })
})
//중복닉네임
$('#join_nick').keyup(() => {
    let leng = $('#join_nick').val().length;
    if (leng < 2 || leng > 10) {
        $('.errorNick').text("2~10글자 내외로 입력해주세요.");
        $('.nic_nick').attr('style', '');
        check_List[NICKNUM] = false;
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
                $(".errorNick").text("중복된 닉네임 입니다.");
                $('.nic_nick').attr('style', '');
                check_List[NICKNUM] = false;
                return;
            }
        });
    $(".errorNick").text("");
    $('.nic_nick').attr('style', 'color : blue');
    check_List[NICKNUM] = true;
})

//금칙어
$('#join_nick').on('blur', function () {
    let checkWords = $('#join_nick').val();
    let removeResult = removeSpecial(checkWords);
    if (removeResult.length === 0) {
        return;
    }
    let checkEng = findByForbiddenEng(removeResult);
    let checkKor = findByForbiddenKor(removeResult);

    if (checkKor || checkEng) {
        $('#join_nick').val('');
        swal("금칙어는 사용이 불가합니다", "다시 입력해주세요", "error");
    }
});


//전체 유효성 체크
$('.join_submit').click(() => {
    if (checkNull() && checkError()) {
        swal("Good job!", "You clicked the button!", "success");
        $('form.wrap_outer').submit();
    }
});

function checkNull() {
    const check_List = $('.requiredValue');
    const CHECK_POINTS = $('.requiredValue').length;
    let cnt = 0;
    for (let i = 0; i < CHECK_POINTS; i++) {
        if (check_List[i].value === '') {
            check_List[i].focus();
            swal("빈 값", "해당 사항을 다시 확인해주세요", "error");
            cnt++;
            return false;
        }
    }
    if (cnt === 0) {
        return true;
    }
}

function checkError() {
    let cnt = 0;
    check_List.forEach(e => {
        if (e == false) {
            swal("오류", "오류 메세지를 확인해주세요", "error");
            cnt++;
            return false;
        }
    })
    if (cnt === 0) {
        return true;
    }
}

let userIdCheck = RegExp(/^[A-Za-z0-9_\-]{5,50}$/);
let passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%^*@()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,30}$/);
let phoneCheck = RegExp(/^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/);