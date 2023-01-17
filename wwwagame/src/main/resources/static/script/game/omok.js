const map = document.body.querySelector('.map');
const board = document.body.querySelector('.board');

const SIZE = 14;

const mark = [];
const mark2 = [];
let win = 0;
let turn = 1;


for(let i=0; i<SIZE-1; i++){
    const row = [];
    const mapRow = document.createElement('div');
    mapRow.setAttribute('class', 'rowOne');

    for(let j=0; j<SIZE-1; j++){
        row.push(0);
        const box = document.createElement('div');
        box.setAttribute('class', 'line');
        // box.setAttribute('id', `y${i}x${j}`);


        mapRow.append(box);
    }
    mark2.push(row);
    board.append(mapRow);
}

const player = document.getElementById('player');
player.innerHTML = 'Player 1';
// set map
for(let i=0; i<SIZE; i++){
    const row = [];
    const mapRow = document.createElement('div');
    mapRow.setAttribute('class', 'rowOne');

    for(let j=0; j<SIZE; j++){
        row.push(0);
        const box = document.createElement('div');
        box.setAttribute('class', 'box');
        box.setAttribute('id', `y${i}x${j}`);
        box.addEventListener('click', e => {
            const yx = box.getAttribute('id');
            // y1x2 면 1,2불러오는데 10자리 넘어서 y11x12면 1이랑 x를 불러오네
            // y12x3 / y1x12 / y12x12
            let y;
            let x;
            if(yx.length === 6){
                y = parseInt(yx.substring(1,3));
                x = parseInt(yx.substring(4,6));
            }
            else if(yx.length === 5){
                if(parseInt(yx.charAt(3)) === 1){
                    console.log(yx);
                    y = parseInt(yx.charAt(1));
                    x = parseInt(yx.substring(3,5));
                }
                else {
                    y = parseInt(yx.substring(1,3));
                    x = parseInt(yx.charAt(4));
                }
            }
            else{
                y = parseInt(yx.charAt(1));
                x = parseInt(yx.charAt(3));
            }
            // console.log(y + ',' + x);
            // console.log('click' + mark[y][x]);
            // console.log(mark[y][x]);

            if(mark[y][x] === 0){
                if (turn === 1){
                    box.setAttribute('style', 'background-color: #000000; border: 1px solid #00000040;  width: 50px; height: 50px');
                } else {
                    box.setAttribute('style', 'background-color: #ffffff; border: 1px solid #00000040; width: 50px; height: 50px');
                }
                mark[y][x] = turn;
                checkWin(y, x);
                turn = turn == 1 ? 2 : 1;
                player.innerHTML = `Player ${turn}`;
            }

        });
        mapRow.append(box);
    }
    mark.push(row);
    map.append(mapRow);

}

function checkWin(y, x){
    // 가로 승리 0 3 6
    for(let i=0; i<SIZE; i++){
        let cnt = 0;
        for(let j=0; j<SIZE; j++){
            if(mark[i][j] === turn){
                cnt++;
            } else {
                cnt = 0;
            }

            if(cnt >= 5){
                win = turn;
            }
        }
    }

    // 세로 승리 0 1 2
    for(let i=0; i<SIZE; i++){
        let cnt = 0;
        for(let j=0; j<SIZE; j++){
            if(mark[j][i] === turn){  // 00 10 20
                cnt++;
            } else {
                cnt = 0;
            }

            if(cnt >= 5){
                win = turn;
            }
        }
    }

    // \대각선
    let cnt = 0;
    let yy = y;
    let xx = x;

    while(yy >= 0 && xx >= 0){ // 왼쪽 맨 위까지 올라감
        yy--;
        xx--;
    }
    // console.log(xx);
    // console.log(yy);
    while(xx < SIZE-1 && yy < SIZE-1) { // 오른쪽 아래까지 내려감
        // console.log(yy + "," + xx);
        yy++;
        xx++;
        if(mark[yy][xx] === turn){
            cnt++;
        } else {
            cnt = 0;
        }

        if(cnt > 4){
            win = turn;
        }

    }

    cnt = 0;
    // 좌표 초기화
    yy = y;
    xx = x;
    // /대각선
    while(yy >= 0 && xx <= SIZE){ // 오른쪽 맨 위까지 올라감
        yy--;
        xx++;
    }

    while(xx > 0 && yy < SIZE-1) { // 왼쪽 아래까지 내려감
        // console.log(yy + "," + xx + "," + cnt);
        yy++;
        xx--;
        if(mark[yy][xx] === turn){
            cnt++;
        } else {
            cnt = 0;
        }
        if(cnt > 4){
            win = turn;
        }
    }

    if(win === turn){
        alert(`P${win} is Win`);
        location.reload();
    }
}