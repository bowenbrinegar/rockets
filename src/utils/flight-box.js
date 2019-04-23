const BASE_URL = 'http://127.0.0.1:8000/'


export const FlightBox = {
    getFlightRecords: () => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/all_flights';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send();
        });

        return promise;
    },
    fetchFlight: (id) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/get_massive_flight/' + id;
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send();
        });

        return promise;
    }
};