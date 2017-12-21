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
        switch(this.actualStage){
            case 1:
                this.lines(4);
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
    lines(quantity){

    }
}

class Lines extends Game{
    constructor(){}

    templateStreet(){
        const streetDiv = document.createElement('div');

        streetDiv.setAttribute('class', 'line street');
        streetDiv.appendChild(new Enemy('car'));
    }
}

class Enemy extends Game{
    constructor(type){
        this.type = type;
    }
}