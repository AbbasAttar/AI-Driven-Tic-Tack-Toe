let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let human = "o";
let ai = "x";
let currentPlayer = human;
let w, h;

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  // bestMove();
}

function mousePressed() {
  if (currentPlayer == human) {
    //determine location
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    print(i, j);
    //check validity
    if (board[i][j] == "") {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

function draw() {
  background("white");
  strokeWeight(4);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = w * i + w / 2;
      let y = h * j + w / 2;
      let spot = board[i][j];
      if (spot == human) {
        ellipse(x, y, w / 2);
      } else if (spot == ai) {
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
  }
}
