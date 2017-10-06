
$('#lang').change(function(){
    var me = FJ('Fadzil', 'Jusri');
    me.setLang($('#lang').val()).HTMLGreeting('#greeting').log();
});