let dec = ["1a", "1b", "1c", "1d", "2a", "2b", "2c", "2d", "3a", "3b", "3c", "3d", "4a", "4b", "4c", "4d", "5a", "5b", "5c", "5d",
    "6a", "6b", "6c", "6d", "7a", "7b", "7c", "7d", "8a", "8b", "8c", "8d", "9a", "9b", "9c", "9d", "0a", "0b", "0c", "0d",
    "ja", "jb", "jc", "jd", "qa", "qb", "qc", "qd", "ka", "kb", "kc", "kd"];

let dec_check = [];
let cards = [];
let d_cards = [];
let d_sum = [];
let p_cards = [];
let p_sum = [];

shuffle();

// 임시 코인
const log = $("#log").val();
let user_coin;

if(log !== null && log !== "" && log !=='null'){
    $.ajax({
        type: 'get',
        url: "/v1/search/user",
        data: {"no": log},
        success: function (result) { // 결과 성공 콜백함수
            user_coin = result["bj_point"];
            $(".show_user_coin").html(user_coin);
            $(".user_coin").attr('value', user_coin);
        },
        error: function (request, status, error) { // 결과 에러 콜백함수
            console.log(error)
        }
    })
}else{
    user_coin = 1000;
    $(".show_user_coin").html(user_coin);
    $(".user_coin").attr('value', user_coin);
}


// 게임 -> 데이터 베이스
function setPoint(user_coin) {

    if (log !== null && log !== "" && log !== 'null') {
        const bjData = {
            "no": log,
            "bjPoint": user_coin
        }
        $.ajax({
            type: 'post',           // 타입 (get, post, put 등등)
            url: '/v1/update/userBjPoint',           // 요청할 서버url
            accept: "application/json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(bjData),
            success: function (result) { // 결과 성공 콜백함수
                user_coin = result;
                updateUserPoints();
            },
            error: function (request, status, error) { // 결과 에러 콜백함수
                console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
            }
        })
    }
}

function updateUserPoints(){
    let settings = {
        "url": "/v1/update/userPoints",
        "method": "POST",
        "data": {
            "no": log,
            "bjPoint": user_coin,
            "brPoint": 0,
            "what": 1,
        },
    };

    $.ajax(settings).done(function (response) {
    });
}

let pWin = 0;   // 0 fail 1 win 2 동점
let endP = false;
let bustP = false;
let bustD = false;
let endD = false;
let resultP = 0;
let resultD = 0;
let isCal = false;
let p_blackJack = false;
let d_blackJack = false;
let didDealerSecondCardOpen = false;
let isDouble = false;
const PLAYER = 1;
const DEALER = 2;
const PD = 3;
let turn = 0;
let order = 0;  // cards의 순서


// -------------------- 함수 맞음 ----------------------------
function dealing() {
    let minus_coin = $(".coin").val();
    user_coin -= minus_coin;
    setPoint(user_coin);
    $(".show_user_coin").html(user_coin);
    $(".user_coin").attr("value", user_coin);

    p_blackJack = false;
    d_blackJack = false;

    bustP = false;
    bustD = false;
    didDealerSecondCardOpen = false;

    // 카드 배분 전 카드더미 흔들리는 애니메이션 & 셔플
    card_vibe();

    // 카드 분배 함수
    turn = 0;   // 회차
    order = card_handling(order);
    setTimeout(show_card, 1000, turn, PLAYER);

    setTimeout(show_card, 1500, turn, DEALER);
    turn++;

    order = card_handling(order);
    setTimeout(show_card, 2000, turn, PLAYER);
    setTimeout(show_card, 2500, turn, DEALER);


    setTimeout(sum_print, 3000, change_num(p_cards[0]), PLAYER);
    setTimeout(sum_print, 3000, change_num(p_cards[1]), PLAYER);
    setTimeout(sum_print, 3000, change_num(d_cards[0]), DEALER);
    setTimeout(sum_print, 3000, change_num(d_cards[1]), DEALER);
    setTimeout(check_d_black_jack, 4000);

    // 코인 배팅 버튼 안 보이게
    $(".coin_show").html("");
    $(".coin_show").removeAttr("style");

    $(".coin_minus").html("");
    $(".coin_minus").removeAttr("onclick");
    $(".coin_minus").removeAttr("style");

    $(".coin_plus").html("");
    $(".coin_plus").removeAttr("onclick");
    $(".coin_plus").removeAttr("style");

    // 딜, 배팅 클리어 버튼 사라지게
    $("#deal").removeAttr("style");
    $("#deal").removeAttr("class");
    $("#deal").removeAttr("onclick");


    $("#betting_clear").removeAttr("style");
    $("#betting_clear").removeAttr("class");
    $("#betting_clear").removeAttr("onclick");

    // 코인 영역에 있는 betting_coin 함수도 삭제
    $(".coin_area").removeAttr("onclick");


    // 플레이어 블랙잭
    setTimeout(is_p_black_jack, 4000);
}

