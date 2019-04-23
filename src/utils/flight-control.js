const BASE_URL = 'http://127.0.0.1:8000/'


export const FlightControl = {
    FlightId: null,
    InProgress: false,
    Status: 0,
    dispatch: async (payload) => {
        return new Promise((resolveOriginalRequest, reject) => {
            FlightControl.InProgress = true;
            FlightControl.Status = 0;
    
            const requests = [];
            const request = FlightControl.createFlight(payload.flightData)    

            request.then(FlightControl.setFlightId).then(() => {
                const speedDataPoints = payload.speedData.map(point => {
                    return {
                        speed: point.y,
                        time: point.x,
                        flight_id: FlightControl.FlightId
                    }
                });
    
                speedDataPoints.forEach(point => {
                    const request = new FlightControl.createSpeedData(point);
                    request.then(FlightControl.logResponse);
                    request.catch(FlightControl.reportError);

                    requests.push(request);
                });

                const positionDataPoints = payload.positionData.map(point => {
                    return {
                        x_pos: point.x,
                        y_pos: point.y,
                        time: point.time,
                        flight_id: FlightControl.FlightId
                    }
                });
    
                positionDataPoints.forEach(point => {
                    const request = new FlightControl.createPositionData(point);
                    request.then(FlightControl.logResponse);
                    request.catch(FlightControl.reportError);

                    requests.push(request);
                });

                payload.hoopPositionData.forEach(point => {
                    const bundle = FlightControl.createHoopsBundle({time: point.time, flight_id: FlightControl.FlightId})
                    
                    bundle.then((res) => {
                        const bundle_id = JSON.parse(res).id
                        point.data.forEach(dataPoint => {
                            const postObj = {
                                x_pos: dataPoint.x,
                                y_pos: dataPoint.y,
                                hoop_id: bundle_id
                            }
                            const request = FlightControl.createHoopData(postObj);
                            request.then(FlightControl.logResponse);
                            request.catch(FlightControl.reportError)

                            requests.push(request);
                        })
                    })

                    bundle.catch(FlightControl.reportError);
                    requests.push(bundle);
                })

                payload.asteriodPositionData.forEach(point => {
                    const bundle = FlightControl.createAsteriodsBundle({time: point.time, flight_id: FlightControl.FlightId})
                    
                    bundle.then((res) => {
                        const bundle_id = JSON.parse(res).id
                        point.data.forEach(dataPoint => {
                            const postObj = {
                                x_pos: dataPoint.x,
                                y_pos: dataPoint.y,
                                asteriod_id: bundle_id
                            }
                            const request = FlightControl.createAsteriodData(postObj);
                            request.then(FlightControl.logResponse);
                            request.catch(FlightControl.reportError);

                            requests.push(request);
                        })
                    })

                    bundle.catch(FlightControl.reportError);
                    requests.push(bundle);
                })
            });

            request.catch(FlightControl.reportError)
            requests.push(request);

            Promise.all(requests).then(() => {
                setTimeout(resolveOriginalRequest, 10000);
            })
        })
        
    },
    setFlightId: (res) => {
        return new Promise((resolve, reject) => {
            FlightControl.Status = 1;
            FlightControl.FlightId = JSON.parse(res).id
            resolve();
        })
    },
    logResponse: (res) => {
        FlightControl.Status += 1;
        // console.log(JSON.parse(res))
    },
    reportError: (err) => {
        console.log(err);
    },
    createFlight: (flightData) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/create_flight';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send(JSON.stringify(flightData));
        });

        return promise;
    },
    createSpeedData: (speedData) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/create_speed_data';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send(JSON.stringify(speedData));
        });

        return promise;
    },
    createPositionData: (positionData) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/create_position_data';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send(JSON.stringify(positionData));
        });

        return promise;
    },
    createHoopsBundle: (hoopsBundle) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/create_hoops_bundle';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send(JSON.stringify(hoopsBundle));
        });

        return promise;
    },
    createHoopData: (hoopData) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/create_hoop_data';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send(JSON.stringify(hoopData));
        });

        return promise;
    },
    createAsteriodsBundle: (bundleData) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/create_asteriods_bundle';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send(JSON.stringify(bundleData));
        });

        return promise;
    },
    createAsteriodData: (asteriodData) => {
        const url = BASE_URL + 'api/v1/beats/beer/battle_star_galactica/create_asteriod_data';
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onload = function() {
                resolve(this.response);
            }

            xhr.onerror = function() {
                reject(this.status);
            }

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json")

            xhr.send(JSON.stringify(asteriodData));
        });

        return promise;
    },
}

