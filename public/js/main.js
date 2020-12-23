

const { hola } = require('../../test'); 

const Saludar = () => {
    const divHola = document.querySelector('#hola');
    divHola.innerHTML = 'Hola'
}

module.exports = { Saludar};