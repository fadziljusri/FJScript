
$('#lang').change(function(){
    var me = FJ('Fadzil', 'Jusri');
    $('#links').show();
    me.setLang($('#lang').val()).HTMLGreeting('#greeting').log();
});