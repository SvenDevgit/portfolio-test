//ctx.fillStyle = '#FF0000';
//ctx.fillStyle = '#F38585';
// globals
//var c = document.getElementById('ttt-canvas');
var ctx = document.getElementById('ttt-canvas').getContext('2d');

var board = {
  square1 : { 
   xFrom: 0, 
   yFrom: 0,
   xTo: 150,
   yTo: 150,
   value : null,
   column : 1,
   row : 1,
   color: '#90CCF4', //'#6099B6'
   action: 'click1'
            },
  square2 : { 
   xFrom: 150, 
   yFrom: 0,
   xTo: 280, //300,
   yTo: 150,
   value: null,
   column : 2,
   row : 1,
   color: '#90CCF4',
   action: 'click1' //'#F38585'
            },  
  square3 : { 
   xFrom: 280, //300, 
   yFrom: 0, //0,
   xTo: 450, //450
   yTo: 150,
   value: null,
   column : 3,
   row : 1,
   color: '#52b939',
   action: 'none' //'#F5D452' //'#FF0000'
            },
  square4 : { 
   xFrom: 0, //0, 
   yFrom: 150,
   xTo: 150,
   yTo: 300,
   value: null,
   column : 1,
   row : 2,
   color: '#F5D452',
   action : 'none'
            },  
  square5 : { 
   xFrom: 150, 
   yFrom: 150,
   xTo: 300,
   yTo: 300,
   value: null,
   column : 2,
   row : 2,
   color:  '#F38585',
   action : 'click2'
            },
  square6 : { 
   xFrom: 300, 
   yFrom: 150,
   xTo: 450,
   yTo: 300,
   value: null,
   column : 2,
   row : 3,
   color:  '#F38585',
   action : 'click2'
            },  
  square7 : { 
   xFrom: 0, 
   yFrom: 300,
   xTo: 150,
   yTo: 450,
   value: null,
   row : 3,
   column : 1,
   color: '#6099B6', //'#90CCF4' //'#F38585'
   action : 'click3'
            },
  square8 : { 
   xFrom: 150, 
   yFrom: 300,
   xTo: 320,
   yTo: 450,
   value: null,
   column : 2,
   row : 3,
   color: '#6099B6', //'#90CCF4' //'#F38585'
   action : 'click3'
            },  
  square9 : { 
   xFrom: 320, 
   yFrom: 300,
   xTo: 450, //450,
   yTo: 450, //450,
   value: null,
   column : 3,
   row : 3,
   color: '#3D4F68', //'#F5D452' //'#FF0000'
   action : 'none'
            }

};

var board2 = {
  square1 : { 
   xFrom: 0, 
   yFrom: 0,
   xTo: 648, //450,
   yTo: 450, //450,
   value: null,
   column : 1,
   row : 1,
   color: '#ECECEC' //''#3D4F68' //'#F5D452' //'#FF0000'
            }    
}

var board3 = {
  square1 : { 
   xFrom: 0, 
   yFrom: 0,
   xTo: 98, //450,
   yTo: 450, //450,
   value: null,
   column : 1,
   row : 1,
   color: '#ECECEC' //'#3D4F68' //'#F5D452' //'#FF0000'
            }    
}


$(function(){
	console.log('ready to go');
    // register events
    var page;
    var canvas = document.getElementById('ttt-canvas');
    $('#ttt-canvas').on('click', function(event){
       var mousePos = getMousePos(canvas, event);	
       console.log('x' + mousePos.x + 'y' + mousePos.y)
       //$("span").text('x' + mousePos.x + ', y' + mousePos.y);
       if (mousePos.x > 650 && mousePos.x < 1100){
         doClick(getClickedSquare(mousePos));
       }
    });
    $('.home').on('click', function(event){ 
      page = '.navigation';
      $("html, body").animate({ scrollTop: parseInt( $(page).position().top ) }, 1000);   
    });
    colorCanvasShapes();
    setSquareText();
});

function doClick(square){
  var page;
  if (square.action == 'click1'){
    // go to the portfolio section
    page = '#portfolio-section'
  }
  else if (square.action == 'click3') {
    // go to the anout me section
    page = '#about-me-section';    
  }
  else if(square.action == 'click2'){
    page = '#contact-section';   
  }
  $("html, body").animate({ scrollTop: parseInt( $(page).position().top ) }, 1000); 
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawCircle(square){
  ctx.beginPath();
  ctx.arc(square.xFrom + 75, square.yFrom + 75,60,0,2*Math.PI);
  ctx.stroke();
}

function drawLine(vXf, vYf, vXt, vYt){
  ctx.beginPath(); 
  ctx.moveTo(vXf,vYf);
  ctx.lineTo(vXt,vYt);
  ctx.stroke();
}

function drawSquare(vXf, vYf, vXt, vYt){
  drawLine(vXf, vYf, vXt, vYf);
  drawLine(vXf, vYt, vXt, vYt);
  drawLine(vXf, vYf, vXf, vYt);
  drawLine(vXt, vYf, vXt, vYt);
}

function drawX(square){
  drawLine(square.xFrom, square.yFrom, square.xTo, square.yTo);
  drawLine(square.xFrom, square.yTo, square.xTo, square.yFrom);
}

function drawBoard(){
  for (let prop in board) {
    drawSquare(board[prop].xFrom, board[prop].yFrom, board[prop].xTo, board[prop].yTo);
   }
}

function getClickedSquare(mousePos){
  var square;
  console.log(mousePos.x + mousePos.y);
  mousePos.x = mousePos.x - board2.square1.xTo;
  console.log(mousePos.x + mousePos.y);
  for (let prop in board) {
    if (   board[prop].xFrom < mousePos.x 
        && board[prop].xTo > mousePos.x
        && board[prop].yFrom < mousePos.y
        && board[prop].yTo > mousePos.y){
        square = board[prop];
      }
    }
    return square;
  }

function colorSquare(square, addX, addY){
  ctx.fillStyle = square.color;
  ctx.fillRect(square.xFrom+addX, square.yFrom+addY, square.xTo-square.xFrom , square.yTo-square.yFrom);
}  

function setSquareText(){
  ctx.fillStyle = '#ECECEC';
  ctx.font = '2.5rem Arial';
  ctx.fillText('portfolio',670,110);
  ctx.fillText('about me',800,380);
  ctx.fillText('contact',950,200);
  ctx.font = '7rem Arial';
  ctx.fillStyle = '#C8C8C8' //'#3D4F68';
  ctx.fillText('sven lambeck',0,465);
}

function colorCanvasShapes(){
    var square;
    for (let prop in board) {
      square = board[prop];
      colorSquare(square, 650, 15);
    }
      //
    for (let prop in board2) {
      square = board2[prop];
      colorSquare(square, 0, 15);

    }
    //
    for (let prop in board3) {
      square = board3[prop];
      colorSquare(square, 1102, 15);

    }
}
