
// const nombre = document.getElementById('nombre');
// const dni = document.getElementById('dni');


//const btnCalcular = document.getElementById('btnCalcular');
const llenarTabla = document.querySelector('#lista-tabla tbody');

// btnCalcular.addEventListener('click', () => {
//     calcularCuota();
// })

function calcularCuota(){

    //Limpiar registros de tabla para nueva ejecución
    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let ip = document.getElementById('periodo_vencido').value/100.0;
    let monto = document.getElementById('monto').value;
    //let efectivoAnual = (document.getElementById('efectivo_anual').value)/100;
    let plazo = document.getElementById('plazo').value;
    let amortizacion = document.getElementById('amortizacion').value;
    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);

    //let ip = (Math.pow((1+efectivoAnual), amortizacion/360)-1);
    let n = (plazo/(amortizacion/30));

    //let cuotaFija = monto *(((Math.pow(1+ip), n)*ip) / (Math.pow((1+ip), n)-1));
    let cuotaFija = monto *((Math.pow((1+ip), n)*ip) / (Math.pow((1+ip), n)-1));

    //fechas[i] = mes_actual.format('DD-MM-YYYY');
    
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>0</td>
        <td>${mes_actual.format('DD-MM-YYYY')}</td>
        <td>$${monto.toLocaleString(undefined,{minimumFractionDigits:2})}</td>
        <td>$ - </td>
        <td>$ - </td>
        <td>$ - </td>
        <td>$${monto.toLocaleString(undefined,{minimumFractionDigits:2})}</td>
    `;
    let suma_mes = amortizacion/30;
    mes_actual.add(suma_mes, 'month');
    llenarTabla.appendChild(row)

    for (let i = 1; i <= n; i++){
        
        let pagoInteres = monto * ip;
        let pagoCapital = cuotaFija - pagoInteres;
        monto -= pagoCapital;
        
        fechas[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(suma_mes, 'month');
        let row = document.createElement('tr');
        //llamar format

        row.innerHTML = `
            <td>${i}</td>
            <td>${fechas[i]}</td>
            <td>$${monto.toLocaleString(undefined,{minimumFractionDigits:2})}</td>
            <td>$${pagoCapital.toLocaleString(undefined,{minimumFractionDigits:2})}</td>
            <td>$${pagoInteres.toLocaleString(undefined,{minimumFractionDigits:2})}</td>
            <td>$${cuotaFija.toLocaleString(undefined,{minimumFractionDigits:2})}</td>
            <td>$${cuotaFija.toLocaleString(undefined,{minimumFractionDigits:2})}</td>
        `;
        llenarTabla.appendChild(row)
    }
}

$("#dni").on({
    "focus": function (event) {
        $(event.target).select();
    },
    "keyup": function (event) {
        $(event.target).val(function (index, value ) {
            return value.replace(/\D/g, "")
                        //.replace(/([0-9])([0-9]{0})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d).?)/g, ".");
        });
    }
});

// $("#monto").on({
//     "focus": function (event) {
//         $(event.target).select();
//     },
//     "keyup": function (event) {
//         $(event.target).val(function (index, value ) {
//             return value.replace(/\D/g, "")
//                         //.replace(/([0-9])([0-9]{0})$/, '$1.$2')
//                         .replace(/\B(?=(\d{3})+(?!\d).?)/g, ".");
//         });
//     }
// });


//window.onload = calcularCuota();