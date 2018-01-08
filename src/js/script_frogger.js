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
        this.lifes = 3;
        this.stage();
    }

    _createClass(Game, [{
        key: 'stage',
        value: function stage() {
            this.character = new Character();
            this.lines();
            document.getElementById('mainGame').appendChild(this.lifeHtml());
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
    }, {
        key: 'addEnemy',
        value: function addEnemy(div) {
            var enemyType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'basic';


            var directionArray = ['right', 'left'],
                randomDirection = Math.floor(Math.random() * (directionArray.length - 0)) + 0;

            div.appendChild(new Enemy(directionArray[randomDirection], div, enemyType));
            setInterval(function () {
                div.appendChild(new Enemy(directionArray[randomDirection], div, enemyType));
            }, 2000);
        }
    }, {
        key: 'lifeHtml',
        value: function lifeHtml() {
            var wrapperLife = document.createElement('div'),
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
    }, {
        key: 'countLife',
        value: function countLife() {
            if (this.lifes === 2) {
                document.getElementById('life1').classList.add('lost');
                document.getElementById('life1').classList.remove('active');
            } else if (this.lifes === 1) {
                document.getElementById('life2').classList.add('lost');
                document.getElementById('life2').classList.remove('active');
            } else if (this.lifes === 0) {
                document.getElementById('life3').classList.add('lost');
                document.getElementById('life3').classList.remove('active');
                this.over();
            }
        }
    }, {
        key: 'over',
        value: function over() {
            this.modal = new Modal('over');
        }
    }, {
        key: 'reset',
        value: function reset() {
            document.getElementById('mainGame').innerHTML = null;
            game = new Game();
        }
    }, {
        key: 'won',
        value: function won() {
            this.modal = new Modal();
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
            var streetDiv = document.createElement('div');

            streetDiv.setAttribute('class', 'line street');
            streetDiv.setAttribute('id', 'line' + this.number);

            return streetDiv;
        }
    }, {
        key: 'templateRiver',
        value: function templateRiver() {
            var riverDiv = document.createElement('div');

            riverDiv.setAttribute('class', 'line river');
            riverDiv.setAttribute('id', 'line' + this.number);

            return riverDiv;
        }
    }, {
        key: 'templateSidewalk',
        value: function templateSidewalk() {
            var sidewalkDiv = document.createElement('div');

            sidewalkDiv.setAttribute('class', 'line sidewalk');
            sidewalkDiv.setAttribute('id', 'line' + this.number);

            return sidewalkDiv;
        }
    }, {
        key: 'templateGrass',
        value: function templateGrass() {
            var grassDiv = document.createElement('div');

            grassDiv.setAttribute('class', 'line grass');
            grassDiv.setAttribute('id', 'line' + this.number);

            return grassDiv;
        }
    }]);

    return Line;
}();

var Enemy = function () {
    function Enemy(enemyDirection, father, type) {
        _classCallCheck(this, Enemy);

        this.enemyDirection = enemyDirection;
        this.father = father;
        this.type = type;
        this.left = -250;
        this.right = -250;
        this.enemyHtml = this.template();
        this.born();
        return this.enemyHtml;
    }

    _createClass(Enemy, [{
        key: 'template',
        value: function template() {
            var enemyImg = document.createElement('img');

            if (this.father.classList[1] == 'street') {
                enemyImg.setAttribute('src', 'img/enemy_' + this.type + '.png');
                enemyImg.setAttribute('class', 'enemy ' + this.enemyDirection);
            } else if (this.father.classList[1] == 'river') {
                enemyImg.setAttribute('src', 'img/boat_' + this.type + '.png');
                enemyImg.setAttribute('class', 'boat ' + this.enemyDirection);
            }

            return enemyImg;
        }
    }, {
        key: 'born',
        value: function born() {
            this.checkSpeed();
            this.move();
        }
    }, {
        key: 'checkSpeed',
        value: function checkSpeed() {
            if (this.father.classList[1] == 'street') {
                if (this.type === 'fast') {
                    return this.speed = 9;
                } else if (this.type === 'slow') {
                    return this.speed = 3;
                } else {
                    return this.speed = 6;
                }
            } else if (this.father.classList[1] == 'river') {
                if (this.type === 'fast') {
                    return this.speed = 6;
                } else if (this.type === 'slow') {
                    return this.speed = 2;
                } else {
                    return this.speed = 4;
                }
            }
        }
    }, {
        key: 'move',
        value: function move() {
            var _this = this;

            if (this.enemyDirection === 'right') {
                this.movement = setInterval(function () {

                    _this.right += _this.speed;
                    _this.enemyHtml.style.right = _this.right + 'px';

                    _this.checkColision(_this.right + _this.enemyHtml.getBoundingClientRect().width - 40);

                    if (_this.right > window.innerWidth + 250) {
                        _this.destroy();
                    }
                }, 15);
            } else {
                this.movement = setInterval(function () {

                    _this.left += _this.speed;
                    _this.enemyHtml.style.left = _this.left + 'px';

                    _this.checkColision(_this.left + _this.enemyHtml.getBoundingClientRect().width);

                    if (_this.left > window.innerWidth + 250) {
                        _this.destroy();
                    }
                }, 15);
            }
        }
    }, {
        key: 'checkColision',
        value: function checkColision(valor) {
            var fatherLine = this.father.getAttribute('id').slice('4');
            if (fatherLine == game.character.line) {
                if (valor >= game.character.left && valor <= game.character.right) {
                    game.character.death();
                }
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.left = 0;
            this.right = 0;
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
            var _this2 = this;

            var charBottom = 10,
                charPosition = this.char.getBoundingClientRect(),
                charLeft = charPosition.left;

            document.onkeydown = function () {
                if (event.keyCode == 87) {
                    if (!(document.getElementById('mainGame').getBoundingClientRect().height - 80 == charBottom || document.getElementById('mainGame').getBoundingClientRect().height - 80 <= charBottom)) {
                        charBottom += 70;
                    }
                    _this2.char.style.bottom = charBottom + 'px';
                    game.character.line++;
                    if (game.character.line === 16) {
                        game.won();
                    }
                } else if (event.keyCode == 83) {
                    if (!(charBottom == 10 || charBottom <= 10)) {
                        charBottom -= 70;
                    }
                    _this2.char.style.bottom = charBottom + 'px';
                    game.character.line--;
                } else if (event.keyCode == 68) {
                    if (!(window.innerWidth - 80 == charLeft || window.innerWidth - 80 <= charLeft)) {
                        charLeft += 70;
                    }
                    _this2.char.style.left = charLeft + 'px';
                } else if (event.keyCode == 65) {
                    if (!(charLeft == 30 || charLeft <= 30)) {
                        charLeft -= 70;
                    }
                    _this2.char.style.left = charLeft + 'px';
                }
                _this2.left = Math.floor(_this2.char.getBoundingClientRect().left);
                _this2.right = Math.floor(_this2.char.getBoundingClientRect().right);
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
            game.lifes--;
            game.countLife();
        }
    }]);

    return Character;
}();

var Modal = function () {
    function Modal() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';

        _classCallCheck(this, Modal);

        this.type = type;
        this.html = this.template();
        this.born();
    }

    _createClass(Modal, [{
        key: 'template',
        value: function template() {
            var divModal = document.createElement('div'),
                close = document.createElement('a'),
                divInner = document.createElement('div'),
                title = document.createElement('h3'),
                text = document.createElement('p'),
                buttonReset = document.createElement('button');

            divModal.setAttribute('class', 'modal');

            close.innerHTML = 'fechar modal';
            close.setAttribute('class', 'btn btn-close');

            title.setAttribute('class', 'modal-title');
            if (this.type === 'over') {
                title.innerHTML = 'Você perdeu! :(';
            } else {
                title.innerHTML = 'Parabéns!!';
            }

            text.setAttribute('class', 'modal-text');
            if (this.type === 'over') {
                text.innerHTML = 'ahahahahahahahahah';
            } else {
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
    }, {
        key: 'overlay',
        value: function overlay() {
            var overlayDiv = document.createElement('div');

            overlayDiv.setAttribute('class', 'overlay');
            overlayDiv.setAttribute('id', 'overlay');

            return overlayDiv;
        }
    }, {
        key: 'born',
        value: function born() {
            document.getElementById('mainGame').appendChild(this.overlay());
            document.getElementById('mainGame').appendChild(this.html);
            this.btnReset();
        }
    }, {
        key: 'btnReset',
        value: function btnReset() {
            var button = document.getElementById('btnReset');

            button.addEventListener('click', function () {
                game.reset();
            });
        }
    }]);

    return Modal;
}();

var game = new Game();