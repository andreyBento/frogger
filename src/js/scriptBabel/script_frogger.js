/*!
 * Frogger
 * Desenvolvido por Andrey em: 21/12/2017
 */


class Game {
    constructor(){
        this.actualStage = 1;
        this.character = null;
        this.stage();
    }
    stage(){
        this.character = new Character();
        this.lines();
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
        let enemiesArray = ['basic', 'fast', 'slow'],
            directionArray = ['right', 'left'],
            randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
            randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

        streetDiv.setAttribute('class', 'line street');
        new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv, this);
        setInterval(() => {
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv, this);
        }, 2000);

        return streetDiv;
    }

    templateRiver(){
        const riverDiv = document.createElement('div');
        let enemiesArray = ['basic', 'fast', 'slow'],
            directionArray = ['right', 'left'],
            randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
            randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

        riverDiv.setAttribute('class', 'line river');
        new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv, this);
        setInterval(() => {
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv, this);
        }, 2000);

        return riverDiv;
    }

    templateSidewalk(){
        const sidewalkDiv = document.createElement('div');

        sidewalkDiv.setAttribute('class', 'line sidewalk');

        return sidewalkDiv;
    }

    templateGrass(){
        const grassDiv = document.createElement('div');

        grassDiv.setAttribute('class', 'line grass');

        return grassDiv;
    }
}

class Enemy{
    constructor(enemyType, enemyDirection, enemyDiv, father){
        this.enemyType = enemyType;
        this.enemyDirection = enemyDirection;
        this.enemyDiv = enemyDiv;
        this.father = father;
        this.enemyHtml = this.template();
        this.left = 0;
        this.right = 0;
        this.born();
    }

    template(){
        const enemyImg = document.createElement('img');

        if(this.enemyDiv.classList[1] == 'street'){
            enemyImg.setAttribute('src', 'img/enemy_' + this.enemyType + '.png');
            enemyImg.setAttribute('class', 'enemy ' + this.enemyDirection);
        } else if(this.enemyDiv.classList[1] == 'river'){
            enemyImg.setAttribute('src', 'img/boat_' + this.enemyType + '.png');
            enemyImg.setAttribute('class', 'boat ' + this.enemyDirection);
        }

        return enemyImg;
    }

    born(){
        this.enemyDiv.appendChild(this.enemyHtml);
        this.move();
    }

    move(){

        if(this.enemyDirection === 'right'){
            this.movement = setInterval(() => {

                if(this.enemyDiv.classList[1] == 'street'){
                    if(this.enemyType === 'fast'){
                        this.right += 30;
                    } else if(this.enemyType === 'slow'){
                        this.right += 7;
                    } else {
                        this.right += 15;
                    }
                } else if(this.enemyDiv.classList[1] == 'river'){
                    if(this.enemyType === 'fast'){
                        this.right += 15;
                    } else if(this.enemyType === 'slow'){
                        this.right += 4;
                    } else {
                        this.right += 7;
                    }
                }

                this.enemyHtml.style.right = this.right + 'px';
                this.left = this.right + this.enemyHtml.getBoundingClientRect().width;
                if(this.father.number == game.character.line){
                    if(this.left >= game.character.left && this.left <= game.character.right){
                        console.log('seio');
                        game.character.death();
                    }
                }

                if(this.right > window.innerWidth + 500){
                    this.destroy();
                }
            }, 30);
        } else {

            this.movement = setInterval(() => {

                if(this.enemyDiv.classList[1] == 'street'){
                    if(this.enemyType === 'fast'){
                        this.left += 30;
                    } else if(this.enemyType === 'slow'){
                        this.left += 7;
                    } else {
                        this.left += 15;
                    }
                } else if(this.enemyDiv.classList[1] == 'river'){
                    if(this.enemyType === 'fast'){
                        this.left += 15;
                    } else if(this.enemyType === 'slow'){
                        this.left += 4;
                    } else {
                        this.left += 7;
                    }
                }

                this.enemyHtml.style.left = this.left + 'px';
                this.right = this.left + this.enemyHtml.getBoundingClientRect().width;
                if(this.father.number == game.character.line){
                    if(this.right >= game.character.left && this.right <= game.character.right){
                        console.log('seio');
                        game.character.death();
                    }
                }

                if(this.left > window.innerWidth + 500){
                    this.destroy();
                }
            }, 30);
        }

    }

    destroy(){
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
                if(!((window.innerHeight - 80) == charBottom || (window.innerHeight - 80) <= charBottom)){
                    charBottom += 70;
                }
                this.char.style.bottom = charBottom + 'px';
                game.character.line++;
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
    }
}


let game = new Game();
