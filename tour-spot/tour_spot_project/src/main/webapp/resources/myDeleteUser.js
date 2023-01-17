$('#delete_content').scroll(function(){
    let dir = $(this).scrollTop()+$(this).innerHeight();
    const length = $('#delete_content')[0].scrollHeight-1;
    if(dir>length){
        $(this).off();       //
        $('argee_select').off(); //
        $('#delete_box').attr('disabled',false);
        $('#delete_box').attr("checked",false);
    }
});
$('.argee_select').on('click',function(){
    if($('#delete_box').attr('disabled')==='disabled'){
        alert('위 회원 탈퇴를 모두 읽어주셔야 선택이 가능합니다.');
    }
});
$('#delete_box').change(function(){
    if(this.checked){
        //체크가 되었을때만 할 이벤트
        //온체인지 인벤트 발생
        $('#delete_content').attr('style','height:300px');
        $('.login-wrapper').addClass('show');
    }
});
$('#delete-select').change(function(){
    $('#del_submit_bnt').attr('disabled',false);
    $('#del_submit_bnt').attr('style','cursor:pointer');
    if($(this).val()!=='cause_other'){
        $('.anther').html('');
        return;
    }
    $('.anther').html("<input type='text' id='delete_cause_eu'name='delete_cause_eu' placeholder='사유를 입력해주세요'></div>");
});