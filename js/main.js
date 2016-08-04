$(function() {
    
    setupScale();
    
    $(window).resize(setupScale);
    
    setInterval(timeUpdate, 300);
    
    var config = loadJson('./config.json');
    
    setInterval(loadState, config.updateInterval * 1000);
    
    function setupScale() {
        var w = $('body').width();
        var h = $('body').height();
        var cw = $(window).width();
        var ch = $(window).height();
        var ratio = Math.min(cw / w, ch / h);
        var dx = Math.round((cw - w * ratio) / 2);
        var dy = Math.round((ch - h * ratio) / 2);
        console.log(ratio + ', ' + dx + ', ' + dy);
        var s = 'matrix(' + ratio + ', 0, 0, ' + ratio + ', ' + dx +',' + dy + ')';
        $('body').css('transform', s);
    }
    
    function twoDigits(n) {
        var s = '00' + n;
        return s.substring(s.length - 2);
    }
    
    function timeUpdate() {
        var m = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
                'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        var d = new Date();
        var date = d.getDate() + ' ' + m[d.getMonth()] + ' ' + d.getFullYear();
        var time = twoDigits(d.getHours()) + ':' + twoDigits(d.getMinutes()) + ':' + twoDigits(d.getSeconds());
        $('.time').html(date + '<br/>' + time);
    }
    
    function loadJson(url) {
        try {
            var res = $.ajax(url, {
                dataType: 'json',
                async: false
            });
            return JSON.parse(res.responseText);
        } catch (e) {
            return null;
        }
    }
    
    function loadState() {
        var state = loadJson(config.state);
        $('#btn-connect').toggleClass('active', state !== null);
        if (state === null) {
            return;
        }
        $('#btn-alarm').toggleClass('active', state.sensors.length == 0);
    }
    
    $('#btn-guard').click(function() {
        var btn = $(this);
        btn.toggleClass('active');
    });
    
    $('#btn-onoff').click(function() {
        var btn = $(this);
        btn.toggleClass('active');
        try {
            var res = $.ajax(config.onoff + '?state=' + btn.hasClass('active'), {
                async: false
            });
        } catch (e) {
        }
    });
    
});