function is_p_black_jack() {
    if (p_sum[0] === 21 || p_sum[1] === 21) {
        p_blackJack = true;
        endP = true;
        resultP = 21;
        setTimeout(show_black_jack_msg, 1000, PLAYER);
        setTimeout(ending, 1000);
        return;
    }

    if (!p_blackJack && !d_blackJack) {
        setTimeout(show_button, 1000);
        isDouble = true;

    } else if (p_blackJack) {
        setTimeout(show_black_jack_msg, 4000, PLAYER);
        setTimeout(ending, 1000);
    }
}


function ending() {
    clear_button();
    resultD = d_sum[0] > (d_sum[1] = d_sum[1] == null ? 0 : d_sum[1]) ? d_sum[0] : d_sum[1];
    d_sum.pop();
    resultP = p_sum[0] > (p_sum[1] = p_sum[1] == null ? 0 : p_sum[1]) ? p_sum[0] : p_sum[1];
    p_sum.pop();

    pWin = 0;
    if (p_blackJack && d_blackJack) {
        pWin = 2;
    } else if (p_blackJack) {
        pWin = 1;
    } else if (d_blackJack) {
        pWin = 0;
    } else if (bustP && !bustD) {
        pWin = 0;
    } else if (!bustP && bustD) {
        pWin = 1;
    } else if (resultP > resultD) {
        pWin = 1;
    } else if (resultP < resultD) {
        pWin = 0;
    } else if (resultP === resultD) {
        pWin = 2;
    }

    // 정산 & 승자 메세지
    if (!isCal && resultP != 0 && resultD != 0) {
        winner_msg(pWin);
        setTimeout(cal_coin, 50);
    }

    d_sum = [];
    p_sum = [];
    d_cards = [];
    p_cards = [];

    if (order >= dec.length - 13) {     //  이거는 회차가 끝났을 때
        setTimeout(reset, 5000);
    } else {
        setTimeout(goingPlay, 5000);
    }
}

function winner_msg(pWin) {
    if (!p_blackJack && !d_blackJack) {
        if (pWin === 0) {         // 딜러 승리
            $(".black_jack_msg_p").attr('style', 'background-image: url(img/black_jack/d_win.png);');
            $(".fixed_coin").removeAttr('style');
            $(".fixed_coin").html("");
        } else if (pWin === 1) {   // 플레이어 승리
            $(".black_jack_msg_p").attr('style', 'background-image: url(img/black_jack/p_win.png);');
        } else if (pWin === 2) {   // TIE
            $(".black_jack_msg_p").attr('style', 'background-image: url(img/black_jack/tie.png);');

        }
    }
}

function cal_coin() {
    isCal = true;
    coin = Number(coin);

    let cash = 0;
    if (p_blackJack && !d_blackJack) {
        cash += 2.5 * coin;
    } else if (pWin === 0) {
        cash = 0;
    } else if (pWin === 1) {
        cash += 2 * coin;
    } else if (pWin === 2) {
        cash = coin;
    }

    ani_cal_coin(coin, cash, pWin);

    // ajax 코인 차감
    user_coin += cash;
    setPoint(user_coin);
    $(".show_user_coin").html(user_coin);
    $(".user_coin").attr("value", user_coin);

}

