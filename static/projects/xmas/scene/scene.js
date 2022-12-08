$(document).ready(function() {
    /* random trees */
    $('.mountains li').find('i').each(function() {
        let that = $(this);
        that.css('top', Math.floor((Math.random())*100) + '%');
        that.css('left', Math.floor((Math.random())*100) + '%');
    });

    /* random stars */
    $('.stars').find('li').each(function() {
        let that = $(this);
        that.css('top', Math.floor((Math.random())*100) + '%');
        that.css('left', Math.floor((Math.random())*100) + '%');
    });

    let audio = $('audio')[0], animation = $('article');
    $('.play').click(function() {
        audio.play();
        animation.css('display','block');
        $('.header .mask').remove();
        $('.header .play').css('opacity','0');
        $('h1').fadeOut(800);
    });
 });

$(window).on('load', function() {
    let play = $('.play');
    play.find('p').fadeIn(1200);
    play.find('span').fadeOut(400);
});