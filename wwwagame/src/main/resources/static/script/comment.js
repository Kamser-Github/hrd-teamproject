const gameName = $("#gameName").val();
const userNo = $("#no").val();
// const userNo = 111138;
const id = $("#idName").val();
// const id = "user2";
let nick = $("#nick").val();
let password = $("#password").val();
let comment = $("#comment").val();

$(window).on("keypress", e => {
    // console.log(e.key);
    if (e.key === "Enter") {
        commentReg();
    }
});

$(document).ready(function () {
    commentRenew();

    $('#target_btn').attr('disabled', 'disabled');
    $('.checkInput').on('keyup', function () {
        if ($("#nick").val() !== '' && $("#password").val() !== '' && $("#comment").val() !== '') {
            $('#target_btn').removeAttr("disabled");
            nick = $("#nick").val();
            password = $("#password").val();
            comment = $("#comment").val();
        } else {
            $('#target_btn').attr('disabled', 'disabled');
        }
    });
})

// 댓글 등록
function commentReg() {
    const commentData = {
        "id": id,
        "nick": nick,
        "password": password,
        "game": gameName,
        "content": comment,
        "like": 0
    }
    let commentResult = forbiddenCheck(comment,"#comment");
    if(commentResult){
        return;
    }
    $.ajax({
        type: 'post',
        url: '/comment/reg',
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(commentData),
        success: function (result) {
            commentRenew();
        },
        error: function (request, status, error) {
            console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
        }
    })
}

// 댓글 삭제
function commentDelete(no, page) {
    $.ajax({
        type: 'post',
        url: '/comment/delete?no=' + no,
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        success: function (result) { // 결과 성공 콜백함수
            commentRenew(page);
        },
        error: function (request, status, error) { // 결과 에러 콜백함수
            console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
        }
    })
}

// 댓글 불러오기
function commentRenew(page) {
    $(".commentList").empty();
    $(".button_paging").empty();

    let pageNumber;

    if(page === undefined){
        pageNumber = 0;
    } else {
        pageNumber = page-1;
    }

    $.ajax({
        type: 'get',           // 타입 (get, post, put 등등)
        url: `/search/readCommentByGamePage?game=${gameName}&pageNumber=${pageNumber}`,
    }).done(function (response) {
        const data = response.content;
        const pageCnt = response.pageCnt;

        data.forEach( (e) =>{
            const nick1 = e.nick;
            const content1 = e.content;
            const regData = e.regDate;

            const temp = regData.split("T");

            const commentId = "commentId" + e.no;
            const commentPw = "commentPw" + e.no;
            let temp1 = "heart" + e.no;

            $('.commentList').append(
                `
                <div class="card col-lg-8 mb-1 mx-auto">
                <div class="card-body">
                <table class="comment_own w-100">
                <input type="hidden" id="${commentId}" value="${e.id}">
                <input type="hidden" id="${commentPw}" value="${e.password}">
                <thead>
                <tr class="d-flex justify-content-between">
                    <th>${nick1}</th>
                    <th>
                        <ul class="d-flex list-unstyled gap-2">
                            <li>${temp[0]} ${temp[1]}</li>
                            <li>
                                <i id="${e.no}" onclick="clickLike(${e.no}, ${pageNumber})" class="fa-solid fa-heart" id="${temp1}"></i>${e.likeCnt} 
                            <li>
                                <a href="#" onclick="clickComment(${e.no}, ${pageNumber})"><i class="fa-solid fa-trash-can"></i></a></li>
                        </ul>
                    </th>
                </tr>
                </thead>
                <tr>
                    <th scope="row" colspan="4">${content1}</th>
                </tr>
                </table>
                </div>
                </div>
            `);
            if (userNo !== "") {
                checkLikeColor(e.no);
            }

        })

        for (let i = 0; i < pageCnt; i++) {
            let num = i+1;
            $('.button_paging').append(
               `<input type="radio" class="btn-check" name="btnradio" id='page${num}' onclick="commentRenew(${num})" autocomplete="off" style="cursor: pointer">
               <label class="btn btn-outline-dark" for='page${num}'>${num}</label>`
            );

        }
    })
}

// 댓글 삭제 클릭
function clickComment(no, page) {

    const commentId = "commentId" + no;

    // if ($("#" + commentId).val() === "guest") {
    if (id === "guest") {
        const password = prompt("비밀번호를 입력하세요.");
        const commentPw = "commentPw" + no;
        if ($("#" + commentPw).val() === password) {
            commentDelete(no, page);
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    } else {
        const check = confirm("삭제하시겠습니까?");
        if (check) {
            if ($("#" + commentId).val() === id) {
                commentDelete(no, page);
            } else {
                alert("삭제 권한이 없는 댓글입니다.");
            }
        }
    }
}

// 좋아요 클릭
function clickLike(no, page) {

    if (checkLoginComment()) {
        checkLike(no, page);
    }

}

// 좋아요 1증가
function likeUp(no, page) {

    const likeData = {
        "commentNo": no,
        "userNo": userNo
    }
    $.ajax({
        type: 'post',
        url: '/like/regLike',
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(likeData),
        success: function (result) {
            $.ajax({
                type: 'post',
                url: '/comment/likeUp?no=' + no,
                accept: "application/json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    console.log("좋아요 성공");
                    commentRenew(page);
                },
                error: function (request, status, error) {
                    console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
                }
            })
        },
        error: function (request, status, error) {
            console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
        }
    })
}

