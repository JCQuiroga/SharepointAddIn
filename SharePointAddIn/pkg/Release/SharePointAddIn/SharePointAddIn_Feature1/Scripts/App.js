//Codigo de clase

'use strict';

var Colegas = window.Colegas || {};

//Colegas.App = function () {

var personasList;
var personas;
var context;

function init() {
    context = SP.ClientContext.get_current();
    getAllPersonas();
}

var getAllPersonas = function () {
    personasList = context.get_web().get_lists().getByTitle("Personas");
    personas = personasList.getItems(new SP.CamlQuery());
    context.load(personas);
    context.executeQueryAsync(onPersonasSuccess, onPersonasFail);
};
var onPersonasSuccess = function (sender, args) {
    var html = "<ul>";
    var personasEnum = personas.getEnumerator();

    while (personasEnum.moveNext()) {
        var actual = personasEnum.get_current();

        html += "<li>" + actual.get_item("Nombre") + " " +
            actual.get_item("Edad") + "</li>";
    }
    html += "</ul>";
    $("#lista").html(html);
};
var onPersonasFail = function (sender, args) {
    alert("Error:" + args.get_message());
};

var crearPersona = function () {
    var itemCreateInfo = new SP.ListItemCreationInformation();
    var actual = personasList.addItem(itemCreateInfo);
    actual.set_item("Nombre", $("#input-nombre").val());
    actual.set_item("Edad", $("#input-edad").val());
    actual.update();
    context.load(actual);
    context.executeQueryAsync(onCreateSuccess, onPersonasFail);
};
var onCreateSuccess = function (sender, args) {
    getAllPersonas();
};
/* return {
     getPersonas: getAllPersonas,
     createPersona: crearPersona,
     init: init
 }*/
//}
$(document).ready(function () {
    $("#button-add").bind("click", crearPersona);
    ExecuteOrDelayUntilScriptLoaded(
        function () {
            init();
        }
        , "sp.js");
});






































//'use strict';

//var Colegas = Window.Colegas|| {}; //Busca el objeto personas en la prop window de JS, y si no lo encuentra, lo crea nuevo (con el {} ).

//Colegas.App = function() {

//    var personasList;
//    var personas;
//    var context;

//    var init = function() {
//        context = SP.Clientcontext.get_current();
//    };

//    var getAllPersonas = function() {
//        personasList = context.get_web().get_lists().getByTitle("Personas"); //Este "Personas" debe ser el titulo de la lista. (Se ve el titulo en el apartado List)
//        personas = personasList.getItems(new SVGPoint.CamlQuery());
//        context.load(personas);
//        context.executeQueryAsync(onPersonasSuccess, onPersonasFail);
//    };

//    var onPersonasSuccess = function(sender, args) {
//        var html;
//        var personasEnum = getEnumerator();

//        while (personasEnum.moveNext()) {
//            var actual = personasEnum.get_current();

//            html += "<li>" + actual.get_item("Nombre") + " " + actual.get_item("Edad") + "</li>";
//        };
//        html += "</ul>";
//        $("#lista").html(html);
//    };

//    var onPersonasFail = function(sender, args) {
//        alert("Error:"+args.get_message());
//    };

//    var crearPersona = function() {
//        var itemCreateInfo = new SP.ListItemCreationInformation();
//        var actual = personasList.addItem(itemCreateInfo);
//        actual.set_item("Nombre", $("#input-nombre").val());
//        actual.set_item("Edad", $("#input-edad").val());
//        actual.update();
//        context.load(actual);
//        context.executeQueryAsync(onCreateSuccess, onPersonasFail);
//    };

//    var onCreateSuccess = function(sender, args) {
//        getAllPersonas();
//    }

//    return {
//        getPersonas: GetAllPersonas,
//        CreatePersona: CrearPersona,
//        init: init
//    }; //definimos los miembros publicos de la clase. T odo lo que no haya expuesto en el return es privado. nombre: funcion a la que llama. Para utilizarla habra que hacer Colegas.app.getPersonas.

//};
//$(document).ready(function() {
//    $("#button-add").bind("click", Colegas.App.CreatePersona);
//    ExecuteOrDelayUntilScriptLoaded(Colegas.App.init, "sp.js");
//});

//ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");
