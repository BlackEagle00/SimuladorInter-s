function generatePDF(){
    const element = document.getElementById('abc');
    var dni = document.getElementById('dni').value;
   var opt = {
  margin:       0.25,
  filename:     dni +'-Amortizacion.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'in', format: 'a3', orientation: 'landscape' }
};


html2pdf().set(opt).from(element).save();

//html2pdf(element, opt);
}