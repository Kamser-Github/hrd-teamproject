//==================== 유저 데이터랑 연동 ==========================
// 유저 머니 (로그인 되어 있으면 유저 머니, 안되어 있으면 100만원으로 세팅
const log = document.getElementById('log').value;
let money;
let userMoney = 1000000;
// 게임 <- 데이터베이스
$(document).ready(function () {
    // console.log(log);
    if (log !== null && log !== "" && log !== 'null') {

        $.ajax({
            type: 'get',           // 타입 (get, post, put 등등)
            url: '/v1/search/user',           // 요청할 서버url
            data: {"no": log},
            success: function (result) { // 결과 성공 콜백함수
                userMoney = result["br_point"];
            },
            error: function (request, status, error) { // 결과 에러 콜백함수
                console.log(error)
            }
        })
    }
})

// 게임 -> 데이터 베이스
function setPoint() {

    if (log !== null && log !== "" && log !== 'null') {
        userMoney = money.data.values.money;
        const brData = {
            "no": log,
            "brPoint": userMoney
        }
        $.ajax({
            type: 'post',           // 타입 (get, post, put 등등)
            url: '/v1/update/userBrPoint',           // 요청할 서버url
            accept: "application/json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(brData),
            // dataType: "json",
            success: function (result) { // 결과 성공 콜백함수
                updateUserPoints();
            },
            error: function (request, status, error) { // 결과 에러 콜백함수
                console.log('code: ' + request.status + "\n" + 'message: ' + request.responseText + "\n" + 'error: ' + error);
            }
        })
    }
}

// 게임 -> 세션
function updateUserPoints() {
    let settings = {
        "url": "/v1/update/userPoints",
        "method": "POST",
        "data": {
            "no": log,
            "bjPoint": 0,
            "brPoint": userMoney,
            "what": 2,
        },
    };

    $.ajax(settings).done(function (response) {
    });
}

// 변수
let bet;
let win;
let playing = false;
let resetCardCount = 50;
let winRecord = new Array();
let winTableRecord = new Array();
let winTableRecordArr = new Array(6);
for (let i = 0; i < winTableRecordArr.length; i++) {
    winTableRecordArr[i] = new Array(15);
    for (let j = 0; j < 15; j++) {
        winTableRecordArr[i][j] = "";
    }
}

// 배팅 영역 폴리곤
let shapeP = new Phaser.Geom.Polygon([145, 192,
    404, 273,
    406, 479,
    172, 430,
    54, 289]);

let shapeT = new Phaser.Geom.Polygon([410, 273,
    516, 273,
    516, 480,
    412, 478]);

let shapeB = new Phaser.Geom.Polygon([521, 273,
    777, 190,
    867, 287,
    740, 430,
    520, 478]);

// 게임에 표시되는 스프라이트
let player;
let tie;
let banker;
let cardPocket;
let winSprite;
let winTable;
let winBoard;
let playerCircle;
let bankerCircle;
let tieCircle;
let chipLight = new Array();
let sprites = new Array();
let cardBacks = new Array();
let circles = new Array();

//게임에 표시되는 텍스트
let betMoneyPlayer;
let betMoneyTie;
let betMoneyBanker;
let cardPocketText;
let userMoneyText;
let roundText;

// 칩 위치
let chipX;
let chipY;
let betChipP = new Array();
let betChipT = new Array();
let betChipB = new Array();

// 돈
let bettingPoint = 1000; // 활성화된 칩 금액
const chipMoney = [1000, 5000, 10000, 50000, 100000];
let chipIdx = 0; // 디폴트 칩은 1000원 짜리 칩으로 세팅

// 시간
let gameTime = 0.1; // 배팅 시간 (초)
let betTime = gameTime * 1000;
let betTimeFrame = betTime / 1000 * 60;
let playingTime = 1; // 게임 진행 시간 (초)
let time = 0;
let msSec = 0;
let timer = false;
let sec = 0;
let timerGraphics;
let timerEvent;
let clockSize = 100;
let delayTime;

// 스위치
let checkGameSet = false;

// marking
// 배열만 사용해서 점찍을것
let tableX = 383;
let tableY = 0;
let dir = 0; // 0 bottom 1 right 2 up
let gap = 11;
let posY = 0;
let posX = 0;
let posLastY = posY;
let posLastX = posX;
let lastResult = "";
let maxY = 6;
let maxX= 15;


// 메소드
// 카드 생성자
function Card(shape, num, url) {
    this.shape = shape;
    this.num = num;
    this.url = url;
}

// 카드 덱 만들기
function cardSet(arr) {
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 13; j++) {
            let cardUrl = "card_" + i + "_" + j;
            arr.push(new Card(i, j, cardUrl));
        }
    }
}

// 카드 셔플
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

// 6덱 세팅
let cardDeck = new Array();

function deckSet() {
    cardDeck = new Array();
    for (let i = 0; i < 6; i++) {
        cardSet(cardDeck);
        shuffle(cardDeck);
    }
}

// 카드 출력
function printCard(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(i + " " + arr[i].shape + ", " + arr[i].num);
    }
}

let betPointPrint = true;

// 칩 생성자
function chip(idx, sprite, amount) {
    this.idx = idx;
    this.sprite = sprite;
    this.amount = amount;
}

let chips = new Array();

// 카드 나눠주기
let playerCard = new Array();
let bankerCard = new Array();

