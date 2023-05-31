//arreglo para guardar las personas registradas
let listapersonas = []
let personaEditando = null;
const p1 = {
    run: '12.345.678-9',
    nombre: 'Tony Stark',
    fecha: '1975-05-10',
    fono: 133,
    email: 'iron@mail.cl',
    estado: 'soltero',
    sexo: 'masculino',
    comentario: 'Iron man'
}
const p2 = {
    run: '20.123.654-K',
    nombre: 'Peter Parker',
    fecha: '2005-04-01',
    fono: 134,
    email: 'peter@mail.cl',
    estado: 'soltero',
    sexo: 'masculino',
    comentario: 'Spider man'
}

const p3 = {
    run: '18.123.654-K',
    nombre: 'Peter Stark',
    fecha: '2005-04-01',
    fono: 134,
    email: 'peter@mail.cl',
    estado: 'soltero',
    sexo: 'masculino',
    comentario: 'Iron Spider '
}
listapersonas.push(p1)
listapersonas.push(p2)
listapersonas.push(p3)
listartabla()

function guardar() {
    let sexo = ''
    if (document.getElementById('femenino').checked)
        sexo = 'femenino'
    else if (document.getElementById('masculino').checked)
        sexo = 'masculino'
    if (personaEditando) {
        let persona = listapersonas.find(p => p.run == personaEditando)
        persona.run = document.getElementById('run').value.trim(),
        persona.nombre = document.getElementById('nombre').value.trim(),
        persona.fecha = document.getElementById('fecha').value,
        persona.fono = document.getElementById('fono').value,
        persona.email = document.getElementById('email').value.trim(),
        persona.estado = document.getElementById('estadocivil').value,
        persona.sexo = sexo,
        persona.comentario = document.getElementById('comentario').value.trim()
    } else {
        const persona = {
            run: document.getElementById('run').value.trim(),
            nombre: document.getElementById('nombre').value.trim(),
            fecha: document.getElementById('fecha').value,
            fono: document.getElementById('fono').value,
            email: document.getElementById('email').value.trim(),
            estado: document.getElementById('estado').value,
            sexo: sexo,
            comentario: document.getElementById('comentario').value.trim(),
        }
        listapersonas.push(persona);
    }
    personaEditando = null;
    listartabla()
    limpiar()
}

function editar(run){
    personaEditando = run;
    let persona = listapersonas.find(p => p.run == run)
    document.getElementById('run').value = persona.run
    document.getElementById('nombre').value = persona.nombre
    document.getElementById('fecha').value = persona.fecha
    document.getElementById('fono').value = persona.fono
    document.getElementById('email').value = persona.email
    document.getElementById('estadocivil').value = persona.estado
    document.getElementById('femenino').checked = persona.sexo == 'Femenino'
    document.getElementById('masculino').checked = persona.sexo == 'Masculino'
    document.getElementById('comentario').value = persona.comentario
}


function listartabla() {
    let tabla = ''
    //.length determina el tamaño de un arreglo(número de elementos)
    if (listapersonas.length > 0) {
        //recorrer todos los elementos del arreglo, listapersonas
        listapersonas.forEach(item => {
            //literal string `
            tabla += `
             <tr>
                 <td>${item.run}</td>
                 <td>${item.nombre}</td>
                 <td>${item.fecha}</td>
                 <td>${item.fono}</td>
                 <td>${item.email}</td>
                 <td>${item.estado}</td>
                 <td>${item.sexo}</td>
                 <td>${item.comentario}</td>
                 <td nowrap>
                    <button class="btn btn-warning" onclick="editar('${item.run}')">Editar</button>
                    <button class="btn btn-danger" onclick="eliminar('${item.run}')">Eliminar</button>
                 </td>
             </tr>
             `
        })
    }
    //el contenido agregado a la variable tabla se añade en el tbody de la tabla
    document.getElementById('tablaCont').innerHTML = tabla
}
//función tradicional
function validar() {
    //captura el booleano que retorna la función lostFocus
    const run = lostFocus('run')
    const nom = lostFocus('nombre')
    const fecha = lostFocus('fecha')
    const email = lostFocus('email')
    const fono = lostFocus('fono')
    const estadocivil = lostFocus('estadocivil')
    const sexo = document.querySelector('input[name="sexo"]:checked')
    if (!sexo) {
        document.getElementById('esexo').innerHTML =
            '<span class="badge bg-danger">El campo es obligatorio</span>'
        document.querySelectorAll('input[name="sexo"]').forEach(element => {
            element.classList.add('input-error')
        })
    }
    //verificamos que todos inputs vengan en true
    if (run && nom && fecha && email && fono && estadocivil && sexo) {
        //si son todos true permite guardar el registro
        guardar()
        Swal.fire(
            'Se ha registrado con éxito!!!',
            'Guardado correctamente.',
            'success'
        )
    }
}


function lostFocus(id) {
    const input = document.getElementById(id).value
    document.getElementById(id).classList.remove('input-error')
    document.getElementById(id).classList.remove('input-ok')
    if (input.trim() == '') {
        document.getElementById('e' + id).innerHTML =
            '<span class="badge bg-danger">El campo es obligatorio</span>'
        //classList permite añadir o quitar una clase a un tag html, add para añadir, remove para quitar
        document.getElementById(id).classList.add('input-error')
        return false
    } else {
        document.getElementById(id).classList.add('input-ok')
        document.getElementById('e' + id).innerHTML = ''
        if (id == 'email' && !validarMail(input)) {
            document.getElementById('e' + id).innerHTML =
                '<span class="badge bg-danger">Email no tiene el formato correcto</span>'
            return false
        }
        return true
    }
}

function eliminar(run) {

    Swal.fire({
        title: '¿Está seguro que desea eliminar el registro ' + run + ' ?',
        text: "Si eliminas esto, no podrás recuperarlo",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        //comentar backdrop si no quiere el felino
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `
    }).then((result) => {
        if (result.isConfirmed) {
            listapersonas = listapersonas.filter(p => p.run != run);
            listartabla()
            Swal.fire(
                'Eliminado',
                'Su registro ha sido eliminado',
                'success'
            )
        }
    })
}
function editar(run){
    let persona = listapersonas.find(p => p.run == run)
    document.getElementById('run').value = persona.run
    document.getElementById('nombre').value = persona.nombre
    document.getElementById('fecha').value = persona.fecha
    document.getElementById('fono').value = persona.fono
    document.getElementById('email').value = persona.email
    document.getElementById('estadocivil').value = persona.estado
    document.getElementById('femenino').checked = persona.sexo == 'femenino' ?? true
    document.getElementById('masculino').checked = persona.sexo == 'masculino' ?? true   
    document.getElementById('comentario').value = persona.comentario
}
