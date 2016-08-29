var startTime = 10800;
var timeCount = startTime;
var intentTimeInterval;
var triggerRed = false;
var isRunning = false;
function getGapNumber(data){
  return (data<10)?"0"+data:""+data;
}
function blinkTimer(){
  if(!triggerRed){
    $("#countdown-bg").css("background-color","#f44336");
    triggerRed = true;
  }else{
    $("#countdown-bg").css("background-color","#006d5f");
    triggerRed = false;
  }
}
function getTimeText(){
  var hour = Math.floor(timeCount/3600);
  min = Math.floor(timeCount/60)%60;
  sec = timeCount%60;
  if(timeCount<=0){
    blinkTimer();
  }else{
    timeCount--;
  }
  return getGapNumber(hour)+":"+getGapNumber(min)+":"+getGapNumber(sec);
}
function getStartTimeText(){
  var hour = Math.floor(startTime/3600);
  min = Math.floor(startTime/60)%60;
  sec = startTime%60;
  return getGapNumber(hour)+":"+getGapNumber(min)+":"+getGapNumber(sec);
}
function timeInterval(){
  $("#time").text(getTimeText());
}
function onStart(){
  isRunning = true;
  intentTimeInterval = setInterval(timeInterval,1000)
}
function onStop(){
  isRunning = false;
  clearInterval(intentTimeInterval);
}
function onReset(){
  if(isRunning){
    $("#pause").hide();
    $("#start").show();
  }
  onStop();
  timeCount = startTime;
  $("#time").text(getTimeText());
  $("#countdown-bg").css("background-color","#006d5f");
}
function onPlusOne(){
  timeCount+=60;
  $("#time").text(getTimeText());
  $("#countdown-bg").css("background-color","#006d5f");
}
function onSettings(){
  onReset();
}
function onAddTime(){
  $("#starttime").text(getStartTimeText());
}
$(function() {
  $("#start").click(function(){
    $("#start").hide();
    $("#pause").show();
    onStart();
  });
  $("#pause").click(function(){
    $("#pause").hide();
    $("#start").show();
    onStop();
  });
  $("#plusone").click(function(){
    onPlusOne();
  });
  $("#reset").click(function(){
    onReset();
  });
  $("#settings").click(function(){
    onSettings();
  });
  $("#addHour").click(function(){
    startTime+=3600;
    onAddTime();
  });
  $("#addMin").click(function(){
    startTime+=60;
    onAddTime();
  });
  $("#addSec").click(function(){
    startTime+=1;
    onAddTime();
  });
  $("#removeHour").click(function(){
    startTime=(startTime-3600<0)?0:startTime-3600;
    onAddTime();
  });
  $("#removeMin").click(function(){
    startTime=(startTime-60<0)?0:startTime-60;
    onAddTime();
  });
  $("#removeSec").click(function(){
    startTime=(startTime-1<0)?0:startTime-1;
    onAddTime();
  });
  $("#setSettings").click(function(){
    onSettings();
  });
  $("#time").text(getTimeText());
  $('.modal-trigger').leanModal();
  $("#starttime").text(getStartTimeText());
});
