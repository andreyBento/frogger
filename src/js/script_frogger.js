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
        this.character = null;
        this.stage();
    }

    _createClass(Game, [{
        key: 'stage',
        value: function stage() {
            this.character = new Character();
            this.lines();
        }
    }, {
        key: 'lines',
        value: function lines() {
            var line1 = new Line('sidewalk', 1),
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
    }]);

    return Game;
}();

var Line = function () {
    function Line(type, number) {
        _classCallCheck(this, Line);

        this.type = type;
        this.number = number;
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
            var _this = this;

            var streetDiv = document.createElement('div');
            var enemiesArray = ['basic', 'fast', 'slow'],
                directionArray = ['right', 'left'],
                randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
                randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

            streetDiv.setAttribute('class', 'line street');
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv, this);
            setInterval(function () {
                new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], streetDiv, _this);
            }, 2000);

            return streetDiv;
        }
    }, {
        key: 'templateRiver',
        value: function templateRiver() {
            var _this2 = this;

            var riverDiv = document.createElement('div');
            var enemiesArray = ['basic', 'fast', 'slow'],
                directionArray = ['right', 'left'],
                randomEnemy = Math.floor(Math.random() * (enemiesArray.length - 0)) + 0,
                randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

            riverDiv.setAttribute('class', 'line river');
            new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv, this);
            setInterval(function () {
                new Enemy(enemiesArray[randomEnemy], directionArray[randomDirection], riverDiv, _this2);
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
    function Enemy(enemyType, enemyDirection, enemyDiv, father) {
        _classCallCheck(this, Enemy);

        this.enemyType = enemyType;
        this.enemyDirection = enemyDirection;
        this.enemyDiv = enemyDiv;
        this.father = father;
        this.enemyHtml = this.template();
        this.left = 0;
        this.right = 0;
        this.born();
    }

    _createClass(Enemy, [{
        key: 'template',
        value: function template() {
            var enemyImg = document.createElement('img');

            if (this.enemyDiv.classList[1] == 'street') {
                enemyImg.setAttribute('src', 'img/enemy_' + this.enemyType + '.png');
                enemyImg.setAttribute('class', 'enemy ' + this.enemyDirection);
            } else if (this.enemyDiv.classList[1] == 'river') {
                enemyImg.setAttribute('src', 'img/boat_' + this.enemyType + '.png');
                enemyImg.setAttribute('class', 'boat ' + this.enemyDirection);
            }

            return enemyImg;
        }
    }, {
        key: 'born',
        value: function born() {
            this.enemyDiv.appendChild(this.enemyHtml);
            this.move();
        }
    }, {
        key: 'move',
        value: function move() {
            var _this3 = this;

            if (this.enemyDirection === 'right') {
                this.movement = setInterval(function () {

                    if (_this3.enemyDiv.classList[1] == 'street') {
                        if (_this3.enemyType === 'fast') {
                            _this3.right += 30;
                        } else if (_this3.enemyType === 'slow') {
                            _this3.right += 7;
                        } else {
                            _this3.right += 15;
                        }
                    } else if (_this3.enemyDiv.classList[1] == 'river') {
                        if (_this3.enemyType === 'fast') {
                            _this3.right += 15;
                        } else if (_this3.enemyType === 'slow') {
                            _this3.right += 4;
                        } else {
                            _this3.right += 7;
                        }
                    }

                    _this3.enemyHtml.style.right = _this3.right + 'px';
                    _this3.left = _this3.right + _this3.enemyHtml.getBoundingClientRect().width;
                    if (_this3.father.number == game.character.line) {
                        if (_this3.left >= game.character.left && _this3.left <= game.character.right) {
                            console.log('seio');
                            game.character.death();
                        }
                    }

                    if (_this3.right > window.innerWidth + 500) {
                        _this3.destroy();
                    }
                }, 30);
            } else {

                this.movement = setInterval(function () {

                    if (_this3.enemyDiv.classList[1] == 'street') {
                        if (_this3.enemyType === 'fast') {
                            _this3.left += 30;
                        } else if (_this3.enemyType === 'slow') {
                            _this3.left += 7;
                        } else {
                            _this3.left += 15;
                        }
                    } else if (_this3.enemyDiv.classList[1] == 'river') {
                        if (_this3.enemyType === 'fast') {
                            _this3.left += 15;
                        } else if (_this3.enemyType === 'slow') {
                            _this3.left += 4;
                        } else {
                            _this3.left += 7;
                        }
                    }

                    _this3.enemyHtml.style.left = _this3.left + 'px';
                    _this3.right = _this3.left + _this3.enemyHtml.getBoundingClientRect().width;
                    if (_this3.father.number == game.character.line) {
                        if (_this3.right >= game.character.left && _this3.right <= game.character.right) {
                            console.log('seio');
                            game.character.death();
                        }
                    }

                    if (_this3.left > window.innerWidth + 500) {
                        _this3.destroy();
                    }
                }, 30);
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            clearInterval(this.movement);
            this.enemyHtml.remove();
        }
    }]);

    return Enemy;
}();

var Character = function () {
    function Character() {
        _classCallCheck(this, Character);

        this.left = null;
        this.right = null;
        this.line = 1;
        this.char = this.template();
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
        value: function move() {
            var _this4 = this;

            var charBottom = 10,
                charPosition = this.char.getBoundingClientRect(),
                charLeft = charPosition.left;
            document.onkeydown = function () {
                if (event.keyCode == 87) {
                    if (!(window.innerHeight - 80 == charBottom || window.innerHeight - 80 <= charBottom)) {
                        charBottom += 70;
                    }
                    _this4.char.style.bottom = charBottom + 'px';
                    game.character.line++;
                } else if (event.keyCode == 83) {
                    if (!(charBottom == 10 || charBottom <= 10)) {
                        charBottom -= 70;
                    }
                    _this4.char.style.bottom = charBottom + 'px';
                    game.character.line--;
                } else if (event.keyCode == 68) {
                    if (!(window.innerWidth - 80 == charLeft || window.innerWidth - 80 <= charLeft)) {
                        charLeft += 70;
                    }
                    _this4.char.style.left = charLeft + 'px';
                } else if (event.keyCode == 65) {
                    if (!(charLeft == 30 || charLeft <= 30)) {
                        charLeft -= 70;
                    }
                    _this4.char.style.left = charLeft + 'px';
                }
                _this4.left = Math.floor(_this4.char.getBoundingClientRect().left);
                _this4.right = Math.floor(_this4.char.getBoundingClientRect().right);
            };
        }
    }, {
        key: 'born',
        value: function born() {
            document.getElementById('mainGame').appendChild(this.char);
            this.move();
        }
    }, {
        key: 'death',
        value: function death() {
            this.char.remove();
            game.character = new Character();
        }
    }]);

    return Character;
}();

var game = new Game();