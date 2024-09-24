let down_animation;
let pipes_animation;
let game_over_check;
var game = document.getElementById("game");
var start_game = document.getElementById("start");

const pipes_size = [
    `<div class="pipes" id="1" style="top: 0; left: 500px;">
        <img class="pipe1" src="images/pipe.png" style="height: 200px;">
        <img class="pipe2" src="images/pipe.png" style="height: 200px;">
    </div>`,
    `<div class="pipes" id="2" style="top: 0; left: 500px;">
        <img class="pipe1" src="images/pipe.png" style="height: 100px;">
        <img class="pipe2" src="images/pipe.png" style="height: 300px;">
    </div>`,
    `<div class="pipes" id="3" style="top: 0; left: 500px;">
        <img class="pipe1" src="images/pipe.png" style="height: 300px;">
        <img class="pipe2" src="images/pipe.png" style="height: 100px;">
    </div>`,
    `<div class="pipes" id="4" style="top: 0; left: 500px;">
        <img class="pipe1" src="images/pipe.png" style="height: 200px;">
        <img class="pipe2" src="images/pipe.png" style="height: 200px;">
    </div>`,
    `<div class="pipes" id="5" style="top: 0; left: 500px;">
        <img class="pipe1" src="images/pipe.png" style="height: 50px;">
        <img class="pipe2" src="images/pipe.png" style="height: 350px;">
    </div>`]

function up(id) {
    id_top = parseInt(id.css("top"));
    id_top -= 75;
    id.css("top", id_top + "px");
}

function down(id) {
    id_top = parseInt(id.css("top"));
    id_top += 20;
    id.css("top", id_top + "px");
}

function gravity() {
    down_animation = setInterval(function () {
        down($("#bird"));
    }, 100);
}

function flap() {
    clearInterval(down_animation);
    up($("#bird"));
    gravity();
}

function pipes_move(id) {
    id_left = parseInt(id.css("left"));
    id_left -= 25;
    id.css("left", id_left + "px");
}

function pipes() {
    pipes_animation = setInterval(function () {
        pipes_move($(".pipes"));
    }, 100);
}

function generate_pipes() {
    var random = Math.floor(Math.random() * 4);
    game.innerHTML += pipes_size[random];
}

function update_pipes() {
    if (parseInt($(".pipes").css("left")) < -200) {
        $(".pipes").remove();
        generate_pipes();
    }
}

function charge_CSS() {
    $("#game").css("background-image", "url('images/fondo.webp')");
    $("#game").css("width", "100%");
    $("#game").css("min-height", "100vh");
}

function game_over() {
    game_over_check = setInterval(function () {
        update_pipes();
        if (parseInt($("#bird").css("top")) < 0 || parseInt($("#bird").css("top")) > screen.height - 100) {
            clearInterval(game_over_check);
            alert("Game Over");
            location.reload();
        }
    }, 100);
}

function update() {
    gravity();
    pipes();
    $("body").keydown(function (e) {
        if (e.which === 32) {
            flap();
        }
    });
    game_over();
}

function generate_game() {
    start_game.remove();
    charge_CSS();
    game.innerHTML += `<img id="bird" src="images/f-bird.png">`;
    generate_pipes();
}

function start() {
    $("#start-btn").click(function () {
        generate_game();
        update();
    });
}

$(document).ready(function () {
    start();
});