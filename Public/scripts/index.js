$(document).ready(function () {



	var data = null;
	var screen = $('#disabled');
	configureLoadingScreen(screen);

	$.ajax({
			url:"?c=contacto&a=getDepartamento",
			type:"GET",
		}).done(function(argument) {
			data = argument;
			getSelect("#departamentos", data); 
			// console.log(argument);
	});

	function getSelect(id, departamentos) {

		$.each(JSON.parse(departamentos), function(key,value) {
			// console.log(key);
			$(id).append("<option value = '"+key+"'>"+key+"</option>");
		});
		
	}

	$("#departamentos").on("change", function(event) {
		$("#departamentos-error").hide();
		var id = $(this).val();

		var value = $(this).val();

		if (value==0) {
			$("#ciudades").attr("disabled","true");
			$("#ciudades").empty().append("<option value='-1'>Seleccione</option>");
			
		}else{

			$.each(JSON.parse(data), function(key,value){
				if (id == key) {
					getCiudades(value);
				}
			});
		}
	});

	$("#ciudades").on("change", function(event) {
		$("#ciudades-error").hide();
	});

	function getCiudades(ciudades) {
		
		$.each(ciudades, function(key,value) {
			$("#ciudades").removeAttr("disabled");
			$("#ciudades").append("<option value = '"+value+"'>"+value+"</option>");
		});
	}

	function validaForm(){
	   	if($("#departamentos").val() == ""){
	    	$("#departamentos-error").show();
	        $("#departamentos-error").html("Por favor eseleccione el departamento");
	        $("#departamentos").focus();
	        return false;
	    }
	    if($("#ciudades").val() == ""){
	    	$("#ciudades-error").show();
	        $("#ciudades-error").html("Por favor Seleccione la ciudad");
	        $("#ciudades").focus();
	        return false;
	    }

	    if($("#nombre").val() == ""){
	    	$("#nombre-error").show();
	    	$("#nombre-error").html("Por favor escribe tu nombre");
	        $("#nombre").focus();       
	        return false;
	    }
	    if($("#gmail").val() == ""){
	    	$("#gmail-error").show();
	    	$("#gmail-error").html("Por favor escribe tu gmail");
	        $("#gmail").focus();
	        return false;
	    }

	    return true; // Si todo está correcto
	}

	$("#form-contacto").on("submit", function(event) {

		event.preventDefault();	
		var data = $(this).serialize();

		if(validaForm()){ 
			$.ajax({
				url:"?c=contacto&a=insertContacto",
				type:"POST",
				data:data,
			}).done(function(argument) {
				
				$("#alert").show();
				$("#alert").html(argument);

				$("#departamentos").val("");
				$("#ciudades").val("");
				$("#nombre").val("");
				$("#gmail").val("");
				$(".error").hide();

				setTimeout(function() {
	                $('#alert').fadeOut('slow');
	            }, 5000);
			});
		}	

	});

	$("#nombre").keyup(function(){
		$("#nombre-error").hide();
	});

	$("#gmail").keyup(function(){
		$("#gmail-error").hide();
	});

	function configureLoadingScreen(screen) {
    	$(document)
    		.ajaxStart(function(){
    			screen.fadeIn();
    		})
    		.ajaxStop(function(){
    			screen.fadeOut();
    		});
    }


});