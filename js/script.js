const unos = document.querySelector(".unos"), //Uzimanje elemenata iz htmla
definicija = document.querySelector(".definicija span"),
preostaliP = document.querySelector(".preostali_pokusaji span"),
pogresno = document.querySelector(".pogresna_rijec span"),
reset_dugme = document.querySelector(".reset_dugme"),
pisanje = document.querySelector(".pisanje");

let rijec, maxPokusaja, pogresna_slova = [], tacnaSlova = []; //Deklarisanje varijabli
//Pravljenje funkcije za izvlacanje nasumicne deficnicije i rijeci
function nasumicno() { 
    let objekat = listaDefinicija[Math.floor(Math.random() * listaDefinicija.length)]; //Izvlacenje objekta iz listeDefinicija
    rijec = objekat.rijec; //Uzima trazenu rijec za odredjeni objekat
    maxPokusaja = rijec.length >= 5 ? 8 : 6;  //Postavljanje maksimalnog broja pokusaja na osnovu duzine rijeci
    tacnaSlova = []; pogresna_slova = []; //Inicijalizacija niza
    definicija.innerText = objekat.definicija; //Ispisuje teksutalni sadrzaj elementa na  ekran.
    preostaliP.innerText = maxPokusaja; 
    pogresno.innerText = pogresna_slova;

    let html = ""; //Deklarisanje stringa
    for (let i = 0; i < rijec.length; i++) { //For petlja koja prolazi kroz cijelu rijec
        html += `<input type="text" disabled>`;//Zabranjen unos u kvadratice
        unos.innerHTML = html; //Ispisuje tekstuaslni sadzraj ukljucujuci praznine i oznake;
    }
}
nasumicno(); // Pozivanje funkcije
//Funkcija za unosenje slova sa tastature
function unosenje(e) {
    let dugme = e.target.value.toLowerCase(); //Postavlja unesenu vrednost na malo slovo
    if(dugme.match(/^[A-Za-z]+$/) && !pogresna_slova.includes(` ${dugme}`) && !tacnaSlova.includes(dugme)) { // Prvo pitanje da li je unoseno slovo ako jeste da li se razlikuje od pogresnog slova i od tacnog slova
        if(rijec.includes(dugme)) { //Da li rijec sadrzi unesno slovo
            for (let i = 0; i < rijec.length; i++) {
                if(rijec[i] == dugme) {  //Provjerava jednog po jednog slova, koje se poklapa sa unosenim i na kom mjestu se nalazi;
                    tacnaSlova += dugme; //Ubacivanje unesong slova u niz Tacnih slova
                    unos.querySelectorAll("input")[i].value = dugme; //Ispisivanje slova u kavdraticu na tacnom mjestu.
                }
            }
        } else {
            maxPokusaja--; //Smanjivanje broja pokusaja
            pogresna_slova.push(` ${dugme}`);  //Ubacivanje pogresnog slova u niz pogresnih.
        }
        preostaliP.innerText = maxPokusaja;
        pogresno.innerText = pogresna_slova;
    }
    pisanje.value = "";

    setTimeout(() => {  //Postavlje da se funckija sama pozove posle odredjenog vremena
        if(tacnaSlova.length === rijec.length) {// Provjera da li je velica niza tacnih slova ista kao duzina rijeci 
            alert(`USPJESNO STE PRONASLI RIJEC (${rijec.toUpperCase()})`); //Izbacuje ALERT kako ste pronasli tacnu rijec, ispisivanje tacne rijeci u velikim slovima
            return nasumicno(); 
        } else if(maxPokusaja < 1) { //Proverava da  li je niz pogresnih slova manji od 1 
            alert("KRAJ! NEMATE VISE POKUSAJA");//Alert za kraj, iskoristeni broj pokusaja.
            for(let i = 0; i < rijec.length; i++) {
                unos.querySelectorAll("input")[i].value = rijec[i];//Ispisivvanje slova u kvadratice
            }
        }
    }, 100);
}
 
reset_dugme.addEventListener("click", nasumicno);//Klikom na "Pokreni ponovo " pokrece se funkcija nasumicno.
pisanje.addEventListener("input", unosenje);
unos.addEventListener("click", () => pisanje.focus());
document.addEventListener("keydown", () => pisanje.focus());