/**
 * 
 */
$('#join_id').keyup(()=>{
    let test = $('#join_id').val();
	console.log(test);
	findID(test);
});

function findID(text){
    $.ajax({
        method:"POST",
        url : 'service/command=UserDuplCheck"',
        data : {
			id : `${text}`
		}
    }).done(e=>{
		if(e==='EXISTS'){
	        console.log('중복',e);
			$('.errorID').text('이미 존재하는 아이디 입니다.');
			$('.idicon').attr('style','');
			return;
		}
		$('.errorID').text("");
    	$('.idicon').attr('style','color:blue');
    })
}

$('.addr_search_button').on('click',function(){
    new daum.Postcode({
        oncomplete: function(data) {
            const addr = data.address;
            $('#addrhidden').removeClass('hidden');
            $('#join_addr1').val(addr);
            $('#join_addr2').attr('placeholder', '상세주소를 입력해주세요.' );
        }
    }).open();
});
let userIdCheck = RegExp(/^[A-Za-z0-9_\-]{5,50}$/);
let passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%^*@()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);

//아이디 정규식
$('#join_id').keyup(()=>{	
    $('#join_id').val($('#join_id').val().replace(/[^A-Za-z0-9_\-@.]/gi,''));
}).on('blur',()=>{
    if(!userIdCheck.test($('#join_id').val())){
        $('.errorID').text("영문,숫자포함 5~50자로 가능합니다.")
        $('.idicon').attr('style','');
        return;
    }
    $('.errorID').text("");
});

//비밀번호
$('#join_pw1').keyup(()=>{
    let pw = $('#join_pw1').val();
    if(!passwdCheck.test(pw)){
        $('.errorPw1').text("특수문자,영문 대소문자,숫자를 섞어 8~16자내외로 작성해주세요")
        $('#join_pw2').attr('placeholder','비밀번호를 다시 설정해주세요.');
        $('.pwicon1').attr('style','');
        return;
    }
    $('.errorPw1').text("");
    $('.pwicon')
}).on('blur',()=>{
    let pw = $('#join_pw1').val();
    if(!passwdCheck.test(pw)){
        $('#join_pw2').attr('readonly',true);
        return;
    }
    $('#join_pw2').attr('readonly',false);
    $('.pwicon1').attr('style','color:blue');
});

//비밀번호 확인
$('#join_pw2').keyup(()=>{
    let pw2 = $('#join_pw2').val();
    let pw1 = $('#join_pw1').val();
    if(pw1.leng!=0&&pw2!==pw1){
        $('.errorPw2').text("비밀번호가 일치하지 않습니다.");
        $('.pwicon2').attr('style','');
        return;
    }
    $('.errorPw2').text("");
    $('.pwicon2').attr('style','color:blue');
});

//닉네임확인
$('#join_name').keyup(()=>{
    let leng = $('#join_name').val().length;
    if(leng<2||leng>6){
        $('.errorName').text("2~6글자 내외로 입력해주세요.");
        $('.nic_name').attr('style','');
        return;
    }
    $('.errorName').text("");
    $('.nic_name').attr('style','color:blue');
});


//전화번호 확인
$('.checkPhone1').on('blur',()=>{
    let phone1 = $('.checkPhone1').val();
    let regexp = /^01[0179]$/;
    if(!regexp.test(phone1)){
        $('.checkPhone1').val('');
        $('.errorNumber').text('번호를 다시 확인해주세요.');
        return;
    }
    $('.errorNumber').text('');
});

$('.checkPhone2').on('blur',()=>{
    let phone1 = $('.checkPhone2').val();
    let regexp = /^\d{3,4}$/;
    if(!regexp.test(phone1)){
        $('.checkPhone2').val('');
        $('.errorNumber').text('번호를 다시 확인해주세요.');
        return;
    }
    $('.errorNumber').text('');
});

$('.checkPhone3').on('blur',()=>{
    let phone1 = $('.checkPhone3').val();
    let regexp = /^\d{4}$/;
    if(!regexp.test(phone1)){
        $('.checkPhone3').val('');
        $('.errorNumber').text('번호를 다시 확인해주세요.')
        $('.ch_phone').attr('style','');
        return;
    }
    $('.errorNumber').text('');
});

$('.info_phone input').on('blur',function(){
    let check = true;
    $('.info_phone input').each(function(){
        console.log($(this).val());
        if($(this).val()===''){
            check = false;
        }
    });
    if(check){
        $('.ch_phone').attr('style','color:blue');
        return;
    }
    $('.ch_phone').attr('style','');
});



//날짜 유효성 검사
$('#join_date').on('change',(e)=>{
    if(!validDate()){
        $('.errorDate').text('유효하지 않은 날짜입니다.');
        $('#join_date').val('');
        return;
    }
    $('.errorDate').text('');
});

function validDate(){
    let selDate =new Date($('#join_date').val());
    let nowDate = new Date();
    if(nowDate-selDate<=0){
        return false;
    }
    return true;
}

//전체 유효성 체크
$('form').submit((e)=>{
    e.preventDefault();
    if(checkNull()&&checkNull()){
        $('form').unbind('submit').submit();
    }
});
function checkNull(){
    const check_List = $('.requiredValue');
    const CHECK_POINTS=$('.requiredValue').length;
    for(let i=0 ; i<CHECK_POINTS ; i++){
        if(check_List[i].value===''){
            check_List[i].focus();
            alert('해당 사항을 다시 확인해주세요');
            return false;
        }
    }
    return true;
}
function checkError(){
    const check_List = $('.errorCheck');
    const CHECK_ERRORS = $('.errorCheck').length;
    for(let i=0 ; i<CHECK_ERRORS ; i++){
        if(check_List[i].value!==''){
            check_List[i].focus();
            alert('해당 사항을 다시 확인해주세요');
            return false;
        }
    }
    return true;
}