function ani_cal_coin(coin, cash, pWin) {
    let result = cash - coin;
    if (pWin === 1) {
        if (result < 500) {
            $(".get_coin").html(result);
            $(".get_coin").attr('style', 'background-image: url(img/chip1.png);');
        } else if (result >= 500 && result < 1000) {
            $(".get_coin").html(result);
            $(".get_coin").attr('style', 'background-image: url(img/chip2.png);');
        } else if (result >= 1000 && result < 5000) {
            $(".get_coin").html(result);
            $(".get_coin").attr('style', 'background-image: url(img/chip3.png);');
        } else if (cash >= 5000 && cash < 10000) {
            $(".get_coin").html(result);
            $(".get_coin").attr('style', 'background-image: url(img/chip4.png);');
        } else if (result >= 10000) {
            $(".get_coin").html(result);
            $(".get_coin").attr('style', 'background-image: url(img/chip5.png);');
        }

    }
    if (cash < 0) {
        // 삭제 처리
        $(".fixed_coin").html("");
        $(".fixed_coin").removeAttr('style');
    }


    $(".get_coin").attr('id', 'get_coin');
}

function reset() {
    // 오른쪽 상단의 카드 사라지게 했다가
    $(".opened_cards").removeAttr('style');
    // 받은 코인도 사라지개
    $(".get_coin").html("");
    $(".get_coin").removeAttr("style");
    // 셔플
    shuffle();
    // 셔플 후 시간 차 두고 다시 나타나게 함
    goingPlay();
}

function goingPlay() {
    // 사용된 카드 왼쪽으로 회수
    for (let i = 1; i <= 6; i++) {
        $(".d_card" + i + "").removeAttr('style');
        $(".p_card" + i + "").removeAttr('style');
    }
    $(".opened_cards").attr('style', 'background-image: url(../img/card/card_b.png);')

    // 기록들 삭제
    $(".d_point").html("");
    $(".d_point").removeAttr('style');
    $(".p_point").html("");
    $(".p_point").removeAttr('style');
    $(".get_coin").html("");
    $(".get_coin").removeAttr("style");

    // 블랙잭 메세지들 삭제
    if (d_blackJack) {
        // $(".black_jack_msg_d").removeAttr('style');
        $(".dealer_board").removeAttr('style');
    }
    if (p_blackJack) {
        $(".player_board").removeAttr('style');
    }

    // 승리 메세지 삭제
    $(".black_jack_msg_p").removeAttr('style');


    // 배팅할 수 있는 코인 버튼 되돌리기
    $(".coin_minus").attr('onclick', 'minus_coin()');
    $(".coin_minus").attr('style', "background-image: url(img/black_jack/minus.png); cursor: pointer;");

    $(".coin_show").html("100");
    $(".coin_show").attr('style', 'background-image: url(img/chip1.png);');


    $(".coin").attr('value', '100');

    $(".coin_plus").attr('onclick', 'plus_coin()');
    $(".coin_plus").attr('style', "background-image: url(img/black_jack/plus.png); cursor: pointer;");

    // 배팅된 코딩 넣는 구역
    $(".coin_area").attr('onclick', 'betting_coin()');
    $(".coin_area").attr('style', 'cursor: pointer');

    $(".fixed_coin").html("배팅");
    $(".fixed_coin").removeAttr('style');

    // 정산 상태 리셋
    isCal = false;
}


// ------------------------------- 함수 --------------------------------------

