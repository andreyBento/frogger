/*!
 * Frogger
 * Desenvolvido por Andrey em: 21/12/2017
 */


class Game {
    constructor(){
        this.actualStage = 1;
        this.character = null;
        this.lifes = 3;
        this.stage();
    }
    stage(){
        this.character = new Character();
        this.lines();
        document.getElementById('mainGame').appendChild(this.lifeHtml());
    }
    lines(){
        let line1 = new Line('sidewalk', 1),
            line2 = new Line('street', 2),
            line3 = new Line('street', 3),
            line4 = new Line('street', 4),
            line5 = new Line('street', 5),
            line6 = new Line('grass', 6),
            line7 = new Line('river', 7),
            line8 = new Line('river', 8),
            line9 = new Line('river', 9),
            line10 = new Line('river', 10),
            line11 = new Line('grass', 11),
            line12 = new Line('street', 12),
            line13 = new Line('street', 13),
            line14 = new Line('street', 14),
            line15 = new Line('street', 15),
            line16 = new Line('sidewalk', 16);

        line1.setAttribute('id', 'begin');
        line16.setAttribute('id', 'end');

        this.addEnemy(line2, 'slow');
        this.addEnemy(line3);
        this.addEnemy(line4, 'fast');
        this.addEnemy(line5, 'slow');

        this.addEnemy(line7, 'fast');
        this.addEnemy(line8);
        this.addEnemy(line9, 'slow');
        this.addEnemy(line10);

        this.addEnemy(line12);
        this.addEnemy(line13, 'slow');
        this.addEnemy(line14, 'fast');
        this.addEnemy(line15);

        document.getElementById('mainGame').appendChild(line16);
        document.getElementById('mainGame').appendChild(line15);
        document.getElementById('mainGame').appendChild(line14);
        document.getElementById('mainGame').appendChild(line13);
        document.getElementById('mainGame').appendChild(line12);
        document.getElementById('mainGame').appendChild(line11);
        document.getElementById('mainGame').appendChild(line10);
        document.getElementById('mainGame').appendChild(line9);
        document.getElementById('mainGame').appendChild(line8);
        document.getElementById('mainGame').appendChild(line7);
        document.getElementById('mainGame').appendChild(line6);
        document.getElementById('mainGame').appendChild(line5);
        document.getElementById('mainGame').appendChild(line4);
        document.getElementById('mainGame').appendChild(line3);
        document.getElementById('mainGame').appendChild(line2);
        document.getElementById('mainGame').appendChild(line1);
    }
    addEnemy(div, enemyType = 'basic'){

        const directionArray = ['right', 'left'],
              randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

        div.appendChild(new Enemy(directionArray[randomDirection], div, enemyType));
        setInterval(() => {
            div.appendChild(new Enemy(directionArray[randomDirection], div, enemyType));
        }, 2000);

    }
    lifeHtml(){
        const wrapperLife = document.createElement('div'),
              divLife1 = document.createElement('div'),
              divLife2 = document.createElement('div'),
              divLife3 = document.createElement('div');

        divLife1.setAttribute('class', 'heart active');
        divLife1.setAttribute('id', 'life1');

        divLife2.setAttribute('class', 'heart active');
        divLife2.setAttribute('id', 'life2');

        divLife3.setAttribute('class', 'heart active');
        divLife3.setAttribute('id', 'life3');

        wrapperLife.setAttribute('class', 'lifes');

        wrapperLife.appendChild(divLife1);
        wrapperLife.appendChild(divLife2);
        wrapperLife.appendChild(divLife3);

        return wrapperLife;
    }
    countLife(){
        if(this.lifes === 2){
            document.getElementById('life1').classList.add('lost');
            document.getElementById('life1').classList.remove('active');
        } else if(this.lifes === 1){
            document.getElementById('life2').classList.add('lost');
            document.getElementById('life2').classList.remove('active');
        } else if(this.lifes === 0){
            document.getElementById('life3').classList.add('lost');
            document.getElementById('life3').classList.remove('active');
            this.over();
        }
    }
    over(){
        this.modal = new Modal('over');
    }
    reset(){
        document.getElementById('mainGame').innerHTML = null;
        game = new Game();
    }
    won(){
        this.modal = new Modal();
    }
}

