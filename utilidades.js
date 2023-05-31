function limpiar() {
    document.querySelectorAll('.form-control').forEach(item => {
        item.value = ''
        document.getElementById('e' + item.id).innerHTML = ''
        item.classList.remove('input-error')
        item.classList.remove('input-ok')
    })
    document.querySelectorAll('.form-select').forEach(item => {
        item.value = ''
        document.getElementById('e' + item.id).innerHTML = ''
        item.classList.remove('input-error')
        item.classList.remove('input-ok')
    })
    document.querySelectorAll('.form-check-input').forEach(item => {
        item.checked = false
        document.getElementById('e' + item.name).innerHTML = ''
        item.classList.remove('input-error')
        item.classList.remove('input-ok')
    })
}
function soloNumeros(e) {           
    const code = e.keyCode;            
    if (code >= 48 && code <= 57)
        return true
    return false
}

function validarMail(valor) {
    //expresión regular o regex para el formato del correo 
    const formato = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //devuelve verdado si tiene formato correcto o falso si es incorrecto
    //console.log(formato.test(valor))
    return formato.test(valor)
}

function limpiarCheck(name) {
    const input = document.querySelector('input[name='+ name +']:checked')
    if (input) {
        document.getElementById('esexo').innerHTML = ''
        document.querySelectorAll('input[name='+ name+']').forEach(element => {
            element.classList.remove('input-error')
        })
    }
}