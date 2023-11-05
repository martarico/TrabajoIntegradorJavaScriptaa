let category = document.getElementById('category');
let quantity = document.getElementById('quantity')
let form = document.getElementById('formTickets')
let option;
let num;
let resultado


quantity.addEventListener("input", validationNum);

category.addEventListener("change", catchCategory);



//FUNCIONES

//Función para captar la opción seleccionada
function catchCategory(){
    let optionCategory = category.options[category.selectedIndex];
    option = optionCategory.text;
    payment(num, option);
}

//Función para validar cantidad de tickets
function validationNum(){
    num = quantity.value;
    let validation = /^[0-9]+$/;
    //Si pasa esto, ejecutamos este codigo
    if (!validation.test(num) && num != 0) {
        document.getElementById("messageError").className = "messageError";
        document.getElementById("messageError").textContent =
            "*Error, ingrese un número valido";
    } else {
        document.getElementById("messageError").className = "messageErrorDisabled";
        document.getElementById("messageError").textContent = "";
        payment(num, option);
    }
}


//Función para sacar la cuenta por numero de tickets y descuento según elección
function payment(num, type) {
    let ticketPrice = 200
    resultado = 0;
    if (type === "Estudiante") {
        resultado = Math.round(ticketPrice * (1 - 0.8) * num);
        return resultado
    } else if (type === "Trainee") {
        resultado = Math.round(ticketPrice * (1 - 0.5) * num);
        return resultado
    } else if (type === "Junior") {
        resultado = Math.round(ticketPrice * (1 - 0.15) * num);
        return resultado
    }
    cancelPayment();
}


//Función para cancelar pago y vaciar formulario
function cancelPayment() {
    let btn = document.getElementById("reset");
    btn.addEventListener("click", () => {
        resultado = undefined
        document.getElementById('payment').textContent = 0;
        option = "";
        num = "";
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Compra cancelada",
            showConfirmButton: false,
            timer: 1500,
        });
    });
}



//Función para mostrar el total a pagar
function showResumen(){
    document.getElementById('btn-Resumen').addEventListener('click', ()=>{
        if(resultado !== undefined){
            document.getElementById('payment').textContent = resultado
        }
    })

}

//Llamamos a la función showResumen()
showResumen()

