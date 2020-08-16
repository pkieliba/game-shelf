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