class Line{
    constructor(type, number){
        this.type = type;
        this.number = number;
        return this.generate();
    }

    generate(){
        switch(this.type){
            case 'street':
                return this.templateStreet();
                break;
            case 'river':
                return this.templateRiver();
                break;
            case 'sidewalk':
                return this.templateSidewalk();
                break;
            case 'grass':
                return this.templateGrass();
        }
    }

    templateStreet(){
        const streetDiv = document.createElement('div');

        streetDiv.setAttribute('class', 'line street');
        streetDiv.setAttribute('id', 'line' + this.number);

        return streetDiv;
    }

    templateRiver(){
        const riverDiv = document.createElement('div');

        riverDiv.setAttribute('class', 'line river');
        riverDiv.setAttribute('id', 'line' + this.number);

        return riverDiv;
    }

    templateSidewalk(){
        const sidewalkDiv = document.createElement('div');

        sidewalkDiv.setAttribute('class', 'line sidewalk');
        sidewalkDiv.setAttribute('id', 'line' + this.number);

        return sidewalkDiv;
    }

    templateGrass(){
        const grassDiv = document.createElement('div');

        grassDiv.setAttribute('class', 'line grass');
        grassDiv.setAttribute('id', 'line' + this.number);

        return grassDiv;
    }
}

class Enemy{
    constructor(enemyDirection, father, type){
        this.enemyDirection = enemyDirection;
        this.father = father;
        this.type = type;
        this.left = -250;
        this.right = -250;
        this.enemyHtml = this.template();
        this.born();
        return this.enemyHtml;
    }

    template(){
        const enemyImg = document.createElement('img');

        if(this.father.classList[1] == 'street'){
            enemyImg.setAttribute('src', 'img/enemy_' + this.type + '.png');
            enemyImg.setAttribute('class', 'enemy ' + this.enemyDirection);
        } else if(this.father.classList[1] == 'river'){
            enemyImg.setAttribute('src', 'img/boat_' + this.type + '.png');
            enemyImg.setAttribute('class', 'boat ' + this.enemyDirection);
        }

        return enemyImg;
    }

    born(){
        this.checkSpeed();
        this.move();
    }

    checkSpeed(){
        if(this.father.classList[1] == 'street'){
            if(this.type === 'fast'){
                return this.speed = 9;
            } else if(this.type === 'slow'){
                return this.speed = 3;
            } else {
                return this.speed = 6;
            }
        } else if(this.father.classList[1] == 'river'){
            if(this.type === 'fast'){
                return this.speed = 6;
            } else if(this.type === 'slow'){
                return this.speed = 2;
            } else {
                return this.speed = 4;
            }
        }
    }

    move(){

        if(this.enemyDirection === 'right'){
            this.movement = setInterval(() => {

                this.right += this.speed;
                this.enemyHtml.style.right = this.right + 'px';

                this.checkColision(this.right + this.enemyHtml.getBoundingClientRect().width - 40);

                if(this.right > window.innerWidth + 250){
                    this.destroy();
                }

            }, 15);
        } else {
            this.movement = setInterval(() => {

                this.left += this.speed;
                this.enemyHtml.style.left = this.left + 'px';

                this.checkColision(this.left + this.enemyHtml.getBoundingClientRect().width);

                if(this.left > window.innerWidth + 250){
                    this.destroy();
                }

            }, 15);
        }

    }

    checkColision(valor){
        let fatherLine = this.father.getAttribute('id').slice('4');
        if(fatherLine == game.character.line){
            if(valor >= game.character.left && valor <= game.character.right){
                game.character.death();
            }
        }
    }

