var px=250;
var pv= 0;
var ps = 100;
var pa = 5;

(function(){
  var count2;
  var bpx, bpy;
  var bvx, bvy;
  //ball speed
  var bs = 20;
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

//initialize brick array
  var brick = new Array(10);
  for (var x = 0; x < 10; x++) {
    brick[x] = new Array(10);

  }

  function init(){
    //initialize ball starting position and velocity
    bpx = 250;
    bpy = 250;
    bvx = 2;
    bvy = 2;
    count2 = 0;
    //initialize bricks
    for(var x = 0; x < 10; x++){
      for(var y = 0; y < 10; y++){
        brick[x][y] = true;
      }
    }
  }

  function draw(){
    drawBackground();
    drawBricks();
    drawBall();
    drawPaddle();

    document.getElementById("score").innerHTML = "Score: " + count2;
    ballController();
    checkBrickCollison();
    paddleController();
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('load',init,false);

  function countBricks(){
     var count = 0;
    for(var y = 0; y < 10; y++){
      for(var x = 0; x < 10; x++){
        if(brick[x][y]) count++;
      }
    }
    return count;
  }

  function ballController(){
    bpy += bvy;
    bpx += bvx;

    if(bpy < 0 || bpy > c.height - bs){
      console.log("You lose!");
      init();
    }
    //ball left and right bounds
    if(bpx < 0 || bpx > c.width - bs){
      bvx *= -1;
    }
  }

  function checkBrickCollison(){
    if(bpy/20 < 10 && bpy > 0) {
      var bx = Math.floor(bpx/50);
      var by = Math.floor(bpy/20);
      if(brick[by][bx]){
        bvy *= -1;
        brick[by][bx] = false;
        count2++;
        console.log(countBricks());
        console.log(count2);
      }
    }
  }

  function paddleController(){
    pv *= .90;
    px += pv;

    //on the ball's collison with the paddle, calculate the ball's position
    //if(bpy+bs >= 450 && bpx > px && bpx + bs < px+ps){
    if(collison(bpx,bpy,bs,bs,px,450,ps,20)){
      var ballpos = (px+ps/2)-(bpx+bs/2);
      bpy = 449-bs;
      bvy *= -1;
      bvx = ballpos/-ps*4;
    }


    //make sure the paddle doesn't go off the screen
    if(px < 0) {
      px = 1;
      pv *= -1;
    }
    if(px + ps > c.width){
      px = c.width-ps-1;
      pv *= -1;
    }
  }

//drawing functions
  function drawPaddle(){
     ctx.fillStyle="#00FF00";
     ctx.fillRect(px, 450,ps,20);
     ctx.fillStyle="#FF00FF";
     ctx.fillRect(-1+px+ps/2,450, 3,20);
}

  function drawBackground(){
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,0,500,500);
  }

  function drawBall(){
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(bpx,bpy,bs,bs);
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(bpx+bs/2-1,bpy+bs/2-1,3,3);
  }

  function drawBricks(){
    ctx.fillStyle="#FF0000";
    for(var y = 0; y < 10; y++){
      for(var x = 0; x < 10; x++){
        if(brick[y][x]){
          ctx.fillRect(x*50,20*y,48,18);
        }
      }
    }
  }

  function collison(
     x1,  y1, w1, h1,
     x2,  y2, w2, h2){
    if(x1 + h1 >= x2
    && y1 + w1 >= y2
    && x1 <= x2 + w2
    && y1 <= y2 + h2
    ) return true;

    else return false;
  }

}());

//Key Controller
window.addEventListener('keydown',this.check,false);
function check(e) {
    if(e.keyCode != null){
      if(e.keyCode == 37)  pv -= pa;
      if(e.keyCode == 39)  pv += pa;
      px += pv;
  }
  else{
    pv = 0;
  }
}