function minus_coin() {
    let coin = $(".coin").val();
    if (coin == 100) {

    } else if (coin == 500) {
        $(".wrap").attr('style', 'transform: rotateY(0deg);');
        $(".coin").attr("value", "100");
        $(".coin_show").html("100");
        $(".coin_show").attr('style', 'background-image: url(../img/chip1.png)');
    } else if (coin == 1000) {
        $(".wrap").attr('style', 'transform: rotateY(360deg);');
        $(".coin_show").html("500");
        $(".coin").attr("value", "500");
        $(".coin_show").attr('style', 'background-image: url(../img/chip2.png)');
    } else if (coin == 5000) {
        $(".wrap").attr('style', 'transform: rotateY(0deg);');
        $(".coin_show").html("1000");
        $(".coin").attr("value", "1000");
        $(".coin_show").attr('style', 'background-image: url(../img/chip3.png)');
    } else if (coin == 10000) {
        $(".wrap").attr('style', 'transform: rotateY(360deg);');
        $(".coin_show").html("5000");
        $(".coin").attr("value", "5000");
        $(".coin_show").attr('style', 'background-image: url(../img/chip4.png)');
    }
}

function plus_coin() {
    let coin = $(".coin").val();
    if (coin == 100) {
        $(".wrap").attr('style', 'transform: rotateY(360deg);');
        $(".coin_show").html("500");
        $(".coin").attr('value', '500');
        $(".coin_show").attr('style', 'background-image: url(../img/chip2.png)');
    } else if (coin == 500) {
        $(".wrap").attr('style', 'transform: rotateY(0deg);');
        $(".coin_show").html("1000");
        $(".coin").attr("value", "1000");
        $(".coin_show").attr('style', 'background-image: url(../img/chip3.png)');
    } else if (coin == 1000) {
        $(".wrap").attr('style', 'transform: rotateY(360deg);');
        $(".coin_show").html("5000");
        $(".coin").attr("value", "5000");
        $(".coin_show").attr('style', 'background-image: url(../img/chip4.png)');
    } else if (coin == 5000) {
        $(".wrap").attr('style', 'transform: rotateY(0deg);');
        $(".coin_show").html("10000");
        $(".coin").attr("value", "10000");
        $(".coin_show").attr('style', 'background-image: url(../img/chip5.png)');
    }
}

let coin;
// --------------------------------------------------------------------------------------------------------------
function betting_coin() {
    coin = $(".coin").val();

    if(user_coin < coin){
        Swal.fire({
            icon: 'error',
            title: '코인이 부족합니다.',
        })
        return;
    }

    $(".fixed_coin").html("");
    $(".fixed_coin").html(coin);
    if (coin == 100) {
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip1.png); color:black;');
    } else if (coin == 500) {
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip2.png); color:black;');
    } else if (coin == 1000) {
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip3.png); color:black;');
    } else if (coin == 5000) {
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip4.png); color:black;');
    } else if (coin == 10000) {
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip5.png); color:black;');
    }



    $(".coin_area").removeAttr('cursor');
    $(".coin_area").attr('style', 'border: none');

    $("#deal").attr('style', 'background-image: url(../img/black_jack/deal.png); cursor: pointer;');
    $("#deal").attr('class', 'b1');
    $("#deal").attr('onclick', 'dealing()');

    $("#betting_clear").attr('style', 'background-image: url(../img/black_jack/betting_clear.png); cursor: pointer;');
    $("#betting_clear").attr('class', 'b2');
    $("#betting_clear").attr('onclick', 'clearing_betting()');

    // 코인 배팅 버튼 안 보이게
    $(".coin_show").html("");
    $(".coin_show").removeAttr("style");

    $(".coin_minus").html("");
    $(".coin_minus").removeAttr("onclick");
    $(".coin_minus").removeAttr("style");

    $(".coin_plus").html("");
    $(".coin_plus").removeAttr("onclick");
    $(".coin_plus").removeAttr("style");

}

// ----------------------------------------------------------------------------------------------------------------
function show_black_jack_msg(who) {
    if (who === PLAYER) {
        $(".player_board").attr('style', 'background-image: url(img/black_jack/black_jack.png);');
    } else if (who === DEALER) {
        $(".dealer_board").attr('style', 'background-image: url(img/black_jack/black_jack.png);');
    }
}