    destroy(){
        this.left = 0;
        this.right = 0;
        clearInterval(this.movement);
        this.enemyHtml.remove();
    }
}

class Character {
    constructor(){
        this.left = null;
        this.right = null;
        this.line = 1;
        this.char = this.template();
        this.born();
    }

    template(){
        const charDiv = document.createElement('div');

        charDiv.setAttribute('class', 'char');
        charDiv.setAttribute('id', 'char');

        return charDiv;
    }

    move(){
        let charBottom = 10,
            charPosition = this.char.getBoundingClientRect(),
            charLeft = charPosition.left;

        document.onkeydown = () => {
            if(event.keyCode == 87){
                if(!((document.getElementById('mainGame').getBoundingClientRect().height - 80) == charBottom || (document.getElementById('mainGame').getBoundingClientRect().height - 80) <= charBottom)){
                    charBottom += 70;
                }
                this.char.style.bottom = charBottom + 'px';
                game.character.line++;
                if(game.character.line === 16){
                    game.won();
                }
            } else if(event.keyCode == 83) {
                if(!(charBottom == 10 || charBottom <= 10)){
                    charBottom -= 70;
                }
                this.char.style.bottom = charBottom + 'px';
                game.character.line--;
            } else if(event.keyCode == 68) {
                if(!((window.innerWidth - 80) == charLeft || (window.innerWidth - 80) <= charLeft)){
                    charLeft += 70;
                }
                this.char.style.left = charLeft + 'px';
            } else if(event.keyCode == 65) {
                if(!(charLeft == 30 || charLeft <= 30)){
                    charLeft -= 70;
                }
                this.char.style.left = charLeft + 'px';
            }
            this.left = Math.floor(this.char.getBoundingClientRect().left);
            this.right = Math.floor(this.char.getBoundingClientRect().right);
        }
    }

    born(){
        document.getElementById('mainGame').appendChild(this.char);
        this.move();
    }

    death(){
        this.char.remove();
        game.character = new Character();
        game.lifes--;
        game.countLife();
    }
}

class Modal{
    constructor(type = 'success'){
        this.type = type;
        this.html = this.template();
        this.born();
    }

    template(){
        const divModal = document.createElement('div'),
              close = document.createElement('a'),
              divInner = document.createElement('div'),
              title = document.createElement('h3'),
              text = document.createElement('p'),
              buttonReset = document.createElement('button');

        divModal.setAttribute('class', 'modal');

        close.innerHTML = 'fechar modal';
        close.setAttribute('class', 'btn btn-close');

        title.setAttribute('class', 'modal-title');
        if(this.type === 'over'){
            title.innerHTML = 'Você perdeu! :(';
        } else{
            title.innerHTML = 'Parabéns!!';
        }

        text.setAttribute('class', 'modal-text');
        if(this.type === 'over'){
            text.innerHTML = 'ahahahahahahahahah';
        } else{
            text.innerHTML = 'Você ganhou um incrível, foda-se.';
        }

        buttonReset.setAttribute('class', 'btn btn-reset');
        buttonReset.setAttribute('id', 'btnReset');
        buttonReset.innerHTML = 'Jogar novamente';

        divInner.setAttribute('class', 'modal-content');

        divInner.appendChild(title);
        divInner.appendChild(text);
        divInner.appendChild(buttonReset);

        divModal.appendChild(close);
        divModal.appendChild(divInner);

        return divModal;
    }

    overlay(){
        const overlayDiv = document.createElement('div');

        overlayDiv.setAttribute('class', 'overlay');
        overlayDiv.setAttribute('id', 'overlay');

        return overlayDiv;
    }

    born(){
        document.getElementById('mainGame').appendChild(this.overlay());
        document.getElementById('mainGame').appendChild(this.html);
        this.btnReset();
    }

    btnReset(){
        let button = document.getElementById('btnReset');

        button.addEventListener('click', function(){
            game.reset();
        });
    }

}

let game = new Game();
