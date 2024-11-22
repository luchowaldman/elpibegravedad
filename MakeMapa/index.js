const { HacerMapaModo1 } = require('./HacerMapaModo1');
const { HacerMapaModo2 } = require('./HacerMapaModo2');
const { HacerMapaModoHistoria } = require('./HacerMapaModoHistArg');
const { HacerMapaDemo } = require('./HacerMapaDemo');

async function main() {

    HacerMapaModo1("mapa1");
    HacerMapaModo2("charly");
    HacerMapaModoHistoria("historia");
    HacerMapaDemo("demo");
}

main();
