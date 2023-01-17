const map = document.body.querySelector('.map');

const SIZE = 5; // 5*5

// const mark = [];
const front = [];
const back = [];
let cnt = 1;

let timerSet = false;

// 1누르면 타이머 시작해서 50누를 때까지 시간 잼
for(let i=0; i<25; i++){
    let ran = parseInt((Math.random()*25) +1);
    let check = true;

    for(let j=0; j<i; j++){
        if(ran === front[j]){ // 같은 값이 있으면
            check = false;
        }
    }

    if(!check){
        i--; // 다시 돌림
    }
    else{
        front.push(ran);
        // console.log(front[i]);
    }

}
// console.log('br');
for(let i=0; i<25; i++){
    let ran = parseInt((Math.random()*25) +26);
    let check = true;
    // console.log(ran);

    for(let j=0; j<i; j++){
        if(ran === back[j]){
            check = false;
        }
    }

    if(!check){
        i--;
    }
    else{
        back.push(ran);
        // console.log(back[i]);
    }
}
// console.log(" ");

for(let i=0; i<SIZE; i++){
    const row = [];
    const mapRow = document.createElement('div');
    mapRow.setAttribute('class', 'rowOne');

    for(let j=0; j<SIZE; j++){
        row.push(0);
        // console.log(row[i]);
        const box = document.createElement('div');
        box.innerHTML = front[(i*5)+j];
        box.setAttribute('class', 'box');
        box.setAttribute('value', `${front[(i*5)+j]}`);
        box.addEventListener('click', e => {
            const aaa = parseInt(box.getAttribute('value'));
            if(cnt === 1){
                start = new Date();
            }

            if(aaa === cnt && cnt < 26){
                timerSet = true;
                box.setAttribute('style', 'background: #f0f9ff');

                box.setAttribute('value', `${back[(i*5)+j]}`);
                box.innerHTML = back[(i*5)+j];
                cnt++;
                // console.log(cnt);
            }
            else if(aaa === cnt){
                box.innerHTML = "";
                cnt++;
                // console.log(cnt);

            }



            if(cnt == 51){
                timerSet = false;
                checkWin();
            }

        });
        mapRow.append(box);
    }
    // mark.push(row);
    map.append(mapRow);

}

function checkWin(){

    // alert(`${sec}.${ms}초 걸림`);
    // location.reload();

}

let sec;
let ms;
let start;
function timer(){
    if(timerSet){

        const end = new Date();
        let ttime = end - start;
        sec = parseInt(ttime / 1000);
        ms = parseInt(ttime % 1000);


        let target = document.getElementById("timer");
        target.innerText = `${sec}.${ms}초` ;

    }

}
timer();
setInterval(timer, 3);