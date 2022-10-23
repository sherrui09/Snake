//Global
var dir = "w"; //w,a,s,d
var pixel_location = [];
var pixel_dir = [];
var apple_loc = [];
var score=0;
var ScreenX=310;
var ScreenY=440;

main();
  
onEvent("button_start", "click", function() {
  set_field();
  process_tick();
});

//resets game once start over is clicked
onEvent("overBtn", "click", function(){
dir = "w";
pixel_location = [];
pixel_dir = [];
apple_loc = [];
score=0;
setText("scoreInput",score);
set_field();
process_tick();
});

//returns direction based on key clicked
onEvent("screen_play", "keydown", function(event)
{
  var input = event.key;
  if(input == "w" || input == "Up")
  {
    if(dir != "s")
    {
      dir = "w";
    }
  }
  if(input == "a" ||input == "Left")
  {
    if(dir != "d")
    {
      dir = "a";
    }
  }
  if(input == "s" || input == "Down")
  {
    if(dir != "w")
    {
      dir = "s";
    }
  }
  if(input == "d" || input == "Right")
  {
    if(dir != "a")
    {
      dir = "d";
    }
  }
});

function set_field()
{
  setScreen("screen_play");
  for(var i = 0; i < 4; i ++)
  {
    pixel_location.push([160,440- (i * 10)]);
    pixel_dir.push("w");
  }
  apple_loc[0] = randomNumber(1,31) * 10;
  apple_loc[1] = randomNumber(1,44) * 10;
}

//main function
function process_tick()
{
  timedLoop(70, function() {
    //move
    for(var p = 0; p < pixel_location.length; p++)
    {
      var pl = pixel_dir[p];
      if(pl == "w")
        pixel_location[p][1] += -10; 
      else if(pl == "a")
        pixel_location[p][0] += -10; 
      else if(pl == "s")
        pixel_location[p][1] += 10; 
      else if(pl == "d")
        pixel_location[p][0] += 10; 
    }
  
    draw();
    
    //shift
    pixel_dir.splice(0,1);
    pixel_dir.push(dir);
    
    loop ();

   // console.log(pixel_location);
   // console.log(pixel_dir);
  });
}

function loop (){
  //continuously draws snake and checks if snake head touches snake body
  var first = pixel_location[pixel_location.length-1];
    for(var i = 0; i < pixel_location.length-1; i++)
   
      if(first[0] == pixel_location[i][0] && first[1] == pixel_location[i][1]){
        stopTimedLoop();
        setScreen("screen_dead");
        setText("scoreFinal","Score: "+ score);
      }
    
        touchBorder(first[0],first[1]);

    // resets apple location when the location of the first squre of snake touches
    if(first[0] == apple_loc[0] && first[1] == apple_loc[1]) {
      apple_loc[0] = randomNumber(1,31) * 10;
      apple_loc[1] = randomNumber(1,44) * 10;
      append_pixel();
      score ++;
      setText("scoreInput","Score: "+ score);
    }
}

//clears canvas and draws the first apple and snake
function draw (){
  clearCanvas();
    draw_square(apple_loc[0],apple_loc[1], "red");
    for(var j = 0; j < pixel_dir.length; j++)
      draw_square(pixel_location[j][0],pixel_location[j][1], "blue");
}

//draws the individual squares that makeup the apple and snake
function draw_square(x,y,color)
{
  setStrokeColor(color);
  setFillColor(color);
  rect(x, y, 10, 10);
}

//determines if the snake head touches boarder
function touchBorder(headx,heady) {
  if(headx<0)
  return setScreen("screen_dead");
  setText("scoreFinal","Score: "+ score);
  if(heady<0)
  return setScreen("screen_dead");
  setText("scoreFinal","Score: "+ score);
  if(headx>ScreenX)
  return setScreen("screen_dead");
  setText("scoreFinal","Score: "+ score);
  if(heady>ScreenY)
  return setScreen("screen_dead");
  setText("scoreFinal","Score: "+ score);
}

//keeps track of pixel location, checks which key is pressed
function append_pixel()
{
  var p_x = pixel_location[0][0];
  var p_y = pixel_location[0][1];
  for(var i = 0; i < 4; i++)
  {
    //moves the squares depending on key pressed
    var last_dir = pixel_dir[0];
    if(last_dir == "w")
      p_y += 10;
    else if(last_dir == "a")
      p_x += 10;
    else if(last_dir == "s")
      p_y += -10;
    else if(last_dir == "d")
      p_x += -10;
  
    pixel_location.splice(0,0,[p_x,p_y]); 
    pixel_dir.splice(0,0,last_dir);
  }
  //console.log(pixel_location);
  //console.log(pixel_dir);
  //stopTimedLoop();
}

//sets canvas
function main()
{
  setScreen("screen_start");
  setActiveCanvas("canvas1");
}


