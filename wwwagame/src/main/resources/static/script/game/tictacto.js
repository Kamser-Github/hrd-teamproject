$(".modal2").hide();

const map = document.body.querySelector('.map1');
const SIZE = 3;

const mark = [];
let win = 0;
let turn = 1;
let count = 0;

// set map
for(let i=0; i<SIZE; i++){
    const row = [];
    const mapRow = document.createElement('div');
    mapRow.setAttribute('class', 'row1');

    for(let j=0; j<SIZE; j++){
        row.push(0);
        const box = document.createElement('div');
        box.setAttribute('class', 'box1');
        box.setAttribute('id', `y${i}x${j}`);
        box.addEventListener('click', e => {
            const yx = box.getAttribute('id');
            const y = parseInt(yx.charAt(1));
            const x = parseInt(yx.charAt(3));

            if(mark[y][x] === 0){
                if (turn === 1){
                    e.target.setAttribute("class", "box1 one");
                } else {
                    e.target.setAttribute("class", "box1 two");
                }

                mark[y][x] = turn;
                console.log(yx);
                checkWin();
                turn = turn == 1 ? 2 : 1;
                count++;
                if(count === 9){
                    tie();
                }
            }

        });
        mapRow.append(box);
    }
    mark.push(row);
    map.append(mapRow);

}

function checkWin(){
    // 가로 승리 0 3 6
    for(let i=0; i<3; i++){
        let cnt = 0;
        for(let j=0; j<3; j++){
            if(mark[i][j] === turn){
                cnt++;
            }

            if(cnt === 3){
                win = turn;
            }
        }
    }

    // 세로 승리 0 1 2
    for(let i=0; i<3; i++){
        let cnt = 0;
        for(let j=0; j<3; j++){
            if(mark[j][i] === turn){  // 00 10 20
                cnt++;
            }

            if(cnt === 3){
                win = turn;
            }
        }
    }

    // \대각선
    let cnt = 0;
    for(let i=0; i<3; i++){
        if(mark[i][i] === turn){  // 00 11 22
            cnt++;
        }
        console.log(cnt);
        if(cnt === 3){
            win = turn;
        }
    }

    // /대각선
    cnt = 0;
    for(let i=0; i<3; i++){
        if(mark[i][2-i] === turn){  // 02 11 20
            cnt++;
        }
        console.log(cnt);
        if(cnt === 3){
            win = turn;
        }
    }

    if(win !== 0){
        $(".modal-content2 span p").text(win + "의 승리!!");
        $(".modal2").show();
    }
}

function tie(){
    $(".modal-content2 span p").text("무승부!!");
    $(".modal2").show();
}