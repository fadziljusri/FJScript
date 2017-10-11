var data = [];

$('#lang').change(function () {
    
    var init = FJ();
    init.setLang($('#lang').val()).setHTMLFormLang();
    $('#contact').show();
});

function onSubmit() {
    $('#contact').hide();
    data = $('#contact').serializeArray(); 
    // console.log(data[0]);
    var me = FJ(data[0].value, data[1].value, data[2].value, data[3].value, data[4].value, data[5].value);
    me.setLang($('#lang').val()).HTMLGreeting('#greeting').HTMLInfo('#info').log();

    $('#info').show();    

    return false; //don't submit
}