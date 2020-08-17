
var inputFile = document.getElementById('customFileInput');

$(document).ready(function () {
    bsCustomFileInput.init()
  });

$(".time-slider").ionRangeSlider({
    skin: "round",
    type: "double",
    min: 0,
    max: 180,
    step: 20,
    from: 60,
    to: 120,
    grid: true,
    decorate_both: false,
    values_sepataror: " - ",
    max_postfix: '+ ',
});

$(".complex-slider").ionRangeSlider({
    skin: "round",
    type: "double",
    values: ['very simple', 'simple', 'medium', 'complex', 'very complex'],
    grid: false,
    decorate_both: false,
    values_sepataror: " - ",
});


inputFile.onchange = function(e) {
  var ext = this.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'csv':
    case 'xls':
    case 'xlsx':
      break;
    default:
      alert('File type not allowed. Please choose a .csv .xls or .xlsx file.');
      this.value = '';
  }
};