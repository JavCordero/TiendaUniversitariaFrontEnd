export function stringToDateToString(fechaString:string) {
    const mesesNombre= ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const fechaDate = new Date(fechaString);   
    const stringFecha = `${fechaDate.getDate()} ${mesesNombre[fechaDate.getMonth()]} del ${fechaDate.getFullYear()}`;
    return stringFecha;
}

export function mayusculaPrimeraLetra(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }