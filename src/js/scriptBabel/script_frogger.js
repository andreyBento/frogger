/*!
 * Frogger
 * Desenvolvido por Andrey em: 21/12/2017
 */


class Game {
    constructor(){
        this.actualStage = 1;
        this.stage();
    }
    stage(){
        this.lines();
        new Character();
    }
    lines(){
        switch(this.actualStage){
            case 1:
                let begin = new Line('sidewalk'),
                    line1 = new Line('street'),
                    line2 = new Line('street'),
                    end = new Line('sidewalk');

                begin.setAttribute('id', 'begin');
                end.setAttribute('id', 'end');

                document.getElementById('mainGame').appendChild(end);
                document.getElementById('mainGame').appendChild(line2);
                document.getElementById('mainGame').appendChild(line1);
                document.getElementById('mainGame').appendChild(begin);
                break;
            case 2:
                this.lines(8);
                break;
            case 3:
                this.lines(12);
                break;
            case 4 :
                this.lines(16);
        }
    }
}

class Line{
    constructor(type){
        this.type = type;
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
        const streetDiv = document.createElement('div'),
              enemiesArray = ['basic', 'fast', 'slow'],
              directionArray = ['right', 'left'],
              randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
              randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

        streetDiv.setAttribute('class', 'line street');
        new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
        setInterval(function(){
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
        }, 3500);

        return streetDiv;
    }

    templateRiver(){
        const riverDiv = document.createElement('div');

        riverDiv.setAttribute('class', 'line river');

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
    constructor(type, direction, father){
        this.type = type;
        this.direction = direction;
        this.father = father;
        this.born();
    }

    template(){
        const enemyImg = document.createElement('img');

        enemyImg.setAttribute('src', 'img/enemy_' + this.type + '.png');
        enemyImg.setAttribute('class', 'enemy ' + this.direction);

        return enemyImg;
    }

    born(){
        let enemyElement = this.template();
        this.father.appendChild(enemyElement);
        this.move(enemyElement);
    }

    move(element){

        let left = 0,
            right = 0;

        if(this.type === 'fast'){
            if(this.direction === 'right'){
                setInterval(function(){
                    right += 45;
                    element.style.right = right + 'px';
                    if(right > window.innerWidth + 150){
                        element.remove();
                    }
                }, 100);
            } else {
                setInterval(function(){
                    left += 45;
                    element.style.left = left + 'px';
                    if(left > window.innerWidth + 150){
                        element.remove();
                    }
                }, 100);
            }
        } else if(this.type === 'slow'){
            if(this.direction === 'right'){
                setInterval(function(){
                    right += 15;
                    element.style.right = right + 'px';
                    if(right > window.innerWidth + 150){
                        element.remove();
                    }
                }, 100);
            } else {
                setInterval(function(){
                    left += 15;
                    element.style.left = left + 'px';
                    if(left > window.innerWidth + 150){
                        element.remove();
                    }
                }, 100);
            }
        } else {
            if(this.direction === 'right'){
                setInterval(function(){
                    right += 30;
                    element.style.right = right + 'px';
                    if(right > window.innerWidth + 150){
                        element.remove();
                    }
                }, 100);
            } else {
                setInterval(function(){
                    left += 30;
                    element.style.left = left + 'px';
                    if(left > window.innerWidth + 150){
                        element.remove();
                    }
                }, 100);
            }
        }

    }
}

class Platform{
    constructor(){
        this.direction = 0;
        this.speed = 0;
    }
}

class Character {
    constructor(){
        this.born();
    }

    template(){
        const charDiv = document.createElement('div');

        charDiv.setAttribute('class', 'char');

        return charDiv;
    }

    move(char){
        document.onkeydown = function(){
            if(event.keyCode == 38){
                console.log('cima');
            } else if(event.keyCode == 40) {
                console.log('baixo');
            } else if(event.keyCode == 39) {
                console.log('esquerda');
            } else if(event.keyCode == 37) {
                console.log('direita');
            }
        }
    }

    born(){
        let char = this.template();
        document.getElementById('begin').appendChild(char);
        this.move(char);
    }
}


new Game();