// 뱅커랑 플레이어 카드 분배
function gamePlay() {
    // 점수 초기화
    player.data.values.score = 0;
    banker.data.values.score = 0;

    // 플레이어 카드1
    playerCard.push(cardDeck[0]);
    bankerCard.push(cardDeck[1]);
    playerCard.push(cardDeck[2]);
    bankerCard.push(cardDeck[3]);

    for (let i = 0; i < 4; i++) {
        let str = cardDeck[i].shape + ", " + cardDeck[i].num;
        // console.log(str);
    }

    // 2장 점수 계산
    for (let i = 0; i < 2; i++) {
        if (playerCard[i].num < 10) {
            player.data.values.score += playerCard[i].num;
        }

        if (player.data.values.score >= 10) {
            player.data.values.score -= 10;
        }
    }

    for (let i = 0; i < 2; i++) {
        if (bankerCard[i].num < 10) {
            banker.data.values.score += bankerCard[i].num;
        }

        if (banker.data.values.score >= 10) {
            banker.data.values.score -= 10;
        }
    }

    // console.log(player.data.values.score + ":" + banker.data.values.score);

    let cardValue = 4;
    // 플레이어 3장 받는 규칙
    if (player.data.values.score < 6) {
        playerCard.push(cardDeck[cardValue]);
        cardValue = 5;
    }

    // 뱅커 3장 받는 규칙
    if (playerCard.length === 3) {
        if (banker.data.values.score < 2) {
            bankerCard.push((cardDeck[cardValue]));
        } else if (banker.data.values.score === 3 && playerCard[2].num !== 8) {
            bankerCard.push((cardDeck[cardValue]));
        } else if (banker.data.values.score === 4 && (playerCard[2].num > 1 && playerCard[2].num < 8)) {
            bankerCard.push((cardDeck[cardValue]));
        } else if (banker.data.values.score === 5 && (playerCard[2].num > 3 && playerCard[2].num < 8)) {
            bankerCard.push((cardDeck[cardValue]));
        } else if (banker.data.values.score === 6 && (playerCard[2].num > 4 && playerCard[2].num < 8)) {
            bankerCard.push((cardDeck[cardValue]));
        }
    }

    if (playerCard.length === 3) {
        if (playerCard[2].num < 10) {
            player.data.values.score += playerCard[2].num;
        }
        if (player.data.values.score >= 10) {
            player.data.values.score -= 10;
        }
    }
    if (bankerCard.length === 3) {
        if (bankerCard[2].num < 10) {
            banker.data.values.score += bankerCard[2].num;
        }
        if (banker.data.values.score >= 10) {
            banker.data.values.score -= 10;
        }
    }
    // console.log(player.data.values.score + ":" + banker.data.values.score);
    // console.log(player.getData("score") + ":" + banker.getData("score"));

    checkGameSet = true;
}

// 돈 계산
function betMoney() {
    if (win === "player") {
        money.data.values.money += player.data.values.money * 2;
    } else if (win === "banker") {
        money.data.values.money += banker.data.values.money * 1.95;
    } else {
        money.data.values.money += tie.data.values.money * 8;
    }
}

// 사용한 카드 제거
function cardRemove() {
    for (let i = 0; i < playerCard.length; i++) {
        cardDeck.shift();
    }

    for (let i = 0; i < bankerCard.length; i++) {
        cardDeck.shift();
    }
    bankerCard = new Array();
    playerCard = new Array();

    // console.log(cardDeck.length);

}

// 게임 리소스 불러오는 곳
let Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Preloader() {
            Phaser.Scene.call(this, {key: 'preloader'});
        },

    preload: function () {
        this.load.image('title', 'img/title.jpg');
        this.load.image('mainBg', 'img/bg.jpg');
        this.load.image('bet', 'img/betting_zone.png');
        this.load.image('tie', 'img/tie_zone.png');
        this.load.image('player', 'img/player_zone.png');
        this.load.image('banker', 'img/banker_zone.png');
        this.load.image('pWin', 'img/p_win.png');
        this.load.image('bWin', 'img/b_win.png');
        this.load.image('tWin', 'img/tie.png');
        this.load.image('chip1', 'img/chip1.png');
        this.load.image('chip2', 'img/chip2.png');
        this.load.image('chip3', 'img/chip3.png');
        this.load.image('chip4', 'img/chip4.png');
        this.load.image('chip5', 'img/chip5.png');
        this.load.image('light', 'img/light.png');
        this.load.image('cardPocket', 'img/card/card_pocket.png');
        this.load.image('cardBack', 'img/card/card_b.png');
        this.load.image('money', 'img/money.png');
        this.load.image('playerCircle', 'img/player_circle.png');
        this.load.image('tieCircle', 'img/tie_circle.png');
        this.load.image('bankerCircle', 'img/banker_circle.png');
        this.load.image('winBoard', 'img/win_board.png');
        this.load.image('winTable', 'img/win_table.png');
        this.load.image('scoreBg', 'img/scoreBoard.png');

        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j <= 13; j++) {
                let cardUrl = "img/card/card_" + i + "_" + j + ".png";
                let cardName = "card_" + i + "_" + j;
                this.load.image(cardName, cardUrl);
            }
        }
    },

    create: function () {
        this.scene.start('mainmenu');
    }

});

// 타이틀 화면
let MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, {key: 'mainmenu'});
            window.MENU = this;
        },

    create: function () {
        let bg = this.add.image(0, 0, 'title').setOrigin(0);


        bg.setInteractive();

        bg.once('pointerup', function () {

            this.scene.start('game');

        }, this);
    }

});

