'use strict';


// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Get the geolocation of the user
navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(latitude);
        console.log(longitude);

        const coordinates = [latitude, longitude];

        const map = L.map('map').setView(coordinates, 13);

        // add tile layer to the map instance
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright"> openStreetMap</a> ',
        }).addTo(map);

        // add marker to the map
        const marker = L.marker(coordinates).addTo(map);

        // add circle to the map
        const circle = L.circle(coordinates, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500,
        }).addTo(map);

        // add popups
        marker.bindPopup('<b> Hello World!</b><br>I am here :)').openPopup();
    },
    (err) => {
        console.log('error occured: ', err);
    }
);
