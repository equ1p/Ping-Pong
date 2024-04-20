const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const bar1 = {x:10,y:10,width:10,height:50}
const bar2 = {x: width - 20,y:10,width:10,height:50}
const pilka = {x: width / 2,y: height / 2,vx:2,vy:2};
const counter1 = document.querySelector("#counter1")
const counter2 = document.querySelector('#counter2')
let points1 = 0
let points2 = 0

bar1.draw = function() {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height);
};

bar2.draw = function() {
    ctx.fillStyle = "red"
    ctx.fillRect(this.x, this.y, this.width, this.height);
};



pilka.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = "green";
  ctx.arc(this.x, this.y, 10,0, 2 * Math.PI);
  ctx.fill();
};

document.addEventListener('keydown', function(e){
    e.preventDefault();
    if(e.code == "KeyW" && bar1.y >= 0) bar1.y -= 20
    else if(e.code == "KeyS" && bar1.y + bar1.height <= height) bar1.y += 20

  });

document.addEventListener('keydown', function(e){
    e.preventDefault();
    if(e.code == "ArrowUp" && bar2.y >= 0) bar2.y -= 20
    else if(e.code == "ArrowDown" && bar2.y + bar2.height <= height) bar2.y += 20
  });
function reset()
{
    pilka.x = width / 2
    pilka.y = height / 2
}

function restartGame()
{
    reset()
    bar1.y = height / 2
    bar2.y = height / 2
    points1 = 0
    points2 = 0
    counter1.textContent = "Player 1: " + points1
    counter2.textContent = "Player 2: " + points2
}

bar1.draw()
bar2.draw()
pilka.draw()

function update() {
    // czyszczenie planszy
    ctx.clearRect(0,0, canvas.width, canvas.height);

    if (pilka.y + pilka.vy > canvas.height || pilka.y + pilka.vy < 0) {
        pilka.vy = -pilka.vy;
      }

    if (pilka.x + pilka.vx < bar1.x + bar1.width &&  // ball on the canvas
        pilka.x + pilka.vx > bar1.x && // ball touches the bar
        pilka.y > bar1.y && // 
        pilka.y < bar1.y + bar1.height) {
        pilka.vx = -pilka.vx;
    }
    if (pilka.x + pilka.vx > bar2.x && 
        pilka.x + pilka.vx < bar2.x + bar2.width &&
        pilka.y > bar2.y && 
        pilka.y < bar2.y + bar2.height) {
        pilka.vx = -pilka.vx;
    }
    if(pilka.x < 0)
    {
        points2++;
        counter2.textContent = "Player 2: " + points2
        reset()
        pilka.vx = -Math.abs(pilka.vx);

    }
    if(pilka.x > canvas.width)
    {
        points1++;
        counter1.textContent = "Player 1: " + points1
        reset()
    }

    if(points1 == 3)
    {
        window.alert("Player 1 Won")
        restartGame()
    }

    if(points2 == 3)
    {
        window.alert("Player 2 Won")
        restartGame()
    }

    pilka.x += pilka.vx
    pilka.y += pilka.vy

    bar1.draw();
    bar2.draw();
    pilka.draw();
    // włączenie automatycznego odświeżania.
    window.requestAnimationFrame(update);
    // jak funkcja update zostanie wywołana to metoda bar.draw()
    // spowoduje narysowanie deski ponownie z wartoścami x i y uaktualnionym przez
    // obsługę zdarzenie na naciśnięcie klawisza.
}
update()