// 게임 실행
let Game = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

        function Game() {
            Phaser.Scene.call(this, {key: 'game'});
            window.GAME = this;

            this.controls;
            this.track;
            this.text;
        },

    create: function () {
        // console.log(log);
        // 이미지 불러오기
        // 배경
        this.add.image(465, 250, 'mainBg');

        // 칩 (번호, 스프라이트, 금액 텍스트)
        chipLight.push(this.add.sprite(345, 225, 'light').setScale(0.6).setAlpha(100));
        chipLight.push(this.add.sprite(405, 225, 'light').setScale(0.6).setAlpha(0));
        chipLight.push(this.add.sprite(465, 225, 'light').setScale(0.6).setAlpha(0));
        chipLight.push(this.add.sprite(525, 225, 'light').setScale(0.6).setAlpha(0));
        chipLight.push(this.add.sprite(585, 225, 'light').setScale(0.6).setAlpha(0));
        // chips.push(new chip(1, this.add.sprite(345, 230, 'chip1').setScale(0.35), this.add.text(325, 223, chipMoney[0], {fill: '#000000'})));
        chips.push(new chip(1, this.add.sprite(345, 225, 'chip1').setScale(0.35), this.add.text(325, 218, chipMoney[0], {fill: '#000000'})));
        chips.push(new chip(2, this.add.sprite(405, 230, 'chip2').setScale(0.35), this.add.text(385, 223, chipMoney[1], {fill: '#000000'})));
        chips.push(new chip(3, this.add.sprite(465, 230, 'chip3').setScale(0.35), this.add.text(445, 225, chipMoney[2], {fill: '#000000'}).setScale(0.8)));
        chips.push(new chip(4, this.add.sprite(525, 230, 'chip4').setScale(0.35), this.add.text(505, 225, chipMoney[3], {fill: '#000000'}).setScale(0.8)));
        chips.push(new chip(5, this.add.sprite(585, 230, 'chip5').setScale(0.35), this.add.text(565, 226, chipMoney[4], {fill: '#000000'}).setScale(0.7)));

        winTable = this.add.sprite(470, 37, "winTable").setScale(0.5).setDepth(0);
        winBoard = this.add.sprite(590, 2, "winBoard").setOrigin(0).setScale(0.54);

        // 배팅 영역
        player = this.add.sprite(465, 250, "player");
        tie = this.add.sprite(465, 250, "tie");
        banker = this.add.sprite(465, 250, "banker");
        betMoneyPlayer = this.add.text(250, 250, 0);
        betMoneyPlayer.rotation -= 50;
        betMoneyTie = this.add.text(445, 280, 0);
        betMoneyBanker = this.add.text(650, 260, 0);
        betMoneyBanker.rotation += 50;

        // 배팅 금액
        money = this.add.sprite(850, 480, "money").setScale(0.5).setAlpha(0);
        userMoneyText = this.add.text(788, 468, userMoney, {font: '16px Courier', fill: '#f0f0f0'});

        // 덱 세팅
        deckSet(cardDeck);
        // printCard(cardDeck);
        // printCard(cardDeck);
        // console.log(cardDeck.length + " 장 세팅 완료");

        // 카드 덱
        cardPocket = this.add.image(870, 47, 'cardPocket').setScale(0.7);
        cardPocketText = this.add.text(820, 50, 312);
        cardPocketText.rotation += 0.56;

        this.text = this.add.text(30, 150, '0', {font: '16px Courier', fill: '#00ff00'});

        // 라운드 표시
        roundText = this.add.text(600, 9, 312).setScale(0.75);


        player.setData({money: 0, score: 0});
        tie.setData({money: 0});
        banker.setData({money: 0, score: 0});
        money.setData({money: userMoney});
        cardPocket.setData({count: 312});
        winBoard.setData({round: 0, pWin: 0, bWin: 0, tWin: 0});
        winTable.setData({x: 0, y: 0,})

        player.on('changedata', function () {
            betMoneyPlayer.setText(
                player.getData("money"),
                player.getData("score")
            );
        });
        tie.on('changedata', function () {
            betMoneyTie.setText(
                tie.getData("money")
            );
        });
        banker.on('changedata', function () {
            betMoneyBanker.setText(
                banker.getData("money"),
                banker.getData("score")
            );
        });
        money.on('changedata', function () {
            userMoneyText.setText(
                money.getData("money")
            );
        });
        cardPocket.on('changedata', function () {
            cardPocketText.setText(
                cardPocket.getData("count")
            );
        });
        winBoard.on('changedata', function () {
            roundText.setText([
                "ROUND " + winBoard.getData("round"),
                winBoard.getData("pWin"),
                winBoard.getData("bWin"),
                winBoard.getData("tWin")
            ]);
        });
        winBoard.data.values.round++;

        // 시계
        timerEvent = this.time.addEvent({delay: betTime, timeScale: 1.0});
        timerGraphics = this.add.graphics({x: 308, y: 20}).setScale(0.4);

        this.clickChip();
        this.clickBet();

    },

    update: function () {
        timerGraphics.clear();
        this.drawClock(400, 300, timerEvent);

        // 돈이 0원 이하면 클릭 안되게
        if (money.data.values.money - bettingPoint < 0) {
            player.disableInteractive();
            banker.disableInteractive();
            tie.disableInteractive();
        } else {
            player.setInteractive(shapeP, Phaser.Geom.Polygon.Contains);
            banker.setInteractive(shapeP, Phaser.Geom.Polygon.Contains);
            tie.setInteractive(shapeP, Phaser.Geom.Polygon.Contains);
        }

        // 카드가 n장 이하면 카드덱 리셋
        if (cardDeck.length < resetCardCount) {
            deckSet();
            cardPocket.data.values.count = cardDeck.length;
        }

        if (!timer) {
            sec = 0;
            timer = true;
        } else {
            time++;
            msSec++;
        }
        if (msSec > 60) {
            msSec = 0;
            sec++;
        }

        this.text.setText([
            'time: ' + time,
            'msSec: ' + msSec,
            'sec: ' + sec
        ]);

        roundText.setText(
            "ROUND " + winBoard.getData("round") + "    " + winBoard.getData("pWin") + "    " + winBoard.getData("bWin") + "    " + winBoard.getData("tWin")
        );

        if (time === betTimeFrame) {
            playing = true;
        }

        if (playing) {
            timerGraphics.setVisible(false);
            betPointPrint = false;

            player.disableInteractive();
            banker.disableInteractive();
            tie.disableInteractive();

            gamePlay();

            this.tableCardSet();

            cardPocket.data.values.count -= cardBacks.length;

            this.cardMove();
            this.cardMoveThird();

            this.cardOpen();
            this.cardOpenThird();


            if (checkGameSet) {

                // console.log(userMoney);
                // console.log(time);

                this.result();

                this.winEffect(winSprite);

                cardRemove();
                playing = false;
                // console.log(playing);

                checkGameSet = false;
            }


        }
        if (sec === playingTime) {
            this.gameSet();
            this.update();
        }
    },

    // 시계 돌아가는 메소드
    drawClock: function (x, y, timer) {
        //  The frame
        timerGraphics.lineStyle(5, 0xffffff, 1);
        timerGraphics.strokeCircle(x, y, clockSize);

        let angle;
        let dest;
        let p1;
        let p2;
        let size;

        //  The overall progress hand (only if repeat > 0)
        if (timer.repeat > 0) {
            size = clockSize * 0.9;

            angle = (360 * timer.getOverallProgress()) - 90;
            dest = Phaser.Math.RotateAroundDistance({x: x, y: y}, x, y, Phaser.Math.DegToRad(angle), size);

            timerGraphics.lineStyle(7, 0xff0000, 1);

            timerGraphics.beginPath();

            timerGraphics.moveTo(x, y);

            p1 = Phaser.Math.RotateAroundDistance({x: x, y: y}, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);

            timerGraphics.lineTo(p1.x, p1.y);
            timerGraphics.lineTo(dest.x, dest.y);

            timerGraphics.moveTo(x, y);

            p2 = Phaser.Math.RotateAroundDistance({x: x, y: y}, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);

            timerGraphics.lineTo(p2.x, p2.y);
            timerGraphics.lineTo(dest.x, dest.y);

            timerGraphics.strokePath();
            timerGraphics.closePath();
        }

        //  The current iteration hand
        size = clockSize * 0.95;

        angle = (360 * timer.getProgress()) - 90;
        dest = Phaser.Math.RotateAroundDistance({x: x, y: y}, x, y, Phaser.Math.DegToRad(angle), size);

        timerGraphics.lineStyle(3, 0xffff00, 1);

        timerGraphics.beginPath();

        timerGraphics.moveTo(x, y);

        p1 = Phaser.Math.RotateAroundDistance({x: x, y: y}, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);

        timerGraphics.lineTo(p1.x, p1.y);
        timerGraphics.lineTo(dest.x, dest.y);

        timerGraphics.moveTo(x, y);

        p2 = Phaser.Math.RotateAroundDistance({x: x, y: y}, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);

        timerGraphics.lineTo(p2.x, p2.y);
        timerGraphics.lineTo(dest.x, dest.y);

        timerGraphics.strokePath();
        timerGraphics.closePath();
    },

    // 라운드 끝난 후에 초기화
    gameSet: function () {
        // 출력된 카드 안보이게 처리
        for (let i = 0; i < cardBacks.length; i++) {
            sprites[i].setVisible(false);
            cardBacks[i].setVisible(false);
        }
        winSprite.setVisible(false);

        // 칩 정산
        this.chipPlus();

        sprites = new Array();
        cardBacks = new Array();
        betChipP = new Array();
        betChipT = new Array();
        betChipB = new Array();

        // 시간 초기화
        time = 0;
        sec = 0;

        // 시계 초기화
        timerGraphics.setVisible(true);
        timerEvent = this.time.addEvent({delay: betTime, timeScale: 1.0});

        // 텍스트 증가
        this.roundPlus();
        winBoard.data.values.round++;

        // 보드판에 점 찍기
        // this.winTablePlus();
        this.winTablePlusOne();

        // 배팅 금액 초기화
        player.data.values.money = 0;
        tie.data.values.money = 0;
        banker.data.values.money = 0;

        // 배팅 영역 클릭 가능하게(돈 있을 때만)
        if (money.data.values.money > 0) {
            player.setInteractive(shapeP, Phaser.Geom.Polygon.Contains);
            tie.setInteractive(shapeT, Phaser.Geom.Polygon.Contains);
            banker.setInteractive(shapeB, Phaser.Geom.Polygon.Contains);
        }
    },

    // 뱅커 플레이어 카드 세팅
    tableCardSet: function () {
        cardBacks.push(this.add.sprite(870, 40, 'cardBack').setScale(0.2).setAlpha(0).setDepth(100));
        cardBacks.push(this.add.sprite(870, 40, 'cardBack').setScale(0.2).setAlpha(0).setDepth(100));
        cardBacks.push(this.add.sprite(870, 40, 'cardBack').setScale(0.2).setAlpha(0).setDepth(100));
        cardBacks.push(this.add.sprite(870, 40, 'cardBack').setScale(0.2).setAlpha(0).setDepth(100));

        sprites.push(this.add.sprite(260, 130, playerCard[0].url).setScale(0.6).setAlpha(0).setDepth(0));
        sprites.push(this.add.sprite(338, 130, playerCard[1].url).setScale(0.6).setAlpha(0).setDepth(0));
        sprites.push(this.add.sprite(591, 130, bankerCard[0].url).setScale(0.6).setAlpha(0).setDepth(0));
        sprites.push(this.add.sprite(669, 130, bankerCard[1].url).setScale(0.6).setAlpha(0).setDepth(0));

        if (playerCard.length === 3) {
            cardBacks.push(this.add.sprite(870, 40, 'cardBack').setScale(0.2).setAlpha(0).setDepth(100));
            sprites.push(this.add.sprite(182, 130, playerCard[2].url).setScale(0.6).setAlpha(0).setDepth(0));
        }
        if (bankerCard.length === 3) {
            cardBacks.push(this.add.sprite(870, 40, 'cardBack').setScale(0.2).setAlpha(0).setDepth(100));
            sprites.push(this.add.sprite(747, 130, playerCard[2].url).setScale(0.6).setAlpha(0).setDepth(0));
        }
    },

    // 카드 이동 애니메이션
    cardMove: function () {
        delayTime = 0;
        let xx = 260;
        let yy = 130;
        for (let i = 0; i < 4; i++) {
            this.tweens.add({
                targets: cardBacks[i],
                alpha: {value: 100, duration: 1000, ease: 'Power2', delay: delayTime},
                scaleX: {value: 0.6, duration: 1000, ease: 'Power2', delay: delayTime},
                scaleY: {value: 0.6, duration: 1000, ease: 'Power2', delay: delayTime},
                x: {value: xx, duration: 500, ease: 'Power2', delay: delayTime},
                y: {value: yy, duration: 500, ease: 'Power2', delay: delayTime}
            });
            this.tweens.add({
                targets: sprites[i],
                alpha: {value: 100, duration: 2000, ease: 'Power2', delay: delayTime + 1000}
            });
            if (i === 0 || i === 2) {
                xx += 331;
            } else if (i === 1) {
                xx -= 253;
            }
            delayTime += 300;
        }

    },

    cardMoveThird: function () {
        let target = 4;
        if (playerCard.length === 3) {
            this.tweens.add({
                targets: cardBacks[target],
                alpha: {value: 100, duration: 1000, ease: 'Power2', delay: delayTime},
                scaleX: {value: 0.6, duration: 1000, ease: 'Power2', delay: delayTime},
                scaleY: {value: 0.6, duration: 1000, ease: 'Power2', delay: delayTime},
                x: {value: 182, duration: 500, ease: 'Power2', delay: delayTime},
                y: {value: 130, duration: 500, ease: 'Power2', delay: delayTime}
            });
            delayTime += 300;
            this.tweens.add({
                targets: sprites[4],
                alpha: {value: 100, duration: 2000, ease: 'Power2', delay: delayTime + 1000}
            });
            target = 5;
        }

        if (bankerCard.length === 3) {
            this.tweens.add({
                targets: cardBacks[target],
                alpha: {value: 100, duration: 1000, ease: 'Power2', delay: delayTime},
                scaleX: {value: 0.6, duration: 1000, ease: 'Power2', delay: delayTime},
                scaleY: {value: 0.6, duration: 1000, ease: 'Power2', delay: delayTime},
                rotate: {value: 1, duration: 1000, ease: 'Power2', delay: delayTime},
                x: {value: 747, duration: 500, ease: 'Power2', delay: delayTime},
                y: {value: 130, duration: 500, ease: 'Power2', delay: delayTime}
            });
            this.tweens.add({
                targets: sprites[target],
                alpha: {value: 100, duration: 2000, ease: 'Power2', delay: delayTime + 1000}
            });
            delayTime += 300;
        }
    },

    // 카드 공개 애니메이션
    cardOpen: function () {
        delayTime += 1000;
        let xx = 310;

        for (let i = 0; i < 4; i++) {
            this.tweens.add({
                targets: cardBacks[i],
                alpha: {value: 0, duration: 1000, ease: 'Power2', delay: delayTime},
                x: {value: xx, duration: 500, ease: 'Power2', delay: delayTime},
            });
            if (i === 0 || i === 2) {
                xx += 331;
            } else {
                xx -= 253;
                delayTime += 300;
            }
            delayTime += 500;
        }

        // console.log(delayTime);
    },

    cardOpenThird: function () {
        delayTime += 300;
        let xx = 50;
        let target = 4;
        if (playerCard.length === 3) {
            this.tweens.add({
                targets: cardBacks[target],
                alpha: {value: 0, duration: 1000, ease: 'Power2', delay: delayTime},
                x: {value: 182 + xx, duration: 500, ease: 'Power2', delay: delayTime},
            });
            this.tweens.add({
                targets: sprites[target],
                rotation: {value: -1.571, duration: 300, ease: 'Power2', delay: delayTime + 500},
                x: {value: 165, duration: 300, ease: 'Power2', delay: delayTime + 500},
                y: {value: 113, duration: 300, ease: 'Power2', delay: delayTime + 500}
            });
            target = 5;
            delayTime += 300;
        }

        if (bankerCard.length === 3) {
            this.tweens.add({
                targets: cardBacks[target],
                alpha: {value: 0, duration: 1000, ease: 'Power2', delay: delayTime},
                x: {value: 747 + xx, duration: 500, ease: 'Power2', delay: delayTime},
            });
            this.tweens.add({
                targets: sprites[target],
                rotation: {value: -1.571, duration: 300, ease: 'Power2', delay: delayTime + 500},
                x: {value: 764, duration: 300, ease: 'Power2', delay: delayTime + 500},
                y: {value: 113, duration: 300, ease: 'Power2', delay: delayTime + 500}
            });

        }
    },

    // 승리 이펙트
    winEffect: function () {
        // console.log(win);
        if (win === "player") {
            winSprite = this.add.sprite(300, 120, "pWin").setScale(0.3).setAlpha(0);
        } else if (win === "banker") {
            winSprite = this.add.sprite(630, 120, "bWin").setScale(0.3).setAlpha(0);
        } else {
            winSprite = this.add.sprite(465, 120, "tWin").setScale(0.3).setAlpha(0);
        }

        delayTime += 1600;
        this.tweens.add({
            targets: winSprite,
            alpha: {value: 100, duration: 500, ease: 'Power2', delay: delayTime},
            scaleX: {value: 0.4, duration: 500, ease: 'Power2', delay: delayTime},
            scaleY: {value: 0.4, duration: 500, ease: 'Power2', delay: delayTime},
            y: {value: 100, duration: 500, ease: 'Power2', delay: delayTime}
        });
    },

    // 배팅영역 클릭 처리 함수
    clickBet: function () {
        // 클릭 처리
        player.setInteractive(shapeP, Phaser.Geom.Polygon.Contains);
        tie.setInteractive(shapeT, Phaser.Geom.Polygon.Contains);
        banker.setInteractive(shapeB, Phaser.Geom.Polygon.Contains);

        player.on('pointerup', function () {
            this.chipMove(chipIdx, 1);
            player.data.values.money += bettingPoint;
            money.data.values.money -= bettingPoint;
            setPoint();
        }, this);

        tie.on('pointerup', function (pointer) {
            this.chipMove(chipIdx, 2);
            tie.data.values.money += bettingPoint;
            money.data.values.money -= bettingPoint;
            setPoint();
        }, this);

        banker.on('pointerup', function (pointer) {
            this.chipMove(chipIdx, 3);
            banker.data.values.money += bettingPoint;
            money.data.values.money -= bettingPoint;
            setPoint();
        }, this);

    },

    // 칩 클릭 처리
    clickChip: function () {
        chips[0].sprite.setInteractive();
        chips[1].sprite.setInteractive();
        chips[2].sprite.setInteractive();
        chips[3].sprite.setInteractive();
        chips[4].sprite.setInteractive();

        chips[0].sprite.on('pointerup', function () {
            bettingPoint = chipMoney[0];
            chipIdx = 0;
            moveChip(0);
        })

        chips[1].sprite.on('pointerup', function () {
            bettingPoint = chipMoney[1];
            chipIdx = 1;
            moveChip(1);
        })

        chips[2].sprite.on('pointerup', function () {
            bettingPoint = chipMoney[2];
            chipIdx = 2;
            moveChip(2);
        })

        chips[3].sprite.on('pointerup', function () {
            bettingPoint = chipMoney[3];
            chipIdx = 3;
            moveChip(3);
        })

        chips[4].sprite.on('pointerup', function () {
            bettingPoint = chipMoney[4];
            chipIdx = 4;
            moveChip(4);
        })

        // 칩 선택 시, 올라가는 액션
        function moveChip(idx) {
            for (let i = 0; i < chips.length; i++) {
                if (i === idx) {
                    chips[i].sprite.y = 225;
                    chipLight[i].setAlpha(100);
                    moveAmount(idx);
                } else {
                    chips[i].sprite.y = 230;
                    chipLight[i].setAlpha(0);
                }
            }
        }

        function moveAmount(idx) {
            chips[0].amount.y = 223;
            chips[1].amount.y = 223;
            chips[2].amount.y = 225;
            chips[3].amount.y = 225;
            chips[4].amount.y = 226;

            chips[idx].amount.y -= 5;
        }

    },

    // 칩 배팅 애니메이션
    chipMove: function (idx, type) {

        this.chipLocation(type);

        let str = 'chip' + (chipIdx + 1);
        let temp = this.add.sprite(345, 230, str).setScale(0.25);
        if (type === 1) {
            betChipP.push(temp);
        } else if (type === 2) {
            betChipT.push(temp);
        } else {
            betChipB.push(temp);
        }

        this.tweens.add({
            targets: temp,
            scaleX: {value: 0.2, duration: 500},
            scaleY: {value: 0.2, duration: 500},
            x: {value: chipX, duration: 500, ease: 'Power2'},
            y: {value: chipY, duration: 500, ease: 'Power2'}
        });
    },

    // 칩 쌓을 위치
    chipLocation: function (type) {

        if (type === 1) {
            chipX = Math.floor(Math.random() * 200) + 150;
            chipY = Math.floor(Math.random() * 100) + 290;
        } else if (type === 2) {
            chipX = Math.floor(Math.random() * 60) + 430;
            chipY = Math.floor(Math.random() * 100) + 310;
        } else {
            chipX = Math.floor(Math.random() * 200) + 550;
            chipY = Math.floor(Math.random() * 100) + 290;
        }
    },

    // 승리 판정
    result: function () {
        // console.log(player.data.values.score + ":" + banker.data.values.score);
        // console.log(player.getData("score") + ":" + banker.getData("score"));
        if (player.data.values.score > banker.data.values.score) {
            win = "player";
            // console.log("플레이어 승리");
        } else if (player.data.values.score < banker.data.values.score) {
            win = "banker";
            // console.log("뱅커 승리");
        } else {
            win = "tie";
            // console.log("타이");
        }
        winRecord.push([winBoard.data.values.round, win])

        // console.log(winRecord[winBoard.data.values.round-1][1]);
        // console.log(win);
    },

    // 라운드 종료 후에 칩 이동
    chipPlus: function () {
        if (win === "player") {
            if (player.data.values.money > 0) {
                this.tweens.add({
                    targets: betChipP,
                    scaleX: {value: 0.2, duration: 500},
                    scaleY: {value: 0.2, duration: 500},
                    alpha: {value: 0, duration: 500},
                    x: {value: 800, duration: 500, ease: 'Power2'},
                    y: {value: 480, duration: 500, ease: 'Power2'}
                });
            }
            this.tweens.add({
                targets: betChipT,
                alpha: {value: 0, duration: 500}
            });
            this.tweens.add({
                targets: betChipB,
                alpha: {value: 0, duration: 500}
            });
        } else if (win === "tie") {
            if (tie.data.values.money > 0) {
                this.tweens.add({
                    targets: betChipT,
                    scaleX: {value: 0.2, duration: 500},
                    scaleY: {value: 0.2, duration: 500},
                    alpha: {value: 0, duration: 500},
                    x: {value: 800, duration: 500, ease: 'Power2'},
                    y: {value: 480, duration: 500, ease: 'Power2'}
                });
            }
            this.tweens.add({
                targets: betChipP,
                alpha: {value: 0, duration: 500}
            });
            this.tweens.add({
                targets: betChipB,
                alpha: {value: 0, duration: 500}
            });
        } else {
            if (banker.data.values.money > 0) {
                // console.log("ppbbbpp");
                this.tweens.add({
                    targets: betChipB,
                    scaleX: {value: 0.2, duration: 500},
                    scaleY: {value: 0.2, duration: 500},
                    alpha: {value: 0, duration: 500},
                    x: {value: 800, duration: 500, ease: 'Power2'},
                    y: {value: 480, duration: 500, ease: 'Power2'}
                });
            }
            this.tweens.add({
                targets: betChipT,
                alpha: {value: 0, duration: 500}
            });
            this.tweens.add({
                targets: betChipP,
                alpha: {value: 0, duration: 500}
            });
        }

        betMoney();
        setPoint();
    },

    // 라운드 종료 후에 텍스트 증가
    roundPlus: function () {
        if (win === "player") {
            winBoard.data.values.pWin++;
        } else if (win === "banker") {
            winBoard.data.values.bWin++;
        } else {
            winBoard.data.values.tWin++;
        }
    },

    winTablePlus: function () {
        let roundCnt = winBoard.data.values.round - 1; // 현재 라운드


    },

    winTablePlusOne: function () {
        let roundCnt = winBoard.data.values.round - 1; // 현재 라운드
        let lastRound = -2;
        let imgStr = win + "Circle";
        let xx = 0;
        let yy = 0;

        if (roundCnt > 1) { // 전판 결과 가져오는 거
            posLastY = winTableRecord[lastRound][3];
            posLastX = winTableRecord[lastRound][2];
            lastResult = winTableRecord[lastRound][4];
        }

        // 이동할 방향 결정
        if ("tie" === win || lastResult === win || lastResult === "tie") {
            if (posY + 1 === maxY) {
                if(dir !== 1 ){ // ㄴ
                    posLastX = posX +1;
                    maxY -= 2;
                }
                dir = 1;
            }
            else{
                dir = 0;
            }

        } else if(lastResult !== win) {
            dir = 3;
        }

        // 이동
        if(dir === 1){
            yy = gap;
        }
        else if (dir === 2){

        } else if (dir === 3){

        }


        circles.push(this.add.sprite(tableX + xx, tableY + yy, imgStr).setScale(0.29).setOrigin(0).setDepth(1));
        winTableRecord.push([tableX, tableY, posX, posY, win]);
        winTableRecordArr[posY][posX] = win;
    },

        winTablePlusSix: function () {
            let roundCnt = winBoard.data.values.round - 1; // 현재 라운드

            if (roundCnt > 1) {
                posLastY = winTableRecord[roundCnt - 2][3];
                posLastX = winTableRecord[roundCnt - 2][2];
            } else {
                posY--;
            }

            let imgStr = win + "Circle";

            let arrSize = winTableRecord.length;
            // console.log(arrSize);
            // console.log(winTableRecordArr.size);


            if (arrSize === 6 * 15) {
                for (let i = 0; i < circles.length; i++) {
                    circles[i].setVisible(false);
                }
                circles = new Array();
                winTableRecord = new Array();
                winTableRecordArr = new Array(6);
                for (let i = 0; i < winTableRecordArr.length; i++) {
                    winTableRecordArr[i] = new Array(15);
                    for (let j = 0; j < 15; j++) {
                        winTableRecordArr[i][j] = "";
                    }
                }
                winBoard.data.values.round = 0;
            }

            if (posLastY === 5) {
                posY = 0;
                posX++;
            } else {
                posY++;
            }
            let yy = (posY * gap);
            let xx = (posX * gap);


            circles.push(this.add.sprite(tableX + xx, tableY + yy, imgStr).setScale(0.29).setOrigin(0).setDepth(1));
            winTableRecord.push([tableX, tableY, posX, posY, win]);
            winTableRecordArr[posY][posX] = win;
            // console.log(posY, posX);
        }


        // // 기록판에 점찍기
        // winTablePlus: function () {
        //     let roundCnt = winBoard.data.values.round - 1; // 현재 라운드
        //
        //     let lastResult;
        //     if (roundCnt === 1) {
        //         lastResult = win;
        //         posY = posLastY-1;
        //         tableY -= gap;
        //     }
        //     else {
        //         // tableX = winTableRecord[roundCnt - 2][0];
        //         // tableY = winTableRecord[roundCnt - 2][1];
        //         xDir = winTableRecord[roundCnt - 2][2];
        //         yDir = winTableRecord[roundCnt - 2][3];
        //         lastResult = winTableRecordArr[yDir][xDir];
        //     }
        //     console.log("lastResult: ", lastResult);
        //
        //     let imgStr = win + "Circle";
        //     circles.push(this.add.sprite(tableX, tableY, imgStr).setScale(0.29).setOrigin(0).setDepth(1));
        //     winTableRecord.push([tableX, tableY, posX, posY, win]);
        //     winTableRecordArr[posY][posX] = win;
        //     console.log(posY, posX);
        // }
