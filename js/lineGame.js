"use strict"
window.onload = function () {
    let lines = [];
    let linesField = document.querySelector('#lines-field');
    let scoreField = document.querySelector('#score');
    let modalScore = document.querySelector('#modal-score');
    let color = [1, 2, 3, 4, 5];
    let timer;
    let score = 0;
    let speed = 500;
    let flag;
    function init() {
        let x = 13;
        let y = 16;
        for (let i = 0; i < y; i++) {
            lines[i] = [];
            for (let j = 0; j < x; j++) {
                lines[i][j] = 0;
            }
        }
    }
    function playingField() {
        let out = '';
        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] == 0) {
                    out += '<div class="grey"></div>';
                }
                else if (lines[i][j] == 1 || lines[i][j] == 11) {
                    out += '<div class="red"></div>';
                } else if (lines[i][j] == 2 || lines[i][j] == 12) {
                    out += '<div class="orange"></div>';
                } else if (lines[i][j] == 3 || lines[i][j] == 13) {
                    out += '<div class="sea"></div>';
                } else if (lines[i][j] == 4 || lines[i][j] == 14) {
                    out += '<div class="blue"></div>';
                } else if (lines[i][j] == 5 || lines[i][j] == 15) {
                    out += '<div class="green"></div>';
                }
            }
        }
        linesField.innerHTML = out;
        scoreField.innerHTML = score;
        modalScore.innerHTML = score;
    }
    function block() {
        function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
        }
        lines[0][randomInteger(0, 12)] = randomInteger(0, color.length);
    }
    function run() {
        timer = setTimeout(function () {
            if (finish()) return false;
            playingField();
            flag = true;
            for (let i = lines.length - 1; i >= 0; i--) {
                for (let j = 0; j < lines[i].length; j++) {
                    if (lines[i][j] < 10) {
                        if (i == lines.length - 1 && lines[i][j] != 0) {
                            lines[i][j] = lines[i][j] + 10;
                        } else if (lines[i][j] != 0) {
                            if (lines[i + 1][j] == 0) {
                                lines[i + 1][j] = lines[i][j];
                                lines[i][j] = 0;
                                flag = false;
                                if (i + 1 == lines.length - 1) {
                                    lines[i + 1][j] = lines[i + 1][j] + 10;
                                }
                            } else if (lines[i + 1][j] >= 10) {
                                lines[i][j] = lines[i][j] + 10;
                            }
                        }
                    }
                }
            }
            checkLine();
            if (flag) block();
            run();
        }, speed);
    }
    function linesRight() {
        for (let i = lines.length - 1; i >= 0; i--) {
            for (let j = lines[i].length - 1; j >= 0; j--) {
                if (lines[i][j] < 10) {
                    if (lines[i][j] != 0 && lines[i][j + 1] == 0) {
                        lines[i][j + 1] = lines[i][j];
                        lines[i][j] = 0;
                    }
                }
            }
        }
        playingField();
        return false;
    }
    function linesLeft() {
        for (let i = lines.length - 1; i >= 0; i--) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] < 10) {
                    if (lines[i][j] != 0 && lines[i][j - 1] == 0) {
                        lines[i][j - 1] = lines[i][j];
                        lines[i][j] = 0;
                    }
                }
            }
        }
        playingField();
        return false;
    }
    function linesDown() {
        for (let i = lines.length - 1; i >= 0; i--) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] < 10) {
                    if (lines[i][j] != 0 && lines[i + 1][j] == 0) {
                        lines[i + 1][j] = lines[i][j];
                        lines[i][j] = 0;
                    }
                }
            }
        }
        playingField();
        return false;
    }
    function keyS() {
        for (let i = lines.length - 1; i >= 0; i--) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] < 10) {
                    if (lines[i][j] != 0) {
                        lines[i + 1][j] = lines[i][j];
                        lines[i][j] = 0;
                    }
                }
            }
        }
        playingField();
        return false;
    }
    function checkLine() {
        for (let i = lines.length - 1; i >= 0; i--) {
            for (let j = 0; j < lines[i].length; j++) {
                if (lines[i][j] > 10 && lines[i][j + 1] != undefined && lines[i][j + 2] != undefined) {
                    if (lines[i][j] == lines[i][j + 1] && lines[i][j] == lines[i][j + 2] && lines[i][j] == lines[i][j + 3] && lines[i][j] == lines[i][j + 4]) {
                        lines[i][j] = 0;
                        lines[i][j + 1] = 0;
                        lines[i][j + 2] = 0;
                        lines[i][j + 3] = 0;
                        lines[i][j + 4] = 0;
                        score += 10;
                        for (let m = i; m >= 0; m--) {
                            if (lines[m][j] > 10) lines[m][j] = lines[m][j] - 10;
                            if (lines[m][j + 1] > 10) lines[m][j + 1] = lines[m][j + 1] - 10;
                            if (lines[m][j + 2] > 10) lines[m][j + 2] = lines[m][j + 2] - 10;
                            if (lines[m][j + 3] > 10) lines[m][j + 3] = lines[m][j + 3] - 10;
                            if (lines[m][j + 4] > 10) lines[m][j + 4] = lines[m][j + 4] - 10;
                        }
                    }
                    else if (lines[i][j] == lines[i][j + 1] && lines[i][j] == lines[i][j + 2] && lines[i][j] == lines[i][j + 3]) {
                        lines[i][j] = 0;
                        lines[i][j + 1] = 0;
                        lines[i][j + 2] = 0;
                        lines[i][j + 3] = 0;
                        score += 5;
                        for (let m = i; m >= 0; m--) {
                            if (lines[m][j] > 10) lines[m][j] = lines[m][j] - 10;
                            if (lines[m][j + 1] > 10) lines[m][j + 1] = lines[m][j + 1] - 10;
                            if (lines[m][j + 2] > 10) lines[m][j + 2] = lines[m][j + 2] - 10;
                            if (lines[m][j + 3] > 10) lines[m][j + 3] = lines[m][j + 3] - 10;
                        }
                    }
                    else if (lines[i][j] == lines[i][j + 1] && lines[i][j] == lines[i][j + 2]) {
                        lines[i][j] = 0;
                        lines[i][j + 1] = 0;
                        lines[i][j + 2] = 0;
                        score += 1;
                        for (let m = i; m >= 0; m--) {
                            if (lines[m][j] > 10) lines[m][j] = lines[m][j] - 10;
                            if (lines[m][j + 1] > 10) lines[m][j + 1] = lines[m][j + 1] - 10;
                            if (lines[m][j + 2] > 10) lines[m][j + 2] = lines[m][j + 2] - 10;
                        }
                    }
                }
            }
        }
    }
//k perebor wert riadka
    function finish() {
        let stop = false;
        for (let i = lines.length - 1; i >= 0; i--) {
            for (let j = 0; j < lines[i].length; j++) {
                stop = true;
                for (let k = 0; k < lines.length; k++) {
                    if (lines[k][j] == 0) {
                        stop = false;
                        break;
                    }
                }
                if (stop) {
                    clearTimeout(timer);
                    modal.style.display = "block";
                    break;
                }
            }
            if (stop) break;
        }
        return stop;
    }
    document.querySelector('#run').onclick = function(){
        init();
        run();
    }
    document.onkeydown = function (event) {
        switch (event.code) {
            case "ArrowRight":
                linesRight();
                break;
            case "ArrowLeft":
                linesLeft();
                break;
            case "ArrowDown":
                linesDown();
                break;
            case "KeyS":
                keyS();
                break;    
        }
        return false;
    }
}
