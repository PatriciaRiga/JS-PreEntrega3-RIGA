//SIMULADOR PARA CALCULAR PROMEDIOS Y OTORGAR PREMIOS A ALUMNOS CON PROMEDIOS ALTOS:

//Instancio como objetos a los alumnos a partir de una clase constructora:
class Alumno {
    constructor(id, contrasena, nombre, nivel, nota1, nota2, nota3, imagen) {
        this.id = id,
            this.contrasena = contrasena,
            this.nombre = nombre,
            this.nivel = nivel,
            this.nota1 = nota1,
            this.nota2 = nota2,
            this.nota3 = nota3,
            this.imagen = imagen,
            this.promedio = ""
    }
};

const alumno1 = new Alumno(1, "jesse123", "Jesse Pinkman", "intermedio", 8, 7, 8, "./JP.jpg");
const alumno2 = new Alumno(2, "hankdea", "Hank Shrader", "avanzado", 9, 10, 9, "./HS.jpg");
const alumno3 = new Alumno(3, "mrwhite", "Walter White", "avanzado", 10, 9, 10, "./WW.jpg");
const alumno4 = new Alumno(4, "polloshermanos", "Gustavo Fring", "básico", 3, 5, 7, "./GF.jpg");
const alumno5 = new Alumno(5, "bettercallme", "Saul Goodman", "intermedio", 5, 6, 7, "./SG.jpg");

//Agrupo los objetos en un array:
const ALUMNOS = [alumno1, alumno2, alumno3, alumno4, alumno5];

//Creo una pantalla de bienvenida para que el usuario inicie sesión:
const bienvenida = document.createElement("div");
bienvenida.innerHTML = `<h4>Ingresá tu número de ID y contraseña para iniciar sesión: </h4> <p>1: Jesse Pinkman</p> <p>2: Hank Shrader</p> <p>3: Walter White</p> <p>4: Gustavo Fring</p> <p>5: Saul Goodman</p>`;
document.body.append(bienvenida);

//Creo un formulario para que el usuario haga log in:
const formularioLogIn = document.getElementById("formularioLogIn");

//Función para que el usuario vea su contraseña al clickear el botón "Mostrar contraseña":
const mostrarContrasena = document.querySelector("#mostrarContrasena");
function verContrasena() {
    let alumnoContrasena = document.getElementById("alumnoContrasena");
    if (alumnoContrasena.type === "password") {
        alumnoContrasena.type = "text";
    } else {
        alumnoContrasena.type = "password";
    }
};
mostrarContrasena.addEventListener("click", verContrasena);

formularioLogIn.onsubmit = (e) => {
    e.preventDefault();
    let datosForm = e.target;
    let alumnoID = datosForm.querySelector("#alumnoID");

    //Busco entre los alumnos a alguno cuyo ID coincida con el ingresado por el usuario:
    let alumnoCoincidencia = ALUMNOS.find(alumno => alumno.id == alumnoID.value);
    const divVerLogIn = document.getElementById("verLogIn");
    if (alumnoCoincidencia !== undefined) {

        //Si el metodo FIND encontró alguna coincidencia, evalúo la contraseña ingresada por el usuario:
        let alumnoContrasena = datosForm.querySelector("#alumnoContrasena");
        if (alumnoCoincidencia.contrasena == alumnoContrasena.value) {
            //Si pasa la validación de la contraseña, reemplazo el formulario de logueo por el nombre del alumno y le muestro las cards con todos los alumnos que pertenecen al curso:
            bienvenida.remove();
            formularioLogIn.remove();
            divVerLogIn.innerHTML = `<h4>Hola, ${alumnoCoincidencia.nombre}. Estos son los alumnos que pertenecen a tu curso, seleccioná uno para calcular su promedio:</h4>`;
            mostrarAlumnos();
        } else {
            //Si la contraseña ingresada es incorrecta, muestro un mensaje de error manteniendo la posibilidad de que el usuario intente nuevamente:
            divVerLogIn.innerHTML += `<h4 style="color: red;">Ingresaste una contraseña incorrecta, volvé a intentarlo.</h4>`;
        };
    } else {
        //Si el ID ingresado no corresponde a ninguno de los objetos de mi array, muestro un mensaje de error manteniendo la posibilidad de que el usuario intente nuevamente:
        divVerLogIn.innerHTML += `<h4 style="color: red;">Ingresaste un ID incorrecto, volvé a intentarlo.</h4>`;
    };
};
document.body.append(formularioLogIn);

