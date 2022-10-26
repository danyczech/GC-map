"use strict";
/*
//zjištění aktuální polohy
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const currentPosition = await getPosition();

console.log(currentPosition);
*/

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
  },
  function (err) {
    console.log(err);
  }
);

// nastavení zobrazované mapy v Leafletu(L. funkce), střed ve středu ČR, zoom mapy
const map = L.map("map").setView([49.7437572, 15.3386383], 7);

//barevné ikony v mapě
const walkingIcon = L.icon({
  iconUrl: "icons/icon_walking.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, 0],
});

// přidání vrstvy do mapy - turistická mapa serveru mapy.cz
L.tileLayer("http://m{s}.mapserver.mapy.cz/wturist-m/{z}-{x}-{y}", {
  attribution:
    '<img src="http://mapy.cz/img/logo-small.svg" style="height: 10px" />  <a href="//www.seznam.cz" target="_blank">Seznam.cz, a.s.</a>,  <a href="//www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  subdomains: "1234",
}).addTo(map);

//načtení keší ze souboru JSON
const getGeocaches = async function () {
  const resGeocaches = await fetch("./geocaches.json");
  if (!resGeocaches.ok) throw new Error("Nenačteny keše!");
  const dataGeocaches = await resGeocaches.json();
  console.log(dataGeocaches);
  return dataGeocaches;
};

//sestavení textu popupu
const setPopupText = function (cache) {
  return `<h3><a href='${cache.url}'>${cache.name}</a></h3><br>
    <img src='${cache.photo}' alt='foto' width='200px'> <br>
    Celková délka: ${cache.length} km <br>
    Doba chůze: ${cache.duration_min} ${
    cache.duration_max === 1 ? "den" : `- ${cache.duration_max} dní`
  }`;
};

getGeocaches().then((data) =>
  data.forEach((cache) => {
    //vykreslí body na mapě + popup
    L.marker(cache.coords, { icon: walkingIcon })
      .addTo(map)
      .bindPopup(setPopupText(cache));
    //vykreslí linie na mapě + popup
    L.polyline(cache.polyline_coords, { color: "#CE273D" })
      .addTo(map)
      .bindPopup(setPopupText(cache));
  })
);

/*









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

    //rozdělení na 3 pole podle typu, vytvoření vrstev a vykreslení bodů do mapy
    const multi, power, mystery;
    data.forEach(item => {
        if(item.type==='multi') multi.push(item);
        if(item.type==='power') power.push(item);
        if(item.type==='mystery') mystery.push(item);

        const multiLayer = L.layerGroup([...multi]);
        const powerLayer = L.layerGroup([...power]);
        const mysteryLayer = L.layerGroup([...mystery]);
    });
*/
