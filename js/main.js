//Punto 1, creo un array de objetos con todas las frutas segun indica el pdf
//tuve el problema de que si pongo ../ adelante de las rutas no muestra las fotos
const frutas = [
    {id: 1, nombre: "arandano", precio: 5000, ruta_img: "img/arandano.jpg"},
    {id: 2, nombre: "banana", precio: 1000, ruta_img: "img/banana.jpg"},
    {id: 3, nombre: "frambuesa", precio: 4000, ruta_img: "img/frambuesa.png"},
    {id: 4, nombre: "frutilla", precio: 3000, ruta_img: "img/frutilla.jpg"},
    {id: 5, nombre: "kiwi", precio: 2000, ruta_img: "img/kiwi.jpg"},
    {id: 6, nombre: "mandarina", precio: 800, ruta_img: "img/mandarina.jpg"},
    {id: 7, nombre: "manzana", precio: 1500, ruta_img: "img/manzana.jpg"},
    {id: 8, nombre: "naranja", precio: 9000, ruta_img: "img/naranja.jpg"},
    {id: 9, nombre: "pera", precio: 2500, ruta_img: "img/pera.jpg"},
    {id: 10, nombre: "anana", precio: 3000, ruta_img: "img/anana.jpg"},
    {id: 11, nombre: "pomelo-amarillo", precio: 2000, ruta_img: "img/pomelo-amarillo.jpg"},
    {id: 12, nombre: "pomelo-rojo", precio: 2000, ruta_img: "img/pomelo-rojo.jpg"},
    {id: 13, nombre: "sandia", precio: 10000, ruta_img: "img/sandia.jpg"}
];

//variables, uso el queryselector porque me gusta más
// las dejo hechas para usarlas después
let datosAlumno = document.querySelector("#datosAlumno");
let contenedorFrutas = document.querySelector("#contenedorFrutas");
let contenedorCarrito = document.querySelector("#contenedorCarrito");
let barraBusqueda = document.querySelector("#barraBusqueda");
let nav = document.querySelector("nav");


/*
acá quise probar de "si ya existe un carrito guardado en el localStorage, que se cargue ese"
if (localStorage.getItem("carrito")){
    let carrito = localStorage.getItem("carrito");
}else{
    let carrito = [];
}
*/
//armo un carrito como un array vacío
let carrito = [];

/*
voy a usar esta funcion que se llama mostarProductos()
que hace?
1. arma un string vacio que se llama cartaProducto (le llamé así porque se parece a un elemento card de html)
2. usa el método forEach() de los array
- por cada fruta (forEach fruta) arma un bloque html, todos iguales
- inserta los bloques html con innerHTML
3. quedan todas las frutas mostradas y es más fácil añadir o cambiar cosas (si quiero cambiar algo, lo hago en el array de frutas de arriba)

*/
function mostrarProductos(array) {
  let cartaProducto = "";
  array.forEach((fruta) => {
    cartaProducto += `
            <div class="card-producto">
                <img src="${fruta.ruta_img}" alt="${fruta.nombre}" />
                <h3>${fruta.nombre}</h3>
                <p>$ ${fruta.precio}</p>
                <!--cada vez que se aprieta el botón, se añade al carrito-->
                <button class="botonAgregar" onclick="agregarACarrito(${fruta.id})">Agregar a carrito</button>
            </div> `;
  });
  contenedorFrutas.innerHTML = cartaProducto;
}

/*tambien tiene este evento que funciona con la barra de busquedas porque empieza a buscar
cada item de la tienda apenas empecemos a escribir en el buscador
llama a la funcion filtarProductos que esta abajo
*/
barraBusqueda.addEventListener("keyup", () => {
    filtrarProductos();
});

/*
funcion para usar la barra de busqueda
primero una variable valorBusqueda que toma el valor de barraBusqueda
otra variable que se llama productos filtrados que busca que en el nombre de la fruta se incluya lo que escribo
y por ultimo, llama a mostrarProductos() y le pasa por argumentos los productos filtrados
*/
function filtrarProductos(){
    let valorBusqueda = barraBusqueda.value;
    let productosFiltrados = frutas.filter(f => f.nombre.includes(valorBusqueda));
    mostrarProductos(productosFiltrados);
}

/*
añade al carrito (que hasta ahora era un array vacio), la fruta seleccionada
la fruta se selecciona segun el id
*/
function agregarACarrito(id){
    let frutaSeleccionada = frutas.find(f => f.id === id);
    carrito.push(frutaSeleccionada);
    mostrarCarrito();
    //almaceno los productos del carrito en el localStorage
    localStorage.setItem("carrito", carrito);
}
/*
function contarProductos(){
    let contadorProductos = "<p>";
    carrito.forEach((p) => {
        p++
        contadorProductos +=
        `Carrito: ${p} productos</p>`
        });
    nav.innerHTML = contadorProductos;
}
    */

/*
acá se arma el carrito como lista desorganizada (ul de html)
es muy parecido a mostrarProductos()
*/ 
function mostrarCarrito(){
    let cartaCarrito = "<ul>";
    carrito.forEach((elemento, indice) => {
        cartaCarrito +=
        `<li class="bloque-item">
            <p class="nombre-item">${elemento.nombre} - $ ${elemento.precio}</p>
            <p class="nombre-item">${indice}</p>
            <button class="boton-eliminar" onclick="eliminarElemento(${indice})">Eliminar</button>
        </li>`
        
    });

    cartaCarrito += "</ul><button class='boton-eliminar' onclick='vaciarCarrito()'> Vaciar carrito </button>";
    contenedorCarrito.innerHTML = cartaCarrito;

    console.log(carrito);
}


/*
eliminar elementos de a uno del carrito
simplemente usa el metodo splice() del array carrito
splice() necesita como argumentos el indice de la fruta a eliminar y cuantas hay que borrar
trabajamos con indice y no id porque si usamos id, puedo por ejemplo, borrar todos los kiwis
cuando quiero eliminar sólo uno 
*/
function eliminarElemento(indice){
    carrito.splice(indice, 1);
    mostrarCarrito(); 
}

//este es sencillo porque para vaciar el carrito solamente lo inicalizo vacio
function vaciarCarrito(){
    carrito = [];
    contenedorCarrito.innerHTML = "";
}

//funcion para añadir mis datos al html
function imprimirDatosAlumno(){
    const alumno = {nombre: "Gricel", apellido: "Diaz Zabala", dni: 43360102};
    let alumnoHTML = "";
        alumnoHTML += `<h3>${alumno.nombre} ${alumno.apellido}</h3>`;
    datosAlumno.innerHTML = alumnoHTML;
    console.log(alumno);
}

/* una prácica común es hacer una funcion init() que sea la primera que ocurre
básicamente llama a todas las funciones y cosas que tienen que pasar primero
(como mostrar los productos)*/
function init(){
    imprimirDatosAlumno();
    mostrarProductos(frutas);
}

//llama a init y empieza a ejecutarse todo
init();

