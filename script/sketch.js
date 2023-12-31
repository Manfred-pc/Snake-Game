var s, scala = 20, food;

//desenhar um quadrado
function setup() {

  createCanvas(1200, 900)
  s = new Snake() //chamar o objeto
  frameRate(10)
  pickLocation(); //criar uma posiçao aleatoria
}


//pintar a cor de fundo do quadrado
function draw() {

  background(51)

  s.death() //funcao de morte
  s.update() //atualizar a posição
  s.show() //mostrar na tela

  if (s.eat(food)) {

    pickLocation();
  }


  fill(255, 0, 100);
  rect(food.x, food.y, scala, scala)
}

function Snake() {


  //declaração da posição
  this.x = 0;
  this.y = 0;

  //declaração da direção da cobrinha
  this.xspeed = 1;
  this.yspeed = 0;


  //array de controle do tamanho
  this.total = 0;
  this.tail = [];



  //funcao de morte da cobrinha
  this.death = function(){

    for(let i = 0; i < this.tail.length; i++){

      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y)


      if(d < 1){

        alert("Você morreu!")
        this.total = 0;
        this.tail = []
        this.x = Math.floor(Math.random() * 599)
        this.y= Math.floor(Math.random() * 599)
      }


    }


  }


  //atualização da posição da cobra
  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scala;
    this.y = this.y + this.yspeed * scala;

    this.x = constrain(this.x, 0, width - scala);
    this.y = constrain(this.y, 0, height - scala);
  };


  // this.update = function () {


  //   if(this.total === this.tail.lenght){

  //     for(var i = 0; i < this.tail.lenght -1; i++){
        
  //       this.tail[i] = this.tail[i+1];
  //     }
  //   }
    
  //     this.tail[this.total -1] = createVector(this.x, this.y)
    
    
  //   //incrementa o array
  //   for(var i = 0; i< this.total-1; i++){

  //     this.tail[i] = this.tail[i+1]
  //   }
  //   this.tail[this.total -1] = createVector(this.x, this.y)
  //   this.x = this.x + this.xspeed * scala;
  //   this.y = this.y + this.yspeed * scala;

  //   this.x = constrain(this.x, 0, width - scala);
  //   this.y = constrain(this.y, 0, height - scala);

  // }

  //mostrar a cobrinha no canvas
  this.show = function () {

  
    fill(255); //definir a cor
    // for(var i = 0; i < this.tail.lenght; i++){
        
    //   this.tail[i] = this.tail[i+1];
    // }


    for(let i = 0;i < this.total; i++){

      rect(this.tail[i].x, this.tail[i].y, scala, scala);

    }
    rect(this.x, this.y, scala, scala)  //desenhar um retângulo
  }

  //metodo interno para o controle 
  this.dir = function (x, y) {

    this.xspeed = x
    this.yspeed = y
  }

  this.eat = function (pos) {

    var d = dist(this.x, this.y, pos.x, pos.y);

    if (d < 1) {


      this.total++;

      return true
    } else {

      return false
    }
  }
}

//funcao que manipula a comida 
function pickLocation() {

  var cols = floor(width / scala);
  var rows = floor(height / scala);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scala); //ocupar um quadrado 
}


//função que manipula a direção da cobrinh
function keyPressed() {

  if (keyCode === UP_ARROW) {

    s.dir(0, -1)
  } else if (keyCode === DOWN_ARROW) {

    s.dir(0, 1)
  } else if (keyCode === LEFT_ARROW) {

    s.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {

    s.dir(1, 0)
  }


}
