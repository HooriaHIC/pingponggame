
var canvas;
var ctx;
var ballX = 30;
var ballSpeedX = 2.5;
var ballY = 288;
var ballSpeedY = 1;
var paddle1Y = 250;
const paddleHeight = 95;
var paddle2Y = 250;
var player1score = 0;
var player2score = 0;
const winScore = 6;
var showWinScreen = false;


function calcMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function handleClick(evt) {
    if (evt.keyCode == 13) {
        if (showWinScreen) {
            player1score = 0;
            player2score = 0;
            showWinScreen = false;
        }
    }
}

function handleDraw(evt) {
    if (evt.keyCode == 13) {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        var fps = 125;
        setInterval(function () {
            move();
            draw();
        }, 1000 / fps);

        document.addEventListener('keydown', handleClick);

        canvas.addEventListener('mousemove',
            function (evt) {
                var mousePos = calcMousePos(evt);
                paddle1Y = mousePos.y - (paddleHeight / 2);
            });
    }
}

window.onload = function () {
    document.addEventListener('keydown', handleDraw);
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.font = "60px Arial";
    ctx.fillStyle = '#f6921d';
    ctx.fillText("Press Enter to start", 100, 250);
}

function resetBall() {
    if (player1score >= winScore || player2score >= winScore) {
        showWinScreen = true;
    }
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function compMove() {
    var paddle2YCenter = paddle2Y + (paddleHeight / 2);
    if (paddle2YCenter < ballY - 15) {
        paddle2Y += 3;
    }
    else if (paddle2YCenter > ballY + 15) {
        paddle2Y -= 3;
    }
}

function move() {
    if (showWinScreen) {
        return;
    }
    compMove();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX > canvas.width - 19.5) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.15;
        }
        else {
            player1score++;
            resetBall();
        }
    }
    if ((ballY < 7.5 || ballY > canvas.height - 7.5)) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX < 19.5) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y + paddleHeight / 2);
            ballSpeedY = deltaY * 0.2;
        }
        else {
            player2score++;
            resetBall();
        }
    }
}

function draw() {
    colorShape(0, 0, canvas.width, canvas.height, '#222');
    if (showWinScreen) {
        ctx.font = '35px Verdana';
        if (player1score >= winScore) {
            ctx.fillStyle = '#fff';
            ctx.fillText("OMG, YOU WON!!!", 230, 280);
        }
        else if (player2score >= winScore) {
            ctx.fillStyle = '#fff';
            ctx.fillText("Computer beat you again :(", 150, 280);
        }
        ctx.fillStyle = '#f6921d';
        ctx.fillText("Enter to continue", 200, 325)
        return;
    }

    Net();

    colorShape(2, paddle1Y, 10, paddleHeight, '#fff');
    colorShape(canvas.width - 12, paddle2Y, 10, paddleHeight, '#fff');
    ctx.fillStyle = '#58f';
    ctx.beginPath();
    var radius = 7.5;
    colCircle(ballX, ballY, radius, '#f6921d');
    ctx.fillStyle = '#f33f12';
    ctx.font = '30px Helvetica'
    ctx.fillText(player1score, 100, 100);
    ctx.fillText(player2score, canvas.width - 100, 100);
}

function Net() {
    for (var i = 0; i < canvas.height; i += 40) {
        colorShape(canvas.width / 2 - 1, i, 2, 20, '#fff');
    }
}

function colCircle(centerX, centerY, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

function colorShape(posX, posY, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(posX, posY, width, height);
} 