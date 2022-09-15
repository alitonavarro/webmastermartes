var moment = require('moment');
moment.locale('es');

console.log('Naci ' + moment('15/08/1969', 'DD/MM/YYYY').fromNow())