// 좋아요 1감소
function likeDown(no, page) {

    $.ajax({
        type: 'delete',
        url: "/like/delLike?commentNo=" + no + "&userNo=" + userNo,
        accept: "application/json",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            // console.log("취소 성공");
            $.ajax({
                type: 'post',
                url: '/comment/likeDown?no=' + no,
                accept: "application/json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    // console.log("좋아요 성공");
                    commentRenew(page);
                },
                error: function (request, status, error) {
                    console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
                }
            })
        },
        error: function (request, status, error) {
            console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
        }
    })
}

// 좋아요 보냈는지 아닌지 확인 -> 값에 따라 좋아요 증가 감소
function checkLike(no, page) {
    let temp;
    $.ajax({
        type: 'get',
        url: "/like/LikeByCommentId?commentNo=" + no + "&userNo=" + userNo,
        success: function (result) {
            temp = result;
        },
        error: function (request, status, error) {
            console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
        }
    }).always(function () {
        if (temp) {
            likeDown(no, page);
        } else {
            likeUp(no, page);
        }
    })
}

// 좋아요 보냈는지 아닌지 확인
function checkLikeColor(no) {
    let temp;
    $.ajax({
        type: 'get',
        url: "/like/LikeByCommentId?commentNo=" + no + "&userNo=" + userNo,
        success: function (result) {
            temp = result;
        },
        error: function (request, status, error) {
            console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
        }
    }).always(function () {
        if (temp) {
            $("#" + no).attr('style', 'color: red');
        }
    })
}

// 로그인 했는지 체크
function checkLoginComment() {
    if (id === "guest") {
        Swal.fire({
            title: '로그인후 사용이 가능합니다.',
            showCancelButton: true,
            confirmButtonText: '로그인',
            cancelButtonText: "취소"
        }).then((result) => {
            console.log(result);
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                (async () => {
                    const {value: formValues} = await Swal.fire({
                        title: 'login',
                        html:
                            '                    <div class="ininfo">\n' +
                            '                        <h3 class="info_title">아이디</h3>\n' +
                            '                        <span class="info_box">\n' +
                            '                            <input type="text" id="id2" maxlength="20">\n' +
                            '                        </span>\n' +
                            '                    </div>' +
                            ' <div class="ininfo">\n' +
                            '                        <h3 class="info_title">비밀번호</h3>\n' +
                            '                        <span class="info_box">\n' +
                            '                            <input class="info_box_input" type="password" id="pw2" maxlength="30">\n' +
                            '                        </span>\n' +
                            '                    </div>',
                        focusConfirm: false,
                        preConfirm: () => {
                            return [
                                $("#id2").val(),
                                $("#pw2").val()
                            ]
                        }
                    })
                    login(2);
                })();
            } else if (result.isDismissed) {
                Swal.fire('취소!', '', 'error')
            }
        })
        return false;
    } else {
        return true;
    }
}

// 내 댓글 불러오기
function myCommentRenew(page) {
    $(".comment_body").empty();
    $(".button_paging").empty();
    const myId = $("#log_id").val();

    let pageNumber;

    if(page === undefined){
        pageNumber = 0;
    } else {
        pageNumber = page-1;
    }

    $.ajax({
        type: 'get',           // 타입 (get, post, put 등등)
        url: `/search/commentUserId?user=${myId}&pageNumber=${pageNumber}`,
    }).done(function (response) {
        console.log(response);
        const data = response.content;
        const pageCnt = response.pageCnt;

        data.forEach( (e) =>{
            const content1 = e.content;
            const regData = e.regDate;

            const temp = regData.split("T");

            const commentId = "commentId" + e.no;
            const commentPw = "commentPw" + e.no;
            let temp1 = "heart" + e.no;

            $('.comment_body').append(
                `<tr>
                    <input type="hidden" id="${commentId}" value="${e.id}">
                    <input type="hidden" id="${commentPw}" value="${e.password}">
                    <td >${e.game}  </td> 
                    <td >${content1}  </td> 
                    <td>${temp[0]} ${temp[1]}</td> 
                    <td><i class="fa-solid fa-heart" id="${temp1}"></i> ${e.likeCnt} </td>
                    <td><a href="#" onclick="myCommentDelete(${e.no}, ${pageNumber})">삭제</a> </td>
                </tr>`
            );
        })
        for (let i = 0; i < pageCnt; i++) {
            let num = i+1;
            $('.button_paging').append(
                `<a id='page${num}' onclick="myCommentRenew(${num})" >${num}</a>`
            );

        }
    })
}

// 내 댓글 삭제
function myCommentDelete(no, page) {
    const check = confirm("삭제하시겠습니까?");
    if (check) {

        $.ajax({
            type: 'post',
            url: '/comment/delete?no=' + no,
            accept: "application/json",
            contentType: "application/json; charset=utf-8",
            success: function (result) { // 결과 성공 콜백함수
                myCommentRenew(page);
            },
            error: function (request, status, error) { // 결과 에러 콜백함수
                console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
            }
        })
    }
}
