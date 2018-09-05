$(window).scroll(function() {
    if($(document).scrollTop() > 43) {
        $('#nav-control').addClass('shrink');
        $('#nav-control').addClass('navbar-light');
        $('#nav-control').removeClass('navbar-dark');
        
        $('#nav-control-alt').addClass('shrink');
    } else {
        $('#nav-control').removeClass('shrink');
        $('#nav-control').addClass('navbar-dark');
        $('#nav-control').removeClass('navbar-light');
        
        $('#nav-control-alt').removeClass('shrink');
    }
});
