"use strict";

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
        key: "stage",
        value: function stage() {
            switch (this.actualStage) {
                case 1:
                    this.lines(4);
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