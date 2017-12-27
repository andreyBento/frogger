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
            new Character();
        }
    }, {
        key: 'lines',
        value: function lines() {
            switch (this.actualStage) {
                case 1:
                    var begin = new Line('sidewalk'),
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
            var streetDiv = document.createElement('div');
            var enemiesArray = ['basic', 'fast', 'slow'],
                directionArray = ['right', 'left'],
                randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
                randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

            streetDiv.setAttribute('class', 'line street');
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
            setInterval(function () {
                new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv);
            }, 2000);

            return streetDiv;
        }
    }, {
        key: 'templateRiver',
        value: function templateRiver() {
            var riverDiv = document.createElement('div');
            var enemiesArray = ['basic', 'fast', 'slow'],
                directionArray = ['right', 'left'],
                randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
                randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

            riverDiv.setAttribute('class', 'line river');
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv);
            setInterval(function () {
                new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv);
            }, 2000);

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

            if (this.father.classList[1] == 'street') {
                enemyImg.setAttribute('src', 'img/enemy_' + this.type + '.png');
                enemyImg.setAttribute('class', 'enemy ' + this.direction);
            } else if (this.father.classList[1] == 'river') {
                enemyImg.setAttribute('src', 'img/boat_' + this.type + '.png');
                enemyImg.setAttribute('class', 'boat ' + this.direction);
            }

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
            var _this = this;

            var left = 0,
                right = 0;

            if (this.direction === 'right') {
                setInterval(function () {

                    if (_this.father.classList[1] == 'street') {
                        if (_this.type === 'fast') {
                            right += 100;
                        } else if (_this.type === 'slow') {
                            right += 40;
                        } else {
                            right += 70;
                        }
                    } else if (_this.father.classList[1] == 'river') {
                        if (_this.type === 'fast') {
                            right += 60;
                        } else if (_this.type === 'slow') {
                            right += 15;
                        } else {
                            right += 30;
                        }
                    }

                    element.style.right = right + 'px';

                    if (right > window.innerWidth + 500) {
                        element.remove();
                    }
                }, 100);
            } else {
                setInterval(function () {

                    if (_this.father.classList[1] == 'street') {
                        if (_this.type === 'fast') {
                            left += 100;
                        } else if (_this.type === 'slow') {
                            left += 40;
                        } else {
                            left += 70;
                        }
                    } else if (_this.father.classList[1] == 'river') {
                        if (_this.type === 'fast') {
                            left += 60;
                        } else if (_this.type === 'slow') {
                            left += 15;
                        } else {
                            left += 30;
                        }
                    }

                    element.style.left = left + 'px';

                    if (left > window.innerWidth + 500) {
                        element.remove();
                    }
                }, 100);
            }
        }
    }]);

    return Enemy;
}();

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
            charDiv.setAttribute('id', 'char');

            return charDiv;
        }
    }, {
        key: 'move',
        value: function move(char) {
            var charBottom = 10;
            var charPosition = char.getBoundingClientRect();
            var charLeft = charPosition.left;
            document.onkeydown = function () {
                if (event.keyCode == 87) {
                    if (!(window.innerHeight - 80 == charBottom || window.innerHeight - 80 <= charBottom)) {
                        charBottom += 70;
                    }
                    char.style.bottom = charBottom + 'px';
                } else if (event.keyCode == 83) {
                    if (!(charBottom == 10 || charBottom <= 10)) {
                        charBottom -= 70;
                    }
                    char.style.bottom = charBottom + 'px';
                } else if (event.keyCode == 68) {
                    if (!(window.innerWidth - 80 == charLeft || window.innerWidth - 80 <= charLeft)) {
                        charLeft += 70;
                    }
                    char.style.left = charLeft + 'px';
                } else if (event.keyCode == 65) {
                    if (!(charLeft == 30 || charLeft <= 30)) {
                        charLeft -= 70;
                    }
                    char.style.left = charLeft + 'px';
                }
            };
        }
    }, {
        key: 'born',
        value: function born() {
            var char = this.template();
            document.getElementById('mainGame').appendChild(char);
            this.move(char);
        }
    }]);

    return Character;
}();

new Game();