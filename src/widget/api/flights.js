import data from './data.json';

export const get = function getFlights() {
    return new Promise(function(resolve) {
        setTimeout(() => resolve(data), 3000); // эмитируем долгий ответ от сервера
    });
};