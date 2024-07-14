let currentMove = 0;
let currentPiece = 0;


let g;
let img_rook_black,
  img_rook_white,
  img_knight_black,
  img_knight_white,
  img_bishop_black,
  img_bishop_white,
  img_queen_black,
  img_queen_white,
  img_king_black,
  img_king_white,
  img_pawn_black,
  img_pawn_white;

let desk = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

function drawDesk() {
  noStroke();
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      if ((j + i) % 2) {
        fill("black");
      } else {
        fill("white");
      }
      square(i * 50, j * 50, 50);

      img = desk[j][i];
      if (img != 0) {
        // fill("lightblue");
        // circle(i * 50 + 25, j * 50 + 25, 50);
        image(img, i * 50, j * 50, 50, 50);
      }
    }
  }
}

function preload() {
  img_rook_black = loadImage("pieces/rook-black.png");
  img_rook_white = loadImage("pieces/rook-white.png");
  img_knight_black = loadImage("pieces/knight-black.png");
  img_knight_white = loadImage("pieces/knight-white.png");
  img_bishop_black = loadImage("pieces/bishop-black.png");
  img_bishop_white = loadImage("pieces/bishop-white.png");
  img_queen_black = loadImage("pieces/queen-black.png");
  img_queen_white = loadImage("pieces/queen-white.png");
  img_king_black = loadImage("pieces/king-black.png");
  img_king_white = loadImage("pieces/king-white.png");
  img_pawn_black = loadImage("pieces/pawn-black.png");
  img_pawn_white = loadImage("pieces/pawn-white.png");
}

function setup() {
  createCanvas(800, 800);
  scale(2)
  // frameRate(2)
  g = createGraphics(1, 1);
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      if (desk[j][i] == 0) {
        desk[j][i] = g;
      }
    }
  }
  resetDesk()
  drawDesk();
}

function resetDesk() {
  desk = [
    [g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g],
    [g, g, g, g, g, g, g, g],
  ];
  desk[0][0] = img_rook_black;
  desk[0][7] = img_rook_black;
  desk[7][0] = img_rook_white;
  desk[7][7] = img_rook_white;
  desk[0][1] = img_knight_black;
  desk[0][6] = img_knight_black;
  desk[7][1] = img_knight_white;
  desk[7][6] = img_knight_white;
  desk[0][2] = img_bishop_black;
  desk[0][5] = img_bishop_black;
  desk[7][2] = img_bishop_white;
  desk[7][5] = img_bishop_white;
  desk[0][3] = img_queen_black;
  desk[7][3] = img_queen_white;
  desk[0][4] = img_king_black;
  desk[7][4] = img_king_white;
  desk[1][0] = img_pawn_black;
  desk[1][1] = img_pawn_black;
  desk[1][2] = img_pawn_black;
  desk[1][3] = img_pawn_black;
  desk[1][4] = img_pawn_black;
  desk[1][5] = img_pawn_black;
  desk[1][6] = img_pawn_black;
  desk[1][7] = img_pawn_black;
  desk[6][0] = img_pawn_white;
  desk[6][1] = img_pawn_white;
  desk[6][2] = img_pawn_white;
  desk[6][3] = img_pawn_white;
  desk[6][4] = img_pawn_white;
  desk[6][5] = img_pawn_white;
  desk[6][6] = img_pawn_white;
  desk[6][7] = img_pawn_white;
}

function makeMove() {
  let jFrom = moves[currentMove][0][0];
  let iFrom = moves[currentMove][0][1];
  console.log(desk[jFrom][iFrom]);
  currentPiece = desk[jFrom][iFrom];
  let jTo = moves[currentMove][1][0];
  let iTo = moves[currentMove][1][1];
  desk[jTo][iTo] = currentPiece;
  desk[jFrom][iFrom] = g;
  currentMove += 1;

  if (currentMove >= moves.length) {
    resetDesk();
    drawDesk()
    currentMove = 0;
  }
  // console.log(currentMove,moves,moves[currentMove])
}

function draw() {
  scale(2)

  // background(220);
  // currentPiece = moves[0];
  if (frameCount % 50 == 0) {
    makeMove();
  }
  let jFrom = moves[currentMove][0][0];
  let iFrom = moves[currentMove][0][1];
  let jTo = moves[currentMove][1][0];
  let iTo = moves[currentMove][1][1];
  let progress = (frameCount % 50) / 50;
  let j = lerp(jFrom, jTo, progress);
  let i = lerp(iFrom, iTo, progress);

  // let c = moves[currentMove][3];
  fill("blue");

  currentPiece = desk[jFrom][iFrom];
  image(currentPiece, i * 50, j * 50, 50, 50);

  // let fig = moves[currentMove][2];
  // if (fig == "rook") {
  // circle(i * 50 + 25, j * 50 + 25, 50);
  // } else if (fig == "pawn") {
  //   rect(i * 50, j * 50, 50);
  // }
}