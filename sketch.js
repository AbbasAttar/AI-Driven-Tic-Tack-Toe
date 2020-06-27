let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let player = ["o", "x"];
let available = [];
let currentPlayer;
function setup() {
  createCanvas(400, 400);
  currentPlayer = floor(random(player.length));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      available.push([i, j]);
    }
  }
}

function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = player[currentPlayer];

  currentPlayer = (currentPlayer + 1) % player.length;
}

function draw() {
  background("white");
  let w = width / 3;
  let h = height / 3;
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = w * i + w / 2;
      let y = h * j + w / 2;
      let spot = board[i][j];

      strokeWeight(4);
      if (spot == player[0]) {
        ellipse(x, y, w / 2);
      } else if (spot == player[1]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
    }
  }
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("font-size", "32pt");
    if (result == "tie") {
      resultP.html("Tie!");
    } else {
      resultP.html(`${result} wins!`);
    }
  } else {
    nextTurn();
  }
}
