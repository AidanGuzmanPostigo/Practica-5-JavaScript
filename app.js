const form = document.querySelector("#formContacto");
const nombre = document.querySelector("#inpNombre");
const apellidos = document.querySelector("#inpApellidos");
const telefono = document.querySelector("#inpTelNumero");
const btnAgregarTelefono = document.querySelector("#btnAddTel");
const listaTelefonos = document.querySelector("#ulTelefonos");
const borrarAgenda = document.querySelector("#btnBorrarTodo");
const listaContactos = document.querySelector("#secContactos");
const btnLimpiar = document.querySelector("#btnLimpiar");
const error = document.querySelector("#msg");
const agenda = cargarContactos();
let contador = agenda.length;

init();

function init (){
    render();
    form.addEventListener("submit",function (event){
        event.preventDefault();
        if (verificarFormulario()){
            if(listaTelefonos.children.length === 0){
                alert("No hay ningún teléfono introducido.");
            } else{
                guardarContacto();
            }
        }
    });
    btnAgregarTelefono.addEventListener("click",() =>{
        if (verificarTelefono()){
            agregarTelefono();
        }
    });
    btnLimpiar.addEventListener("click",() =>{
        limpiar();
    });
    borrarAgenda.addEventListener("click",() =>{
        confirm("¿Estás seguro?")?limpiarAgenda():"";
    })

}
function limpiarAgenda(){
    agenda.length = 0;
    contador = 0;
    localStorage.removeItem("agenda");
    render();
}
function guardarContacto(){
    const contacto =
        {
            id: "c_" + ++contador,
            nombre: nombre.value,
            apellidos: apellidos.value,
            telefonos: agruparTelefonos()
        }
    nombre.value = "";
    apellidos.value = "";
    limpiar();
    agenda.push(contacto);
    localStorage.setItem("agenda", JSON.stringify(agenda));
    render() 
}
function agregarTelefono(){
    verificarTelefono();
    const tempTel = document.createElement("li");
    tempTel.textContent = telefono.value;
    listaTelefonos.append(tempTel);
    telefono.value = "";

}
function verificarFormulario(){
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}
function verificarTelefono(){
    if (!telefono.checkValidity() || telefono.value.trim() == "") {
        telefono.reportValidity();
        return false;
    }
    return true;
}
function agruparTelefonos(){
    let aux = [];
    for (let i = 0; i<listaTelefonos.children.length;i++){
        aux.push(listaTelefonos.children[i].textContent);
    }
    return aux;
}
function render(){
    listaContactos.innerHTML = "";
    for (let i = 0; i<agenda.length;i++){
        listaContactos.innerHTML+= `Id: ${agenda[i].id}<br>Nombre: ${agenda[i].nombre}<br>Apellidos: ${agenda[i].apellidos}<br>Teléfonos: ${agenda[i].telefonos.join(", ")}<br>`
    }
}
function cargarContactos() {
  const raw = localStorage.getItem("agenda");
  if (!raw){
    return [];
  }
    try {
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("JSON inválido:", error);
        return [];
    }
  }
function limpiar(){
    listaTelefonos.innerHTML = "";
}