//Creo una función para que se muestren cards con los alumnos una vez realizado el login correctamente:
function mostrarAlumnos() {
    ALUMNOS.forEach((alumno) => {
        let divCard = document.createElement("div");
        divCard.id = alumno.id;
        divCard.innerHTML = `
        <div class="card" style="width: 15rem;">
        <img class="foto" src="./media/${alumno.imagen}" alt="${alumno.nombre}" width="150px" height="150px">
            <div class="card-body">
                <h5 class="card-title">${alumno.nombre}</h5>
                <p class="card-text">Pertenece al nivel ${alumno.nivel}</p>
                <a href="#" id="btnCalcular" class="btn btn-primary">Calcular promedio</a>
            </div>
        </div>`;

        // Agrego event listener al botón "Calcular promedio":
        const btnCalcularPromedio = divCard.querySelector(".btn.btn-primary");
        btnCalcularPromedio.addEventListener("click", () => {
            //Creo un div para que el alumno vea su promedio en pantalla:
            let divPromedio = document.createElement("div");
            divPromedio.innerHTML += `<h4>El promedio del alumno ${alumno.nombre} es ${alumno.promedio}</h4>`;
            document.body.append(divPromedio);
            //Guardo el promedio calculado en el local storage:
            localStorage.setItem("alumnosLS", JSON.stringify(alumnosLS));
            //Si el promedio del alumno está entre 9 o 10, le muestro opciones de premios:
            if (alumno.promedio >= 9) {
                let formularioPremios = document.createElement("premiar");
                formularioPremios.innerHTML = `<p>Por estar entre los alumnos con promedios altos, recibirás un premio en tu próxima clase. Seleccioná el premio que te gustaría recibir:</p>
                <form id="premiador">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="premio" id="option1" value="libro" required>
                        <label class="form-check-label" for="option1">
                            Un libro de regalo
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="premio" id="option2" value="descuento" required>
                        <label class="form-check-label" for="option2">
                            Un descuento en tu próximo curso
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="premio" id="option3" value="clase" required>
                        <label class="form-check-label" for="option3">
                            Una clase de práctica gratis antes de tu próximo examen
                        </label>
                    </div>
                    <input type="submit" id="btnAceptar" value="Aceptar premio">
                </form>`;
                document.body.append(formularioPremios);

                // Agrego event listener al botón "Aceptar premio" y le confirmo al usuario su elección:
                document.getElementById("premiador").addEventListener("submit", (e) => {
                    e.preventDefault();
                    let mensajePremio = document.createElement("div");
                    mensajePremio.innerHTML = `<h4>Felicitaciones, ${alumno.nombre}! Acercate a recepción antes de tu próxima clase para reclamar tu premio.</h4>`;
                    document.body.append(mensajePremio);

                    //Deshabilito el boton "Aceptar premio" para que no pueda volver a ser clickeado:
                    formularioPremios.querySelector("#btnAceptar").disabled = true;

                    //Actualizo el storage con los alumnos que fueron premiados:
                    ALUMNOS.forEach(alumno => {
                        if (alumno.promedio >= 9) {
                            localStorage.setItem("premiados", JSON.stringify(alumnosPremio))
                        };
                    });
                });
            } else {
                let mensajeNoPremio = document.createElement("div");
                mensajeNoPremio.innerHTML = `<p>Cuando tu promedio sea 9 o 10, recibirás un premio. ¡A seguir esforzándote!</p>`;
                document.body.append(mensajeNoPremio);
            };
        }
        );
        alumnoCard.append(divCard);
    });
};

//Creo una función para calcular el promedio:
function promediar() {
    ALUMNOS.forEach(a => {
        a.promedio = (a.nota1 + a.nota2 + a.nota3) / 3;
        a.promedio = Math.round(a.promedio * 100) / 100;
    });
};
promediar();

//Filtro a los alumnos para crear un nuevo array que sólo incluya los alumnos premiados:
let alumnosPremio = ALUMNOS.filter(a => a.promedio >= 9);

//Evento para chequear si tengo algo almacenado en el storage antes de empezar la ejecución:
let alumnosLS = JSON.parse(localStorage.getItem("alumnos"))
document.addEventListener("DOMContentLoaded", () => {
    if (!alumnosLS) {
        alumnosLS = ALUMNOS
    }
    bienvenida;
});



