const quotes = [
	"There are two ways to write error-free programs; only the third one works.",
	"It’s not a bug – it’s an undocumented feature.",
	"Software undergoes beta testing before it’s released. Beta is Latin for 'still doesn’t work'.",
	"In order to understand recursion, one must first understand recursion.",
	"The best thing about a boolean is even if you are wrong, you are only off by a bit"
];

// JavaScript Document
class sound {
	constructor(src) {
		this.snd = document.createElement("audio");
		this.snd.src = src;
    	this.snd.setAttribute("preload", "auto");
    	this.snd.setAttribute("controls", "none");
    	this.snd.style.display = "none";
    	document.body.appendChild(this.snd);
	}
	
	play() {
		this.snd.play();
	}
	
	stop() {
		this.snd.pause();
	}
}

const openingSound = new sound("./resources/sounds/simple_click_sound.mp3");
const menu = document.getElementsByClassName("top-menu")[0];
var topZIndex = 55;

// close all windows
const openedWindows = document.getElementsByClassName("close-window-button");
for(var i = 0; i < openedWindows.length; i++) {
	closeWindow(openedWindows[i]);
}

// hide loading screen
const launchedScreen = document.querySelector(".launched-desktop");
const loadingScreen = document.querySelector(".launching-desktop");
const introMessageOne = document.querySelector(".one-m-text");
const introMessageTwo = document.querySelector(".two-m-text");
launchedScreen.style.display = "none";

function initialLoad() {
	loadingScreen.style.display = "none";
	launchedScreen.style.display = "";
}
setTimeout(initialLoad, 4500);

hideOrShow(menu);
updateTimeLabel();
window.setInterval(updateTimeLabel, 10000);

$(".desktop-icon").draggable({
	containment: $("#mainContainingWindow"),
	zIndex: 100
});

$(".folder-window").draggable({
	containment: $("#mainContainingWindow"), 
	iframeFix: true,
	start: function( event, ui ) {
		"use strict";
		
		const elementId = ui.helper[0].id;
		const element = document.getElementById(elementId);
		topZIndex += 1;
		element.style.zIndex = topZIndex;
	}
});

$(".project-icon").draggable({
	containment: $("#projects-folder-container"),
	zIndex: 100
});

$(document).ready(function() {
	"use strict";
	
	$(".desktop-icon").draggable( "option", "containment", $("#mainContainingWindow"), "zIndex", 100);
	$(".folder-window").draggable("option", "containment", $("#mainContainingWindow"), "iframeFix", true);
	
	$(".desktop-icon").dblclick(function() {
		openingSound.play();
		var pText = this.getElementsByTagName("p")[0].innerHTML;
		
        if (pText === "LinkedIn.html") {
            window.open("https://www.linkedin.com/in/lloyddapaah");
        } else if (pText === "Github.html") {
            window.open("https://github.com/lloydoad");
        } else if (pText === "Twitter.html") {
            window.open("https://twitter.com/lloydoad");
        } else if (pText === "Instagram.html") {
            window.open("https://www.instagram.com/lloydoad/");
        } else if (pText === "Résumé.pdf") {
			openingSound.play();
			openWindow("resume-pdf-window");
		} else if (pText === "AboutMe.pdf") {
			openingSound.play();
			openWindow("about-pdf-window");
		} else if (pText === "Projects") {
			openingSound.play();
			openWindow("projects-collection-window");
		}
	});

	$(".menu-label").click(function() {
		const pText = this.innerHTML;

		if (pText === "LinkedIn") {
            window.open("https://www.linkedin.com/in/lloyddapaah");
        } else if (pText === "Github") {
            window.open("https://github.com/lloydoad");
        } else if (pText === "Résumé") {
			openingSound.play();
			openWindow("resume-pdf-window");
		} else if (pText === "AboutMe.pdf") {
			openingSound.play();
			openWindow("about-pdf-window");
		} else if (pText === "Projects") {
			openingSound.play();
			openWindow("projects-collection-window");
		} else if (pText === "Restart...") {
			// show loading screen for 5 seconds
			launchedScreen.style.display = "none";
			loadingScreen.style.display = "";
			introMessageOne.style.display = "none";

			const message = Math.floor(Math.random() * 5); 
			introMessageTwo.innerText = quotes[message];

			function loadComplete() {
				loadingScreen.style.display = "none";
				launchedScreen.style.display = "";
			}

			setTimeout(loadComplete, 5000);
		}
	});
	
	$(".menu-button").click(function() {
		hideOrShow(menu);
	});
	
	$(".close-window-button").click(function() {
		openingSound.play();
		closeWindow(this);
	});
});

function openWindow(elementId) {
	"use strict";
	
	var element = document.getElementById(elementId);
		
	element.style.display = "flex";
	topZIndex += 1;
	element.style.zIndex = topZIndex;
	element.style.left = (Math.floor(Math.random() * 100) + 10) + "px";
	element.style.top = (Math.floor(Math.random() * 100) + 30) + "px";	
}

function closeWindow(myBtn) {
	"use strict";
	
	var id = myBtn.getAttribute("name");
	var element = document.getElementById(id);
	
	element.style.display = "none";
}

function updateTimeLabel() {
	"use strict";
	
	var date = new Date();
    var formatedLabel = "";
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var hour = 0;
    var minute = 0;
    var hourExtension = "AM";

    formatedLabel += days[date.getDay()];
    formatedLabel += " ";

    hour = date.getHours();
    if (hour > 12) {
        hour -= 12;
        hourExtension = "PM";
    } else {
        hourExtension = "AM";
    }
    if (hour === 0) {
        formatedLabel += "0";
	}
    formatedLabel += hour;

    minute = date.getMinutes();
    if (minute < 10) {
        formatedLabel += ":0";
    } else {
		formatedLabel += ":";
	}
    formatedLabel += minute + " " + hourExtension;

    document.getElementsByClassName("time-label")[0].innerHTML = formatedLabel;
}

function hideOrShow(element) {
	"use strict";
	
    if (element.style.display === "none") {
        element.style.display = "block";
		openingSound.play();
    } else {
        element.style.display = "none";
    }
}