//     winTablePlus: function () {
//         for (let i = 0; i < xMax; i++) {
//             // console.log(i)
//             if (winTableRecordArr[0][i] === undefined) {
//                 xDir = i;
//                 break;
//             }
//         }
//
//         // win = "player";
//
//         let roundCnt = winBoard.data.values.round - 1; // 현재 라운드
//
//         if (roundCnt === 1) {
//             win = "tie"; }
//         // } else if (roundCnt < 10) {
//         //     win = "player";
//         // } else if (roundCnt < 19) {
//         //     win = "banker";
//         // } else {
//         //     win = "player";
//         // }
//         let imgStr = win + "Circle";
//
//
//         // 1. 첫판은 그냥 점 찍음
//         // 2. 이전판 == 다음판 => 아래에 점찍기
//         // 3. 이전판 != 다음판 => 오른쪽 맨 윗줄에 점찍기
//         // 4. 타이인 경우 => 아래에 점 찍음
//         // 1. set direction
//         // 마지막으로 마킹한 결과(승자)
//
//         let lastResult;
//         if (roundCnt === 1) {
//             lastResult = win;
//             yDir = yMin-1;
//             tableY -= gap;
//         }
//         else {
//             // tableX = winTableRecord[roundCnt - 2][0];
//             // tableY = winTableRecord[roundCnt - 2][1];
//             xDir = winTableRecord[roundCnt - 2][2];
//             yDir = winTableRecord[roundCnt - 2][3];
//             lastResult = winTableRecordArr[yDir][xDir];
//         }
//         console.log("lastResult: ", lastResult);
//
//         // 마지막 승자 === 현재 라운드 승자
//         if ("tie" === win || lastResult === win || lastResult === "tie") {
//             if (yDir + 2 > yMax) {
//                 if(dir !== 1 ){ // ㄴ
//                     xLastDir = xDir +1;
//                     yMax -= 2;
//                     xMin = tableX + gap;
//                 }
//                 dir = 1;
//             }
//             else{
//                 dir = 0;
//             }
//         } else if (lastResult !== win) {
//             if(dir !== 1){ // ㄴ
//                 xLastDir = xDir +1;
//                 yMax -= 2;
//                 xMin = tableX + gap;
//                 dir = 1;
//                 yDir = yMin;
//                 tableY = yMin;
//             }
//             else {
//                 dir = 0;
//                 yDir = -1;
//                 tableY = -gap;
//             }
//
//             if (xDir + 1 > xMax) {
//                 // 리셋 기존에 찍힌 스프라이트, 배열 초기화
//             }
//         }
//
//         // 그리기
//         if (dir === 0) {
//             yDir++;
//             xDir = xLastDir;
//             tableY += gap;
//             tableX = xMin;
//             console.log("tableY, tableX : ", tableY, tableX);
//         } else if (dir === 1) {
//             xDir++;
//             tableX += gap;
//             console.log("tableY2, tableX2 : ", tableY, tableX);
//         }
//
//         circles.push(this.add.sprite(tableX, tableY, imgStr).setScale(0.29).setOrigin(0).setDepth(1));
//         winTableRecord.push([tableX, tableY, xDir, yDir, win]);
//         winTableRecordArr[yDir][xDir] = win;
//         console.log(yDir, xDir);
//     }
//
    });


let config = {
    type: Phaser.AUTO,
    width: 930,
    height: 500,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 100},
            debug: true
        }
    },
    scene: [Preloader, MainMenu, Game]
};

let game = new Phaser.Game(config);
