'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * Frogger
 * Desenvolvido por Andrey em: 21/12/2017
 */

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.actualStage = 1;
        this.stage();
    }

    _createClass(Game, [{
        key: 'stage',
        value: function stage() {
            this.lines();
        }
    }, {
        key: 'lines',
        value: function lines(quantity) {
            switch (this.actualStage) {
                case 1:
                    var begin = new Line('sidewalk'),
                        line1 = new Line('street'),
                        line2 = new Line('street'),
                        end = new Line('sidewalk');
                    document.getElementById('mainGame').appendChild(begin);
                    document.getElementById('mainGame').appendChild(line1);
                    document.getElementById('mainGame').appendChild(line2);
                    document.getElementById('mainGame').appendChild(end);
                    break;
                case 2:
                    this.lines(8);
                    break;
                case 3:
                    this.lines(12);
                    break;
                case 4:
                    this.lines(16);
            }
        }
    }]);

    return Game;
}();

var Line = function () {
    function Line(type) {
        _classCallCheck(this, Line);

        this.type = type;
        return this.generate();
    }

    _createClass(Line, [{
        key: 'generate',
        value: function generate() {
            switch (this.type) {
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
    }, {
        key: 'templateStreet',
        value: function templateStreet() {
            var streetDiv = document.createElement('div'),
                enemiesArray = ['basic', 'fast', 'slow'],
                directionArray = ['right', 'left'],
                randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
                randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

            streetDiv.setAttribute('class', 'line street');
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
            setInterval(function () {
                new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
            }, 3500);

            return streetDiv;
        }
    }, {
        key: 'templateRiver',
        value: function templateRiver() {
            var riverDiv = document.createElement('div');

            riverDiv.setAttribute('class', 'line river');

            return riverDiv;
        }
    }, {
        key: 'templateSidewalk',
        value: function templateSidewalk() {
            var sidewalkDiv = document.createElement('div');

            sidewalkDiv.setAttribute('class', 'line sidewalk');

            return sidewalkDiv;
        }
    }, {
        key: 'templateGrass',
        value: function templateGrass() {
            var grassDiv = document.createElement('div');

            grassDiv.setAttribute('class', 'line grass');

            return grassDiv;
        }
    }]);

    return Line;
}();

var Enemy = function () {
    function Enemy(type, direction, father) {
        _classCallCheck(this, Enemy);

        this.type = type;
        this.direction = direction;
        this.father = father;
        this.born();
    }

    _createClass(Enemy, [{
        key: 'template',
        value: function template() {
            var enemyImg = document.createElement('img');

            enemyImg.setAttribute('src', 'img/enemy_' + this.type + '.png');
            enemyImg.setAttribute('class', 'enemy ' + this.direction);

            return enemyImg;
        }
    }, {
        key: 'born',
        value: function born() {
            var enemyElement = this.template();
            this.father.appendChild(enemyElement);
            this.move(enemyElement);
        }
    }, {
        key: 'move',
        value: function move(element) {

            var left = 0,
                right = 0;

            if (this.type === 'fast') {
                if (this.direction === 'right') {
                    setInterval(function () {
                        right += 45;
                        element.style.right = right + 'px';
                        if (right > window.innerWidth + 150) {
                            element.remove();
                        }
                    }, 100);
                } else {
                    setInterval(function () {
                        left += 45;
                        element.style.left = left + 'px';
                        if (left > window.innerWidth + 150) {
                            element.remove();
                        }
                    }, 100);
                }
            } else if (this.type === 'slow') {
                if (this.direction === 'right') {
                    setInterval(function () {
                        right += 15;
                        element.style.right = right + 'px';
                        if (right > window.innerWidth + 150) {
                            element.remove();
                        }
                    }, 100);
                } else {
                    setInterval(function () {
                        left += 15;
                        element.style.left = left + 'px';
                        if (left > window.innerWidth + 150) {
                            element.remove();
                        }
                    }, 100);
                }
            } else {
                if (this.direction === 'right') {
                    setInterval(function () {
                        right += 30;
                        element.style.right = right + 'px';
                        if (right > window.innerWidth + 150) {
                            element.remove();
                        }
                    }, 100);
                } else {
                    setInterval(function () {
                        left += 30;
                        element.style.left = left + 'px';
                        if (left > window.innerWidth + 150) {
                            element.remove();
                        }
                    }, 100);
                }
            }
        }
    }]);

    return Enemy;
}();

var Platform = function Platform() {
    _classCallCheck(this, Platform);

    this.direction = 0;
    this.speed = 0;
};

var Character = function () {
    function Character() {
        _classCallCheck(this, Character);

        this.born();
    }

    _createClass(Character, [{
        key: 'template',
        value: function template() {
            var charDiv = document.createElement('div');

            charDiv.setAttribute('class', 'char');

            return charDiv;
        }
    }, {
        key: 'born',
        value: function born() {}
    }]);

    return Character;
}();

new Game();