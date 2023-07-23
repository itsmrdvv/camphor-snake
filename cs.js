window.addEventListener('keydown', function(e) {
    if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var restartButton = document.getElementById('restartButton');
var gameOverText = document.getElementById('gameOverText');
var scoreElement = document.getElementById('score');
var startText = document.getElementById('startText');
var gameTitle = document.getElementById('gameTitle');
var gameContainer = document.getElementById('gameContainer');

var box = 30;
var snake = [];
snake[0] = { x: 15 * box, y: 10 * box };
var food = {
    x: Math.floor(Math.random() * 30) * box,
    y: Math.floor(Math.random() * 18) * box
};
var d;
var score = 0;
var game;
var countdown = 3;

document.addEventListener('keydown', startGame);
restartButton.addEventListener('click', restart);

function startGame(event) {
    if(event.keyCode == 32) {
        document.removeEventListener('keydown', startGame);
        document.addEventListener('keydown', direction);
        game = setInterval(draw, 100);
        startText.style.display = 'none';
        document.getElementById('startButton').disabled = true;
        document.getElementById('startButton').style.backgroundColor = "gray";
    }
}

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if(event.keyCode == 38 && d != "DOWN") d = "UP";
    else if(event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if(event.keyCode == 40 && d != "UP") d = "DOWN";
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < snake.length; i++) {
        context.fillStyle = 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = '#ef4723';
    context.shadowBlur = 10;
    context.shadowColor = '#ef4723';
    context.fillRect(food.x, food.y, box, box);
    context.shadowBlur = 0; // reset shadow blur

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 30) * box,
            y: Math.floor(Math.random() * 18) * box
        };
        scoreElement.innerText = 'Score: ' + score;
    } else {
        snake.pop();
    }

    var newHead = {
        x: snakeX,
        y: snakeY
    };

    if(snakeX < 0 || snakeX > 29 * box || snakeY < 0 || snakeY > 18 * box || collision(newHead, snake)) {
        clearInterval(game);
        gameContainer.style.animation = 'none';
        gameContainer.style.borderColor = 'red';
        gameOverText.style.display = 'block';
        restartButton.style.display = "block";
        restartButton.style.marginTop = "20px";
    }
    snake.unshift(newHead);
}

function collision(head, array) {
    for(var i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function restart() {
    location.reload();
}

document.getElementById('leftButton').addEventListener('click', function() { d = "LEFT"; });
document.getElementById('upButton').addEventListener('click', function() { d = "UP"; });
document.getElementById('rightButton').addEventListener('click', function() { d = "RIGHT"; });
document.getElementById('downButton').addEventListener('click', function() { d = "DOWN"; });
document.getElementById('startButton').addEventListener('click', function() {
    document.removeEventListener('keydown', startGame);
    document.addEventListener('keydown', direction);
    game = setInterval(draw, 100);
    document.getElementById('mobileStartText').style.display = 'none';
    document.getElementById('startButton').disabled = true;
    document.getElementById('startButton').style.backgroundColor = "gray";
});
