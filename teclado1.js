//Invocación de la función init -- carga inicial de la calculadora.
window.addEventListener("load", init);
//Evento para capturar un grupo de teclas que tipee el usuario.
document.onkeypress = desdeTeclado;

//Elemento utilizado para mostrar los datos sumistrados por el usuario.
var _pantalla = document.getElementById("pantalla");

//Bandera que indica que se ejecuto la funcion eval
var _checkRes = false;

/**
 * Función que evalúa una expresión y realiza el cálculo con manejo 
 * de excepciones.
 * 
 * @see eval()
 */
 function calc() {
    if (_pantalla.innerText.valueOf("+-*/") != "") {
        try {
            let result = eval(_pantalla.innerText);
            _pantalla.innerText = (typeof result === "undefined" || result == "Infinity") ? "Error!" : result;
        } catch (e) {
            _pantalla.innerText = "Error!";
        }finally{
            _checkRes = true;
        }
    }
}

/**
 * Función que concatena los valores ingresados por teclado 
 * o al hacer clic en la botonera de la calculadora.
 * 
 */
function setValue(s){
    if (_checkRes == true) {
        _pantalla.innerText = "";
        _checkRes = false;
    }
    _pantalla.innerText += s;
}

/**
 * Función para definir el comportamiento del evento "onclick" de cada 
 * botón que se encuentra en la calculadora.
 */
function init() {
    let teclas = document.querySelectorAll("button");
    for (var i = 0; i < teclas.length; i++) {
        switch (teclas[i].innerText) {
            case "=":
                teclas[i].onclick = function () {calc();}
                break;
            case "C":
                teclas[i].onclick = function () {
                    _pantalla.innerText = "";
                }
                break;
            default:
                teclas[i].onclick = function () {setValue(this.innerText);}
                break;
        }
    }
}

/**
 * 
 * Función que permite operar con la calculadora por medio de teclado, verificando el
 * código de tecla o el carácter obtenido con la función fromCharCode.
 * 
 * @param {Event} e Evento capturado por el atributo onkeypress.
 * @see String.fromCharCode()
 */
function desdeTeclado(e) {
    let codigo = e.charCode;
    let caracter = String.fromCharCode(codigo);
    let posibles_caracteres = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "*", "-", "+"];
    if (posibles_caracteres.includes(caracter)) {
        setValue(caracter);
    } else if (codigo == 61) {
        calc();
    } else if (codigo == 13) {
        _pantalla.innerText = "";
    }
}