function check_d_black_jack() {
    let result = d_sum[0];
    if (d_sum.length == 2) {
        result = d_sum[1];
    }
    if (result == 21) {
        d_blackJack = true;
        setTimeout(dealer_open, 1000);
    }
}

function show_button() {
    $("#stand").attr("class", "b1");
    $("#stand").attr("onclick", "stand()");
    $("#stand").attr("style", "background-image: url(img/black_jack/stand.png); cursor: pointer");

    $("#hit").attr("class", "b2");
    $("#hit").attr("onclick", "hit()");
    $("#hit").attr("style", "background-image: url(img/black_jack/hit.png); cursor: pointer");

    $("#double").attr("class", "b4");
    $("#double").attr("onclick", "double()");
    $("#double").attr("style", "background-image: url(img/black_jack/double.png); cursor: pointer");
}

function card_vibe() {
    if ($(".card_set").hasClass("active")) {
        $(".card_set").removeClass("active");
    } else {
        $(".card_set").addClass("active");
        setTimeout(function () {
            $(".card_set").removeClass("active");
        }, 800);
    }
}

function card_handling(order) {
    // 위에서부터 한 장씩 꺼내서 player, dealer에게 배분 (1, 1)
    p_cards.push(cards[order++]);
    d_cards.push(cards[order++]);
    return order;
}

// 11 j, 12 Q, 13 K
function show_card(turn, no) {
    let num;
    let type;
    let card_num;
    if (no == 1 || no == 3) {
        card_num = p_cards[turn];

        num = change_num(card_num);
        type = change_type(card_num);

        setTimeout(show_card_by_who, 1000, turn, type, num, PLAYER);
    }
    if (no == 2 || no == 3) {
        // delay(0.5);
        card_num = d_cards[turn];

        num = change_num(card_num);
        type = change_type(card_num);

        if (turn === 1) {
            setTimeout(show_card_by_who, 1000, turn, type, num, DEALER);
        } else {
            setTimeout(show_card_by_who, 1000, turn, type, num, DEALER);
        }
    }
}

function show_card_by_who(turn, type, num, who) {
    if (who === PLAYER) {
        $(".p_card" + (turn + 1) + "").attr('style', 'background-image: url(../img/card/card_' + type + '_' + num + '.png);')
    } else if (who === DEALER) {
        if (turn === 1) {
            if ($(".d_card2").attr('style') === undefined) {
                $(".d_card" + (turn + 1) + "").attr('style', 'background-image: url(../img/card/card_b.png);');
            }

        } else {
            $(".d_card" + (turn + 1) + "").attr('style', 'background-image: url(../img/card/card_' + type + '_' + num + '.png);')
        }
    }
}

function change_num(card_num) {
    let num = card_num.charAt(0);   // 1-10, j, q, k
    if (num === '0') {
        num = 10;
    } else if (num === "j") {
        num = 11;
    } else if (num === "q") {
        num = 12;
    } else if (num === "k") {
        num = 13;
    }

    return num;
}

function change_type(card_num) {
    let type = card_num.charAt(1);  // a(♤1), b(♡2), c(♧3), d(◇4)
    if (type === 'a') {
        type = 1;
    } else if (type === 'b') {
        type = 2;
    } else if (type === 'c') {
        type = 3;
    } else if (type === 'd') {
        type = 4;
    }

    return type;
}

function num_for_sum(num) {
    if (num > 10) {
        num = 10;
    }
    return num;
}

let i = 0;

function shuffle() {
    dec_check = [];
    for (let i = 0; i < dec.length; i++) {
        dec_check[i] = 0;
    }

    let cnt = dec.length;
    while (cnt > 0) {
        let idx = Math.floor(Math.random() * 52);
        // 중복 걸러주고
        if (dec_check[idx] == 0) {
            cards.push(dec[idx]);
            dec_check[idx] = 1;
            cnt--;
        }
    }
}


