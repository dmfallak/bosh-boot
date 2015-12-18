$().ready( function() {
  $("#get-started").click(function() {
    $("#index-banner").hide()
    $("#iaas").show()

    JSONEditor.defaults.options.theme = 'bootstrap3';
    var editor = new JSONEditor(document.getElementById("iaas-editor"),{
      "schema": {
        "title": "IAAS",
        "type": "object",
        "properties": {
            "Provider": {
              "type": "string",
              "enum": ["AWS"]
            }
        }
      }
    });
  })
} )
