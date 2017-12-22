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
    constructor(type){
        this.type = type;
        this.generate();
    }

    generate(){
        switch(this.type){
            case 'street':
                this.templateStreet();
                break;
            case 'river':
                this.templateRiver();
                break;
            case 'pavement':
                this.templatePavement();
                break;
            case 'grass':
                this.templateGrass();
        }
    }

    templateStreet(){
        const streetDiv = document.createElement('div');

        streetDiv.setAttribute('class', 'line street');
        streetDiv.appendChild(new Enemy('car'));
    }

    templateRiver(){
        const riverDiv = document.createElement('div');

        riverDiv.setAttribute('class', 'line river');
        riverDiv.appendChild(new Platform());
    }

    templatePavement(){
        const pavementDiv = document.createElement('div');

        pavementDiv.setAttribute('class', 'line pavement');
    }

    templateGrass(){
        const grassDiv = document.createElement('div');

        grassDiv.setAttribute('class', 'line grass');
    }
}

class Enemy{
    constructor(type){
        this.type = type;
        this.direction = 0;
        this.speed = 0;
    }
}

class Platform{
    constructor(){
        this.direction = 0;
        this.speed = 0;
    }
}