function sum_print(changed_num, who) {

    let number = Number(changed_num);
    number = num_for_sum(number);
    let length;
    if (who === PLAYER) {
        length = p_sum.length;
    } else if (who === DEALER) {
        length = d_sum.length;
    }

    // A 카드 인가?
    if (number == 1) {
        if (length === 0) {
            if (who === PLAYER) {
                p_sum.push(number);
                p_sum.push(number + 10);
            } else if (who === DEALER) {
                d_sum.push(number);
                d_sum.push(number + 10);
            }

        } else if (length === 1) {   // 이전에 A 카드가 나온 적 없다   (한 갈래)
            // 갈라지기 전에 합이 10 초과이면 1로 간주해서 들어간다
            if (who === PLAYER) {
                p_sum[0] += number;
                if (p_sum[0] <= 11) {
                    // 갈라져라!
                    p_sum.push(p_sum[0] + 10);
                    length = 2;
                }
            } else if (who === DEALER) {
                d_sum[0] += number;
                if (d_sum[0] <= 11) {
                    // 갈라져라!
                    d_sum.push(d_sum[0] + 10);
                    length = 2;
                }
            }

        } else {              // 이전에 A 카드가 나온 적 있다    (두 갈래)
            if (who === PLAYER) {
                // 일단 합산
                p_sum[0] += number;         // 10   +   1
                p_sum[1] += number + 10;    // 20   +   1   +10
                // 혹시 후자의 합이 21을 넘으면
                if (p_sum[1] > 21) {
                    // number를 1로만 뒀을 때 21이 안 넘는다면 1로 처리
                    if (p_sum[1] - 10 <= 21) {
                        p_sum[1] -= 10;
                    } else {
                        // 한 갈래로 병합
                        p_sum.pop();
                        length = 1;
                    }
                }
            } else if (who === DEALER) {
                // 일단 합산
                d_sum[0] += number;
                d_sum[1] += number + 10;
                // 혹시 후자의 합이 21을 넘으면
                if (d_sum[1] > 21) {
                    // number를 1로만 뒀을 때 21이 안 넘는다면 1로 처리
                    if (d_sum[1] - 10 < 21) {
                        d_sum[1] -= 10;
                    } else {
                        // 한 갈래로 병합
                        d_sum.pop();
                        length = 1;
                    }
                }
            }
        }
    }
    // A 카드가 아니다
    else {         // 한 갤래이다
        if (length === 0) {
            if (who === PLAYER) {
                p_sum.push(number);
            } else if (who === DEALER) {
                d_sum.push(number);
            }
        } else if (length === 1 || length === 2) {
            // 한 갈래, 두 갈래 공통
            if (who === PLAYER) {
                p_sum[0] += number;
            } else if (who === DEALER) {
                d_sum[0] += number;
            }

            if (length === 2) {    //  두 갈래이다
                if (who === PLAYER) {
                    p_sum[1] += number;
                    if (p_sum[1] > 21) {
                        p_sum.pop();
                        length = 1;
                    }
                } else if (who === DEALER) {
                    d_sum[1] += number;
                    if (d_sum[1] > 21) {
                        d_sum.pop();
                        length = 1;
                    }
                }
            }
        }
    }
    setTimeout(print, 1000, who);
}

function print(who) {
    // print
    if (who === PLAYER && p_sum.length != 0) {
        $(".p_point").attr('style', 'background-image: url(../img/black_jack/score_board.png);')
        let length = p_sum.length;
        if (length === 1) {
            $(".p_point").html(p_sum[0]);
        } else if (length === 2) {
            $(".p_point").html(p_sum[0] + "/" + p_sum[1]);
        }
    } else if (who === DEALER && d_sum.length != 0) {
        length = d_sum.length;
        $(".d_point").attr('style', 'background-image: url(../img/black_jack/score_board.png);')
        if (didDealerSecondCardOpen) {
            if (length === 1) {
                $(".d_point").html(d_sum[0]);
            } else {
                $(".d_point").html(d_sum[0] + "/" + d_sum[1]);
            }
        } else {
            let dn = num_for_sum(change_num(d_cards[0]));
            if (dn == 1) {
                $(".d_point").html(dn + "/11");
            } else {
                $(".d_point").html(dn);
            }
        }
    }
}

