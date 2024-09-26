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

class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition();
        form.addEventListener('submit', this._newWorkOut.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                (err) => {
                    console.log('user denied access to location: ', err);
                }
            );
    }

    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;

        const coordinates = [latitude, longitude];

        this.#map = L.map('map').setView(coordinates, 13);

        // add tile layer to the map instance
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright"> openStreetMap</a> ',
        }).addTo(this.#map);

        // add marker to the map
        const marker = L.marker(coordinates).addTo(this.#map);

        // add circle to the map
        const circle = L.circle(coordinates, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500,
        }).addTo(this.#map);

        // add popups
        marker
            .bindPopup('<b> Hello World!</b><br>I am here :)', {
                closeOnClick: false,
                autoClose: false,
                className: 'running-popup',
            })
            .openPopup();

        // add popup event on mapClick
        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(e) {
        this.#mapEvent = e;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputElevation
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
        inputCadence
            .closest('.form__row')
            .classList.toggle('form__row--hidden');
    }

    _newWorkOut(e) {
        e.preventDefault();

        // empty the input values
        inputType.value =
            inputDistance.value =
            inputDuration.value =
            inputCadence.value =
            inputElevation.value =
                '';

        // popups after submitting
        const { lat, lng } = this.#mapEvent.latlng;

        L.marker([lat, lng])
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    maxHeigth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup',
                })
            )
            .setPopupContent('Hey There')
            .openPopup();
    }
}

const app = new App();

// Get the geolocation of the user
