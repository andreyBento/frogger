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
                    line3 = new Line('street'),
                    line4 = new Line('street'),
                    line5 = new Line('river'),
                    line6 = new Line('river'),
                    line7 = new Line('river'),
                    line8 = new Line('river'),
                    line9 = new Line('street'),
                    line10 = new Line('street'),
                    line11 = new Line('street'),
                    line12 = new Line('street'),
                    safe1 = new Line('grass'),
                    safe2 = new Line('grass'),
                    end = new Line('sidewalk');

                begin.setAttribute('id', 'begin');
                end.setAttribute('id', 'end');

                document.getElementById('mainGame').appendChild(end);
                document.getElementById('mainGame').appendChild(line12);
                document.getElementById('mainGame').appendChild(line11);
                document.getElementById('mainGame').appendChild(line10);
                document.getElementById('mainGame').appendChild(line9);
                document.getElementById('mainGame').appendChild(safe2);
                document.getElementById('mainGame').appendChild(line8);
                document.getElementById('mainGame').appendChild(line7);
                document.getElementById('mainGame').appendChild(line6);
                document.getElementById('mainGame').appendChild(line5);
                document.getElementById('mainGame').appendChild(safe1);
                document.getElementById('mainGame').appendChild(line4);
                document.getElementById('mainGame').appendChild(line3);
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
        const streetDiv = document.createElement('div');
        let enemiesArray = ['basic', 'fast', 'slow'],
            directionArray = ['right', 'left'],
            randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
            randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

        streetDiv.setAttribute('class', 'line street');
        new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
        setInterval(function(){
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
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
        new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv);
        setInterval(function(){
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv);
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
    constructor(type, direction, father){
        this.type = type;
        this.direction = direction;
        this.father = father;
        this.born();
    }

    template(){
        const enemyImg = document.createElement('img');

        if(this.father.classList[1] == 'street'){
            enemyImg.setAttribute('src', 'img/enemy_' + this.type + '.png');
            enemyImg.setAttribute('class', 'enemy ' + this.direction);
        } else if(this.father.classList[1] == 'river'){
            enemyImg.setAttribute('src', 'img/boat_' + this.type + '.png');
            enemyImg.setAttribute('class', 'boat ' + this.direction);
        }

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

        if(this.direction === 'right'){
            setInterval(() => {

                if(this.father.classList[1] == 'street'){
                    if(this.type === 'fast'){
                        right += 100;
                    } else if(this.type === 'slow'){
                        right += 40;
                    } else {
                        right += 70;
                    }
                } else if(this.father.classList[1] == 'river'){
                    if(this.type === 'fast'){
                        right += 60;
                    } else if(this.type === 'slow'){
                        right += 15;
                    } else {
                        right += 30;
                    }
                }

                element.style.right = right + 'px';

                if(right > window.innerWidth + 500){
                    element.remove();
                }
            }, 100);
        } else {
            setInterval(() => {

                if(this.father.classList[1] == 'street'){
                    if(this.type === 'fast'){
                        left += 100;
                    } else if(this.type === 'slow'){
                        left += 40;
                    } else {
                        left += 70;
                    }
                } else if(this.father.classList[1] == 'river'){
                    if(this.type === 'fast'){
                        left += 60;
                    } else if(this.type === 'slow'){
                        left += 15;
                    } else {
                        left += 30;
                    }
                }

                element.style.left = left + 'px';

                if(left > window.innerWidth + 500){
                    element.remove();
                }
            }, 100);
        }

    }
}

class Character {
    constructor(){
        this.born();
    }

    template(){
        const charDiv = document.createElement('div');

        charDiv.setAttribute('class', 'char');
        charDiv.setAttribute('id', 'char');

        return charDiv;
    }

    move(char){
        let charBottom = 10;
        let charPosition = char.getBoundingClientRect();
        let charLeft = charPosition.left;
        document.onkeydown = function(){
            if(event.keyCode == 87){
                if(!((window.innerHeight - 80) == charBottom || (window.innerHeight - 80) <= charBottom)){
                    charBottom += 70;
                }
                char.style.bottom = charBottom + 'px';
            } else if(event.keyCode == 83) {
                if(!(charBottom == 10 || charBottom <= 10)){
                    charBottom -= 70;
                }
                char.style.bottom = charBottom + 'px';
            } else if(event.keyCode == 68) {
                if(!((window.innerWidth - 80) == charLeft || (window.innerWidth - 80) <= charLeft)){
                    charLeft += 70;
                }
                char.style.left = charLeft + 'px';
            } else if(event.keyCode == 65) {
                if(!(charLeft == 30 || charLeft <= 30)){
                    charLeft -= 70;
                }
                char.style.left = charLeft + 'px';
            }
        }
    }

    born(){
        let char = this.template();
        document.getElementById('mainGame').appendChild(char);
        this.move(char);
    }
}


new Game();