function stand() {
    // 버튼 사라짐
    clear_button();
    // 플레이어 종료 선언
    endP = true;
    // 딜러 카드 오픈
    setTimeout(dealer_open, 1000);
    // 17미만이면 딜러 힛
    if (d_sum[0] < 17 && d_sum[1] < 17) {
        turn = 2;
        if (d_sum[0] < 17 && d_sum[1] < 17) {
            setTimeout(dealer_hit, 1000);
        }

    }
}

function hit() {
    // 더블 버튼 있다면 없애기
    if (isDouble) {
        $("#double").removeAttr("class");
        $("#double").removeAttr("onclick");
        $("#double").removeAttr("style");
    }

    // 플레이어 카드 오픈
    p_cards.push(cards[order++]);
    turn++;
    let card_num = p_cards[turn];

    show_card(turn, PLAYER);
    sum_print(change_num(card_num), PLAYER);

    setTimeout(check_stop, 1000, PLAYER);
}

function dealer_hit() {
    if (p_cards.length > 2 && d_cards.length == 2) {
        turn = 2;
    } else if (d_cards.length > 2) {
        turn = d_cards.length;
    }

    d_cards.push(cards[order++]);
    let card_num = d_cards[turn];

    setTimeout(show_card, 1000, turn, DEALER);
    setTimeout(sum_print, 1000, change_num(card_num), DEALER);
    setTimeout(check_stop, 1000, DEALER);

}

function double() {
    if(user_coin < coin){
        Swal.fire({
            icon: 'error',
            title: '코인이 부족합니다.',
        })
        return;
    }

    if (coin == 100) {
        if(user_coin - (500-coin) < 0){
            Swal.fire({
                icon: 'error',
                title: '코인이 부족합니다.',
            })
            return;
        }
        user_coin -= 500-coin;
        coin = 500;
        $(".coin").attr('value', '500');
        $(".fixed_coin").html("500");
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip2.png); color:black;');
    } else if (coin == 500) {
        if(user_coin - (1000-coin) < 0){
            Swal.fire({
                icon: 'error',
                title: '코인이 부족합니다.',
            })
            return;
        }
        user_coin -= 1000-coin;
        coin = 1000;
        $(".coin").attr('value', '1000');
        $(".fixed_coin").html("1000");
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip3.png); color:black;');
    } else if (coin == 1000) {
        if(user_coin - (5000-coin) < 0){
            Swal.fire({
                icon: 'error',
                title: '코인이 부족합니다.',
            })
            return;
        }
        user_coin -= 5000-coin;
        coin = 5000;
        $(".coin").attr('value', '5000');
        $(".fixed_coin").html("5000");
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip4.png); color:black;');
    } else if (coin == 5000) {
        if(user_coin - (10000-coin) < 0){
            Swal.fire({
                icon: 'error',
                title: '코인이 부족합니다.',
            })
            return;
        }
        user_coin -= 10000-coin;
        coin = 5000;
        $(".coin").attr('value', '10000');
        $(".fixed_coin").html("10000");
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip5.png); color:black;');
    } else if (coin == 10000) {
        if(user_coin - (20000-coin) < 0){
            Swal.fire({
                icon: 'error',
                title: '코인이 부족합니다.',
            })
            return;
        }
        user_coin -= 20000-coin;
        coin = 20000;
        $(".coin").attr('value', '20000');
        $(".fixed_coin").html("20000");
        $(".fixed_coin").attr('style', 'background-image: url(../img/chip5.png); color:black;');
    }

    // ajax로 코인 차감
    setPoint(user_coin);
    $(".show_user_coin").html(user_coin);
    $(".user_coin").attr("value", user_coin);

    coin_vibe();

    // 버튼 사라짐
    clear_button();
    isDouble = false;

    // 플레이어 카드 단 한 번 받고 끝
    hit();

    // 딜러 카드 오픈,
    dealer_open()
    // 17미만이면 딜러 힛
    while (d_sum[0] < 17 && d_sum[1] < 17) {
        turn = 2;
        dealer_hit();
    }
}

