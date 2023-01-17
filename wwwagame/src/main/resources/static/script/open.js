$(function() {
    $('body').on('click', function(e){
        let $tgPoint = $(e.target);
        let chatRoomBody = $tgPoint.closest('.popup-contents');
        let chatButton = $tgPoint.closest('.chatting-button');
        let modal_button = $tgPoint.closest('.swal-button');
        let modal_swal = $tgPoint.closest('.swal-modal');

        if(!(chatButton.hasClass('chatting-button')||chatRoomBody.hasClass('popup-contents'))){
            $('.popup-contents').hide();
        }
        if(modal_button.hasClass('swal-button')||modal_swal.hasClass('swal-modal')){
            $('.popup-contents').show();
        }
    });

    $('.chatting-button').on('click',function(){
        init_message_cnt();
        $(".account-message").html("");
        $('.popup-contents').toggle();
    })
});

$('.btn-close').on('keydown', function (e) {
    if (e.keyCode == 13) {
        return false;
    }
});