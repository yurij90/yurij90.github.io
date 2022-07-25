var animation; // egy elem mozgás animálása szál
var shakeProgress = false; // keverés zajlik
var shakeInterval = 0; // keverési lépés szám
var lastMixed = null; // utoljára kevert id
var clickReady = null; // klikkelhetünk-e
var border = 20;
var divIdTag = "box";
var matrixSize = 4;
var xmax = matrixSize * 150;
var ymax = matrixSize * 150;
var reqAnimationId = -1;  // keverési anim hívó id
var animProgress = false; // keverési anim fut-e
// ellenörzéshez, kirakott-e a kép
const xyBase = Array.from(Array(matrixSize), () => new Array(matrixSize)); 

// mátrix alaphelyzetbe, ez az ujrakeberéshez kell
function xyBaseClear() {
    for (let horizontal = 0; horizontal < matrixSize; horizontal++) {
        for (let vertical = 0; vertical < matrixSize; vertical++) {
            xyBase[horizontal][vertical] = false;
        }
    }
}
// remove all element from board
function clearBoard() {
    while (document.getElementById("piecesBoard").children.length > 0) {
        document.getElementById("piecesBoard").removeChild(div.lastChild);
    }
}
// start
function start() {
    if (clickReady!=null && !clickReady) return;
    if (animation != null) clearInterval(animation);
    clickReady = false;
    clearBoard();
    document.getElementById("fieldBorder").setAttribute("style", " border: " + border + "px solid #414106;");
    div = document.getElementById("piecesBoard");
    div.style.width = "600px";
    div.style.height = "600px";
    div.className = "field";
    div.offsetLeft = 0 + "px";
    div.offsetLeft = 0 + "px";
    for (let horizontal = 0; horizontal < matrixSize; horizontal++) {
        for (let vertical = 0; vertical < matrixSize; vertical++) {
            let piece = document.createElement('div');
            piece.addEventListener("click", onClickBox2); // klick esemény hozzáadása a kép darabkához
            makeDiv(piece, horizontal, vertical);
            // elmentjük az alap koordinátákat , a keveréshez segédnek
            xyBase[horizontal][vertical] = false;
            // xyBase = piece.offsetTop;
            div.appendChild(piece);
        }
    }
    // első , bal felső elemet töröljük, az ő helye lesz a játéktér
    document.getElementById("piecesBoard").removeChild(div.firstElementChild);
    clickReady = true;
}
// keverni a képet, nem animált
function shakeItOld() {
    if (clickReady == null || !clickReady) return;
    clickReady = false;
    let pieces = document.getElementById("piecesBoard").children;
    for (let index = 0; index < pieces.length;) {
        // document.getElementById("piecesBoard").removeChild(div.lastChild);
        piece = pieces[index];
        piece = document.getElementById(piece.id);
        let ax;
        let ay;
        ax = Math.floor(Math.random() * matrixSize); // random 0-3
        ay = Math.floor(Math.random() * matrixSize); // random 0-3
        if (!xyBase[ax][ay]) {
            piece.style.left = (ax * 150) + 'px';
            piece.style.top = (ay * 150) + 'px';
            xyBase[ax][ay] = true;
            index++;
        }
    }
    xyBaseClear();
    clickReady = true;
}
// onclick animált keverés
function reShakeIt() {
    let ax = 0;
    let ay = 0;
    let div = null;
    while (div == null) {
        ax = Math.floor(Math.random() * matrixSize); // random 0-3
        ay = Math.floor(Math.random() * matrixSize); // random 0-3   
        div = document.getElementById("box" + ax + "-" + ay);
    }
    if (!animProgress && lastMixed != div.id) { moveIt(div.offsetLeft, div.offsetTop); }

    reqAnimationId = requestAnimationFrame(function () { // call requestAnimationFrame again with parameters  
        reShakeIt();
    });
}
// kavarni a képet
function shakeIt() {
    if (clickReady == null || !clickReady) return;
    document.getElementById("shakeIt").disabled = true;
    if (!shakeProgress) {
        shakeInterval = 50 + Math.floor(Math.random() * 50); // random 0-50 + 50
    }
    clickReady = false;// click esemény figyelmenkívül hagyás
    shakeProgress = true;
    animProgress = false;
    reShakeIt();
}
// elenörizni , hogy helyére kerültek e
function checkItOut() {
    let pieces = document.getElementById("piecesBoard").children;
    let ret = true;
    for (let index = 0; index < pieces.length; index++) {
        piece = pieces[index];
        let str = piece.id.replace(divIdTag, '');
        let xy = str.split('-');
        ret = ret && (xy[0] * 150 == piece.offsetLeft && xy[1] * 150 == piece.offsetTop);
    }
    return ret;
}
// képkocka kreálása
function makeDiv(piece, horizontal, vertical) {
    piece.style.backgroundImage = "url('./happy-face-600x600.jpg')";
    piece.id = 'box' + horizontal + '-' + vertical;
    piece.style.width = "150px";
    piece.style.height = "150px";
    piece.className = divIdTag;
    var str = "-" + (horizontal * 150) + "px " + (-vertical * 150) + "px"

    piece.style.backgroundPosition = str;
    piece.style.left = (horizontal * 150) + "px";
    piece.style.top = (vertical * 150) + 'px';
    piece.style.backgroundRepeat = "no-repeat, no-repeat";

}
// onclick a diveken kisképeken
function onClickBox2(event) {
    if (!clickReady || shakeProgress) return;
    let str = event.target.id.replace(divIdTag, '');
    let xy = str.split('-');
    let div = document.getElementById(event.target.id);
    moveIt(div.offsetLeft, div.offsetTop);

}
// elmozgatás animálással
function moveIt(x, y) {
    let isBox = false;
    let element = isThereAnyOn(x, y);

    if (element == null || element == false) {
        if (shakeProgress) animProgress = false;;
        return;
    }
    let div = document.getElementById(element.id);
    if (div != null) {
        if (!checkCanMoveAndDoIt(div, div.offsetLeft, div.offsetTop)) {
            if (shakeProgress) animProgress = false;
        }

    }
}
// ellenörzi és ha tudja elmozgatja
function checkCanMoveAndDoIt(div, left, top) {
    let moved = false;
    for (let a = 0; a < 4 && !moved; a++) {
        let newLeft = -1;
        let newTop = -1;
        switch (a) {
            case 0:
                newLeft = left - 150;
                newTop = top;
                break
            case 1:
                newLeft = left + 150;
                newTop = top;
                break
            case 2:
                newLeft = left;
                newTop = top + 150;
                break
            case 3:
                newLeft = left;
                newTop = top - 150;
                break
        }
        let ok = isThereAnyOn(newLeft, newTop);
        if (ok == null) {
            moved = true;
            if (shakeProgress) animProgress = true;
            var step = 1;
            var horizontal = false;
            if (top == newTop) {
                horizontal = true;
            } else {
                if (top > newTop) step = -1;
                else step = 1;
            }
            if (left == newLeft) {
                horizontal = false;
            } else {
                if (left > newLeft) step = -1;
                else step = 1;
            }
            var newPos = newTop;
            var pos = top;
            if (horizontal) {
                pos = left;
                newPos = newLeft;
            }
            clickReady = false; // nem lesz clickelhető animáció ideje alatt
            var multi = 5;
            // animáció az átcsúszásra
            animation = setInterval(function () {
                if (pos == newPos) {
                    clearInterval(animation);

                    if (shakeProgress) {
                        if (shakeInterval > 0) {
                            shakeInterval--;
                            lastMixed = div.id;
                            document.getElementById("shakeIt").disabled = true;
                        } else {
                            shakeInterval = 0;
                            shakeProgress = false;
                            document.getElementById("shakeIt").disabled = false;
                            clickReady = true;// újra clickelhető
                            lastMixed = null;
                            if (shakeInterval == 0) cancelAnimationFrame(reqAnimationId);
                        }
                        animProgress = false;
                    } else {

                        // ellenörzés 
                        if (checkItOut()) {
                            document.getElementById("new2").innerHTML = "SUCCESS!!!!";
                        } else {
                            document.getElementById("new2").innerHTML = "NOT READY!!!!";
                        }
                        clickReady = true;// újra clickelhető
                    }
                }
                else {
                    pos += step * multi;
                    if (horizontal) document.getElementById(div.id).style.left = pos + 'px';
                    else document.getElementById(div.id).style.top = pos + 'px';
                }
            }, 1);
        }

    }
    return moved;
}
// adott helyet csekkol , hogy üres-e vagy ki van rajta, vagy érvényes terület-e
function isThereAnyOn(left, top) {
    if (left < 0 || left > 450 || top < 0 || top > 450) return false;
    let element = null;
    let ok = false;
    let pieces = document.getElementById("piecesBoard").children;
    for (let index = 0; index < pieces.length & !ok; index++) {
        element = document.getElementById(pieces[index].id);
        if (element.offsetLeft == left && element.offsetTop == top) ok = true;;
    }
    if (ok) return element;
    else return null;
}