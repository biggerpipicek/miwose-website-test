//SCRIPT FOR MAKING MAIN PAGE HERO SECTION MOVE IN OPPOSITE DIRECTION OF CURSOR
$(document).ready(function() {
    var hero = $('div.hero');
    var targetX = 0;
    var targetY = 0;

    function smoothBackgroundMove() {
        var currentX = parseFloat(hero.css('background-position-x'));
        var currentY = parseFloat(hero.css('background-position-y'));

        var dx = targetX - currentX;
        var dy = targetY - currentY;

        // Set a smooth transition by dividing the movement by a factor
        var smoothFactor = 15; // You can adjust this factor to control smoothness

        currentX += dx / smoothFactor;
        currentY += dy / smoothFactor;

        hero.css('background-position', currentX + 'px ' + currentY + 'px');

        requestAnimationFrame(smoothBackgroundMove);
    }

    hero.on('mousemove', function(e) {
        var offsetX = 0.5 - e.pageX / $(window).width();
        var offsetY = 0.5 - e.pageY / $(window).height();
        targetX = offsetX * 15;
        targetY = offsetY * 15;
    });

    smoothBackgroundMove();
});