var negyzetekSzama = 6;
var szinek = [];
var valasztottSzin;

var negyzetek = document.querySelectorAll(".negyzet");
var szinJelzo = document.querySelector("#szinjelzo");
var uzenetMutat = document.querySelector("#uzenet");
var tippSzam = document.querySelector("#tippek");
var pontSzam = document.querySelector("#pontok");
var h1 = document.querySelector("h1");
var h2 = document.querySelector("h2");
var visszaallitGomb = document.querySelector("#visszaallit");
//var folytatGomb = document.querySelector("#folytat");
var nehezsegGombok = document.querySelectorAll(".mode");
var konnyuGomb = document.querySelector(".mode");
var tipp = 3;
var pont = 0;
var kirakva = false;



init();

function init() {
    szinJelzo.textContent = valasztottSzin;
    negyzetekBeallitasa();
    modBeallitas();
    visszaallit();
}

visszaallitGomb.addEventListener("click", function () {
    visszaallit();
});

/*folytatGomb.addEventListener("click", function () {
    visszaallit();
    //folytatGomb.textContent = "";
});*/

function negyzetekBeallitasa() {
    for (var i = 0; i < negyzetek.length; i++) {
        negyzetek[i].style.backgroundColor = szinek[i];
        negyzetek[i].title = "0";
        negyzetek[i].addEventListener("click", function () {
                if (this.title == "0" && !kirakva ){
                    this.title = "1";
                    var kattintottSzin = this.style.backgroundColor;
                    if (kattintottSzin === valasztottSzin) {
                        uzenetMutat.textContent = "Eltaláltad!";
                        szinValto(valasztottSzin);
                       // folytatGomb.textContent = "Folytatás";
                       // visszaallitGomb.textContent = "";
                        pont += 1;    
                        kirakva = true;      
                    }
                    else {
                        tipp -= 1;
                        this.style.backgroundColor = "#575454";
                        uzenetMutat.textContent = "Nem talált!";
                        visszaallitGomb.textContent = "Keverd újra";
                      //  pontok();
                    }
                    tippSzam.textContent = "Tippek: " + tipp;
                    pontSzam.textContent = "Pontok: " + pont;
              
                    if (tipp === 0) {
                        uzenetMutat.textContent = "Vége a játéknak!";
                       // negyzetek.style.display = "none";  rossz ez
                        negyzetekTiltas(); 
                        pont = 0;  
                    }
                } 
                negyzetek[i].style.display = "none";    
        });
    }
}

function negyzetekTiltas() {
    for (var i = 0; i < negyzetek.length; i++) {
        negyzetek[i].style.display = "none";
    }
}



//Elcsesződött a nehézség váltó. Nem akarja eltüntetni a 3 négyzetet könnyű szinten...
function modBeallitas() {
    for (var i = 0; i < nehezsegGombok.length; i++) {
        nehezsegGombok[i].addEventListener("click", function () {
            for (var i = 0; i < nehezsegGombok.length; i++) {
                nehezsegGombok[i].classList.remove("valasztott");
            }
            this.classList.add("valasztott");
            if (this.textContent === "Könnyű") {
                negyzetekSzama = 3;
            }
            else {
                negyzetekSzama = 6;
            }
        });
    }
}   

function visszaallit() {
    tipp = 3;
    kirakva = false;
    szinek = genRandomSzinek(negyzetekSzama);
    valasztottSzin = szinValaszto();
    szinJelzo.textContent = valasztottSzin;
    h1.style.backgroundColor = "#2a9bf7";
    h2.style.backgroundColor = "#2a9bf7";
    visszaallitGomb.textContent = "Keverd újra";
    uzenetMutat.textContent = "Kezdj el tippelni";
    tippSzam.textContent = "Tippek: " + tipp;
    pontSzam.textContent = "Pontok: " + pont;
    for (var i = 0; i < negyzetek.length; i++) {
        if (szinek[i]) {
            negyzetek[i].style.display = "block";
            negyzetek[i].style.backgroundColor = szinek[i];
            negyzetek[i].title = "0";
        }
        else {
            negyzetek[i].style.display = "none";
           // pontok();
        }
    }
}

function szinValto(color) {
    for (var i = 0; i < negyzetek.length; i++) {
        negyzetek[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
        h2.style.backgroundColor = color;
    }
}

function szinValaszto() {
    var random = Math.floor(Math.random() * szinek.length);
    return szinek[random];
}

function genRandomSzinek(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(szinKevero());
    }
    return arr;
}

function szinKevero() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


// AZ lenne a feladata, hogy a négyzetek kerekítését kikapcsolja és a térközt nullára vegye.
function effekt() {
    if (valasztottSzin === kattintottSzin) {
        var elem = document.getElementById("negyzet");
        elem.style.borderRadius = "0%";
        elem.style.margin = "0%";
    }
    else {
        return;
    }
}

