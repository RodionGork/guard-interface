$(function() {
    
    setupScale();
    
    $(window).resize(setupScale);
    
    function setupScale() {
        var w = $('#main').width() + 50;
        var h = $('#main').height() + 30;
        var cw = $(window).width();
        var ch = $(window).height();
        var ratio = Math.min(cw / w, ch / h);
        console.log(ratio);
        $('#main').css('transform', 'scale(' + ratio + ')');
    }
    
});
