

function Boton(){

    return(
       
<div className="Formulario-Registro">
<form>
<label for="Name">Nombres completos</label>
<input type="text" id="Name" name="Name" />
<label>Apellidos</label>
<input type="text" id="Apellidos" name="Name" />
<label>Telefono</label>
<input type="number" id="Telefono" name="Telefono"/>
<label>Edad</label>
<input type="number" id="Edad" name="Edad"/>
<label>Fecha de nacimiento</label>
<input type="date" id="Edad" name="Edad"/>
</form>
</div>
       
        
    );
}

export default Boton;