function dealer_open() {            // 플레이어악 버스트 했을 때 딜러는 ?? 카드 오픈하고 결과는 당연히 21 이하니까 겜클
    let card_num = d_cards[1];
    let num = change_num(card_num);
    let type = change_type(card_num);
    $(".d_card2").attr('style', 'background-image: url(../img/card/card_' + type + '_' + num + '.png);');

    $(".dealer_board").attr('transform', 'rotateY(180deg)');

    didDealerSecondCardOpen = true;
    let length = d_sum.length;
    print(DEALER);

    // 플레이어 버스트일 때
    if (endP && bustP) {
        endD = true;
        length = d_sum.length;
        setTimeout(ending, 1000);
        return;
    } else

        // 딜러 블랙잭
    if (d_blackJack) {
        clear_button();
        // d_blackJack = true;
        endD = true;
        resultD = 21;
        setTimeout(show_black_jack_msg, 1000, DEALER);
        if (!p_blackJack) {
            setTimeout(ending, 1500);
        }
        return;
    } else if ((d_sum[0] >= 17 || d_sum[1] >= 17) && !isCal) {
        endD = true;
        setTimeout(ending, 1000);
        return;
    }

    if (d_sum.length === 1 && d_sum[0] < 17) {
        turn++;
        dealer_hit();
    }


}


function coin_vibe() {
    if ($(".fixed_coin").hasClass("active")) {
        $(".fixed_coin").removeClass("active");
    } else {
        $(".fixed_coin").addClass("active");
        setTimeout(function () {
            $(".fixed_coin").removeClass("active");
        }, 800);
    }
}

// -------------------------------------------------------------------------------------------------
function clearing_betting() {
    $(".fixed_coin").html("배팅");
    $(".fixed_coin").removeAttr('style');
    $(".coin_area").attr('style', 'cursor: pointer; border: solid 1px whitesmoke;');

    $("#deal").removeAttr("style");
    $("#deal").removeAttr("class");

    $("#betting_clear").removeAttr("style");
    $("#betting_clear").removeAttr("class");

    // 배팅할 수 있는 코인 버튼 되돌리기
    $(".coin_minus").attr('onclick', 'minus_coin()');
    $(".coin_minus").attr('style', "background-image: url(img/black_jack/minus.png); cursor: pointer;");

    $(".coin_show").html("100");
    $(".coin_show").attr('style', 'background-image: url(img/chip1.png);');

    $(".coin").attr('value', '100');

    $(".coin_plus").attr('onclick', 'plus_coin()');
    $(".coin_plus").attr('style', "background-image: url(img/black_jack/plus.png); cursor: pointer;");
}


// -------------------------------------------------------------------------------------------------
function check_stop(who) {
    if (who === PLAYER) {
        if (p_sum[0] >= 21 || p_sum[1] >= 21) {
            endP = true;
            setTimeout(clear_button, 1000);
            if (p_sum[0] > 21) {
                bustP = true;
            }
            setTimeout(ending, 1000);
        }
    } else if (who === DEALER) {
        if (didDealerSecondCardOpen && (d_sum[0] >= 17 || d_sum[1] >= 17)) {
            if (d_sum[0] > 21 || d_sum > 21) {
                bustD = true;
            }
            endD = true;

            setTimeout(ending, 1000);
        } else {
            setTimeout(dealer_hit, 1000);
        }
    }
}

function clear_button() {
    // stand, hit, double 버튼 사라짐
    $("#stand").removeAttr("class");
    $("#stand").removeAttr("onclick");
    $("#stand").removeAttr("style");

    $("#hit").removeAttr("class");
    $("#hit").removeAttr("onclick");
    $("#hit").removeAttr("style");

    $("#double").removeAttr("class");
    $("#double").removeAttr("onclick");
    $("#double").removeAttr("style");
}

