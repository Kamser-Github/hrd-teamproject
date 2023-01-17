//금칙어 검사
const checkForbiddenKorArr = [];
const checkForbiddenEngArr = [];

$().ready(function(){
    getForbiddenKor();
    getForbiddenEng();
})

function removeSpecial(words){
    //특스문자.띄어쓰기 제거
    let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
    let word = words.replace(reg,"");
    return word;
}

//금칙어 한글 저장
function getForbiddenKor(){
    let forbiddenUrl = '/forbidden-word';
    fetch(forbiddenUrl)
        .then(response=>response.json())
        .then(result=>{
            for(let forbidden of result){
                checkForbiddenKorArr.push(forbidden.word);
            }
        });
}

//금칙어 영어 저장
function getForbiddenEng(){
    let forbiddenUrl = '/forbidden-id';
    fetch(forbiddenUrl)
        .then(response=>response.json())
        .then(result=>{
            for(let forbidden of result){
                checkForbiddenEngArr.push(forbidden.word);
            }
        });
}

//금칙어 한글
function findByForbiddenKor(content){
    for(let forbidden of checkForbiddenKorArr){
        if(content.indexOf(forbidden)!==-1){
            return true;
        }
    }
    return false;
}

//금칙어 영어
function findByForbiddenEng(content){
    let toLowerWord = content.toLowerCase();
    for(let forbidden of checkForbiddenEngArr){
        if(toLowerWord.indexOf(forbidden)!==-1){
            return true;
        }
    }
    return false;
}

function forbiddenCheck(checkStringWord,selector){
    let removeResult = removeSpecial(checkStringWord);
    let checkEng = findByForbiddenEng(removeResult);
    let checkKor = findByForbiddenKor(removeResult);
    if(checkKor||checkEng){
        $(selector).val('');
        swal("금칙어는 사용이 불가합니다", "다시 입력해주세요", "error");
        return true;
    }
    return false;
}

