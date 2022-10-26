'use strict';

//zjištění aktuální polohy
const getPosition = function () {
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

//načtení turistické mapy z mapy.cz
const getMap = async function(){
    // nastavení středu mapy 
    let coords;
    try {const position = await getPosition();
        coords = [position.coords.latitude, position.coords.longitude];
    } catch {
        //pokud nenačte aktuální polohu, nastaví se střed ČR
        coords = [49.7437572, 15.3386383];    
    }
    const map = L.map('map').setView(coords, 9);
    L.tileLayer("http://m{s}.mapserver.mapy.cz/wturist-m/{z}-{x}-{y}", {
        attribution: '<img src="http://mapy.cz/img/logo-small.svg" style="height: 10px" />  <a href="//www.seznam.cz" target="_blank">Seznam.cz, a.s.</a>,  <a href="//www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
        subdomains: "1234"
    }).addTo(map);

    return map;
};

//načtení keší ze souboru JSON
const getGeocaches = async function(){
    const resGeocaches = await fetch('./geocaches.json');
    if (!resGeocaches.ok) throw new Error('Nenačteny keše!');
    const dataGeocaches = await resGeocaches.json();
    console.log(dataGeocaches)
    return dataGeocaches;
};

//ikony popupu
const LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

const powerIcon = new LeafIcon({iconUrl: './icons/icon_power.png'});
const multiIcon = new LeafIcon({iconUrl: './icons/icon_multi.png'});
const mysteryIcon = new LeafIcon({iconUrl: './icons/icon_mystery.png'});

//sestavení textu popupu
const popupContent = function(cache){
    let content='';

    return content;
}

//console.log(getGeocaches());
//přidání bodů do mapy ze souboru JSON

getMap()
.then( async map => {
    const data = await getGeocaches();

    console.log(data);
    

    data.map(cache => L.marker(cache.coords).addTo(map)
    .bindPopup(`<h3><a href='${cache.url}'>${cache.name}</a></h3><br>
    Celková délka: ${cache.length} km <br>
    Doba chůze: ${cache.duration_min} - ${cache.duration_max} dní` )
    .openPopup())

    
    }   
);



/*
L.marker([49.5, 16.09]).addTo(map)
 .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
.openPopup();
*/
/*

const setMapCenter = async function(){
    let coords=[];
    try {const position = await getPosition();
        coords = [position.coords.latitude, position.coords.longitude];
        console.log(coords);
    } catch {
        //pokud nenačte aktuální polohu, nastaví se střed ČR
        coords = [49.7437572, 15.3386383];    
    }
    console.log(coords);
    const map = L.map('map').setView(coords, 9);
        L.tileLayer("http://m{s}.mapserver.mapy.cz/wturist-m/{z}-{x}-{y}", {
                attribution: '<img src="http://mapy.cz/img/logo-small.svg" style="height: 10px" />  <a href="//www.seznam.cz" target="_blank">Seznam.cz, a.s.</a>,  <a href="//www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
                subdomains: "1234"
            }).addTo(map);

};
*/



/*
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function(position){
            const coords = [position.coords.latitude, position.coords.longitude];
            const map = L.map('map').setView([coords], 13);
            L.tileLayer("http://m{s}.mapserver.mapy.cz/wturist-m/{z}-{x}-{y}", {
                attribution: '<img src="http://mapy.cz/img/logo-small.svg" style="height: 10px" />  <a href="//www.seznam.cz" target="_blank">Seznam.cz, a.s.</a>,  <a href="//www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
                subdomains: "1234"
            }).addTo(map);

        }
    )
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([49.5, 16.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
*/

/*The word i18n is a common abbreviation of internationalization in the developer community, used instead of typing the whole word and trying to spell it correctly. Similarly, a11y is an abbreviation of accessibility.

Write a function that takes a string and turns any and all "words" (see below) within that string of length 4 or greater into an abbreviation, following these rules:

    A "word" is a sequence of alphabetical characters. By this definition, any other character like a space or hyphen (eg. "elephant-ride") will split up a series of letters into two words (eg. "elephant" and "ride").
    The abbreviated version of the word should have the first letter, then the number of removed characters, then the last letter (eg. "elephant ride" => "e6t r2e").

Example

abbreviate("elephant-rides are really fun!")
//          ^^^^^^^^*^^^^^*^^^*^^^^^^*^^^*
// words (^):   "elephant" "rides" "are" "really" "fun"
//                123456     123     1     1234     1
// ignore short words:               X              X

// abbreviate:    "e6t"     "r3s"  "are"  "r4y"   "fun"
// all non-word characters (*) remain in place
//                     "-"      " "    " "     " "     "!"
=== "e6t-r3s are r4y fun!"

*/
/*
const abbreviate = function(str){
    
    const result = str.replace(/\W/g, ' $& ').split(/\s/g).filter(el=> el.length>0).map(el=> {
        if (el.length<=3) return el;
        else {
           return el.slice(0,1)+ (el.length-2) + el.slice(-1);
        }
    }).join(' ');
    const spaces = str.replace(/\W/g, ' $& ').split(/\s/g).filter(el=> el.length>0).map(el=> {
        if (el.length<=3) return el;
        else {
           return el.slice(0,1)+ (el.length-2) + el.slice(-1);
        }
    }).reduce((acc,el)=>{
        if(/^\w/.test(el)) return acc+' '+el;
        else return acc+el;
    }, '')

    console.log(result); 
    console.log(spaces);
}

abbreviate("elephant-rides are really fun!");
 */  