
function playbtn(){
    document.getElementById('score').hidden = false;
    document.getElementById('canvas').hidden = false;
	document.getElementById('page1').hidden = true;
    document.getElementById('retry').hidden = true;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 10;
    
    canvas.width=400;
    canvas.height=400;

    //definition de snake
    let snake = [  
        {x: 10, y: 200},
    ];

    let changing = false;
    let foodX;
    let foodY;
    let dx = 0;
    let dy = 0; 
    let speed = 1;
    let score = 0;

    step();
    createFood();

    function step(){
        if (gameEnd()){
            ctx.fillStyle="white";
            ctx.font="50px Verdana";
            ctx.fillText("Game Over!", canvas.width / 8, canvas.height/2);            
            document.getElementById('retry').hidden = false;
            return;
        } 
        changing = false;
        setTimeout(function onTick(){
            if (gameEnd()) return;
            setCanvas();
            moveSnake();            
            drawSnake();
            drawFood();
            step();
        }, 100/ speed)
    }

    function setCanvas(){
        //resizing
        canvas.height = 400;
        canvas.width = 400;
        ctx.fillRect(0,0, canvas.width, canvas.height);

    }

    function drawSnake(){
        snake.forEach(drawSnakePart);
    }

    function drawSnakePart(snakePart){
        ctx.fillStyle = 'green';
        ctx.strokeStyle  = 'white';
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function moveSnake(){
        //un pas = dx = 10
        //incrementer le coordonnées x de chaque par de snake
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        //ajout tete et change le snake length
        snake.unshift(head);

        const eatenFood = snake[0].x === foodX && snake[0].y === foodY;
        if(eatenFood){
            score += 10;
            document.getElementById("score").innerHTML = "Score "+score;
            createFood();
        }else{
            //sup dernier part de snake => change length arr
            snake.pop();
        }        
    }

    function changeDirection(e){
        const lArrow = 37;
        const uArrow = 38;
        const rArrow = 39;
        const dArrow = 40;

        if(changing)return;
        changing = true;
        const arrowPressed = e.keyCode;
        const up = dy === -10;
        const down = dy === 10;
        const right = dx === 10;
        const left = dx === -10;

        if (arrowPressed === lArrow && !right){
            dx = -10;
            dy = 0;
        }

        
        if (arrowPressed === uArrow && !down){
            dx = 0;
            dy = -10;
        }

        if (arrowPressed === rArrow && !left){
            dx = 10;
            dy = 0;
        }

        if (arrowPressed === dArrow && !up){
            dx = 0;
            dy = 10;
        }        
    }

    function randomFood(min, max){
        return Math.round((Math.random() * (max-min) + min) / 10)*10;
    }

    function createFood(){
        foodX = randomFood(0, canvas.width - 10);
        foodY = randomFood(0, canvas.height - 10);
        snake.forEach(function eat(part){
            const has_eat = part.x == foodX && part.y == foodY;
            if(has_eat) createFood();
            
        });
        
    }

    function drawFood(){
        ctx.fillStyle = 'red';
        //ctx.strokeStyle  = 'white';
        ctx.fillRect(foodX, foodY, 10, 10);
        //ctx.strokeRect(300, 150, 10, 10);

    }

    function gameEnd(){
        for (let i = 4; i < snake.length; i++)
        {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
        }
        const hitLeftWall = snake[0].x <0;  
        const hitRightWall = snake[0].x > 390;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > 390;
        
        return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall      

    }
    

    //document.getElementById("retry").addEventListener("onclick", );

    document.addEventListener("keydown", changeDirection);
   
};
var btn = document.getElementById("retry");
btn.addEventListener("click", playbtn);




