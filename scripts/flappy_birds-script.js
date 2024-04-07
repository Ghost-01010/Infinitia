var speed = 1;
var dir = -1;
var last_pass = 0;
var last_fail = 0;
var score = 0;
var hits = 0;
var difficulty = 4; //1 - 3(hardest) - 4(nearly impossible)
var play = 0;
var barrier_come_int;
var barrier_spawn_int;
var glide = 0;
var bg_1_x = -800;
var bg_2_x = 0;
var bg_3_x = 800;
var controls = 0;

//Get parameters of playarea
var cont_width = document.getElementById("container").offsetWidth;
var cont_height = document.getElementById("container").offsetWidth;

var bot_barr = document.querySelectorAll(".barrier-bottom");
var top_barr =  document.querySelectorAll(".barrier-top");


//Set moving speed etc.
speed -= 1; //1 - 5(max)
var barrier_spawn_speed = 900
; //In miliseconds
var fall_speed =  1.2
var lifting_speed = 5;





function barrier_come() {
  score = 0;
  document.getElementById("score").innerHTML = score;
  if (play) {
      bot_barr_ch = document.querySelectorAll(".barrier-bottom");
      top_barr_ch = document.querySelectorAll(".barrier-top");
    for (var p = 0; p != bot_barr_ch.length-1; p++) {
      bot_barr_ch[p].outerHTML = "";
      top_barr_ch[p].outerHTML = "";
    }
    document.getElementById("bird").style.top = 250+"px";
  }
  play = 1;
  document.getElementById("bird").style.display = "block";
  document.querySelector("#container>p").style.display = "block";
  document.getElementById("controls").style.display = "none";
  barrier_come_int = setInterval(function() {
    
  //Background
    var all_bg = document.getElementById("container");
    var bg_val = bg_1_x + "px 0, " + bg_2_x + "px 0, " + bg_3_x + "px 0" ;
    bg_1_x -= 0.5;
    bg_2_x -= 0.5;
    bg_3_x -= 0.5;
    
    all_bg.style.backgroundPosition = bg_val;
   
  //Barrier part
  for (var i = 0; i != bot_barr.length; i++) {
    
    bot_barr = document.querySelectorAll(".barrier-bottom");
    top_barr = document.querySelectorAll(".barrier-top");
    
    var x = bot_barr[i].offsetLeft;
    x -= 1;
    top_barr[i].style.left = x + "px";

    bot_barr[i].style.left = x + "px"; 
    
    if (x == -24) {
      top_barr[i].outerHTML = "";
      bot_barr[i].outerHTML = "";
    }
    
    if (bot_barr[i].offsetLeft < 182 && bot_barr[i].offsetLeft > 158) {
      
      var y = document.getElementById("bird").offsetTop;
      if (y-12 < top_barr[i].offsetHeight || y+12 > (500 - bot_barr[i].offsetHeight) ) {
        bot_barr[i].classList.add("hit");
        top_barr[i].classList.add("hit");
        var time = new Date();
        time = time.getTime();
        if (time - last_fail > 1000) {
          fail();
        }
        last_fail = time;
      } else {
        var time = new Date();
        time = time.getTime();
        if (time - last_pass > 1000 && time-last_fail > 1000) {
          score++;
         document.getElementById("score").innerHTML = score*5;
        }
        last_pass = time;
      }
      
    }
    
  }
  //Bird part
  var y = document.getElementById("bird").offsetTop;
  if (dir < 0) {
    if (glide == 0) {
      y += fall_speed;
    } else {
      glide--;
    }
  } else {
    if (dir % 2 != 0) {
     y -= lifting_speed; 
    }
    dir--;
  }
  
  if (y <= 500) {
    document.getElementById("bird").style.top = y+"px";
  }
  if (y < 0) {
    document.getElementById("bird").style.top = "0px";
    dir = 0;
  }

  
  
}, speed);
}
function barrier_spawn() {
  barrier_spawn_int = setInterval(function() {
  let barrsInner = document.getElementById("barrier-container").innerHTML;
  
  let gap = (difficulty-1)*10;
  if (gap == 30) {
    gap = 35;
  }
  gap = 100 - gap;
  top_barr_height = random(50, 450-gap);
  bot_barr_height = 450-gap-top_barr_height;
  
  
  let barrs = '<div class="barrier-top" style="height: '+ top_barr_height +'px;left: 800px"></div><div class="barrier-bottom" style="height: '+ bot_barr_height +'px;left: 800px"></div>';
  
  document.getElementById("barrier-container").innerHTML = barrsInner + barrs;
  
  
}, barrier_spawn_speed);
}
function fail() {
  clearInterval(barrier_come_int);
  clearInterval(barrier_spawn_int);
  document.getElementById("restart").style.display = "block";
  document.querySelector("#start_page>p").style.display = "block";
  document.querySelector("#container>p").style.display = "none";
  document.getElementById("final_score").innerHTML = score*10;
  
  
  
  score = 0;
}

document.getElementById("start_button").onclick = function() {
  start();
}


var all = document.querySelector("html");
all.onclick = function() {
  if (play) {
   dir += 20;
    glide = 5;
  }
}
document.getElementById("restart").onclick = function() { 
  start();
}





function random(min, max) {  
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}




window.onkeypress = function() {
	showChar(event);
}
function showChar(e) {
    if (e.charCode == 32 && play) {
      dir += 20;
      glide = 5;
    }
  if (e.charCode == 13 && document.getElementById("start_button").style.display != "") {
    if (document.getElementById("restart").style.display == "block") {
      start();
    } else {
      fail();  
    }
  }
}

document.getElementById("controls").onclick = function() {
  if (controls % 2 == 0) {
   this.innerHTML = "CLICK or SPACE to fly<br><br>ENTER to restart";
    
  } else {
    this.innerHTML = "Controls";
  }
  controls++;
}

function start() {
    dir = 0;
    document.getElementById("restart").style.display = "none";
    document.querySelector("#start_page>p").style.display = "none";
    document.getElementById("start_button").style.display = "none";
    barrier_spawn();
    barrier_come();
}