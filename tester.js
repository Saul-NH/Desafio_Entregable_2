const Contenedor = require('./Contenedor');

const contenedor = new Contenedor('./productos.txt');

(async () => {
    console.log(await contenedor.save({title: 'Node js', price: 10, thumbnail:'https://i0.wp.com/www.jacobsoft.com.mx/wp-content/uploads/2020/04/node-js-736399_960_720-2.png?fit=960%2C480&ssl=1'}));
    console.log(await contenedor.getById(1));
    console.log(await contenedor.getAll());
    console.log(await contenedor.deleteById(1));
    console.log(await contenedor.deleteAll());
})();