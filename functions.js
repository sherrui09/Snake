//Global
var dir = "w"; //w,a,s,d
var pixel_location = [];
var pixel_dir = [];
var apple_loc = [];

onEvent("button_start", "click", function() {
  set_field();
  process_tick();
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


//main engine
function process_tick()
{
  timedLoop(75, function() {

    
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
    //check ded
    var first = pixel_location[pixel_location.length-1];
    for(var c = 0; c < pixel_location.length-1; c++)
      if(first[0] == pixel_location[c][0] && first[1] == pixel_location[c][1])
        stopTimedLoop();
    //apple
    
    if(first[0] == apple_loc[0] && first[1] == apple_loc[1])
    {
      apple_loc[0] = randomNumber(1,31) * 10;
      apple_loc[1] = randomNumber(1,44) * 10;
      append_pixel();
       
    }
    
    //draw
    clearCanvas();
    draw_square(apple_loc[0],apple_loc[1], "red");
    for(var j = 0; j < pixel_dir.length; j++)
      draw_square(pixel_location[j][0],pixel_location[j][1], "blue");
    
  
    
    //shift
    pixel_dir.splice(0,1);
    pixel_dir.push(dir);
    
    //console.log(pixel_location);
    //console.log(pixel_dir);

  });
}

onEvent("screen_play", "keydown", function(event)
{
  var input = event.key;
  if(input == "w" || input == "W" || input == "Up")
    dir = "w";
  else if(input == "a" || input == "A" || input == "Left")
    dir = "a";
  else if(input == "s" || input == "S" || input == "Down")
    dir = "s";
  else if(input == "d" || input == "D" || input == "Right")
    dir = "d";
});

//misc
function draw_square(x,y,color)
{
  setStrokeColor(color);
  setFillColor(color);
  //rect(x, y, 10, 10);
  circle(x, y, 5);
  
}

function append_pixel()
{
  var p_x = pixel_location[0][0];
  var p_y = pixel_location[0][1];
  for(var i = 0; i < 4; i++)
  {
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
//main
function main()
{
  setScreen("screen_start");
  setActiveCanvas("canvas_play");
}

main();
