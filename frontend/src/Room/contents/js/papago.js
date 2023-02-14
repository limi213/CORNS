function changeTranslationLang(){
    var sourceText = $("#roomViewTranslationSource").text();
    var sourceValue = $("#roomViewTranslationSourceValue").val();

    $("#roomViewTranslationSource").text($("#roomViewTranslationTarget").text());
    $("#roomViewTranslationSourceValue").val($("#roomViewTranslationTargetValue").val());

    $("#roomViewTranslationTarget").text(sourceText);
    $("#roomViewTranslationTargetValue").val(sourceValue);

}

function papago(){
// function papago(source, targer, text){

    if($("#roomViewTranslationText").val().length == 0){
        alert("번역할 말을 입력하세요");
        return;
    }

    var papagoData = {
        "source" : $("#roomViewTranslationSourceValue").val(),
        "target" : $("#roomViewTranslationTargetValue").val(),
        "text" : $("#roomViewTranslationText").val()
    };

    console.log(papagoData)

	$.ajax({
		type : "POST",
		url : serverUrl + "util/translation",    
		headers: { "Content-Type": "application/json",
					"Authorization" : "Basic " + accessToken,
					"Access-Control-Allow-Credentials" : "true"},    
		contentType : "application/json",
		data : JSON.stringify(papagoData),
		success: function(data, textStatus, xhr) {
			$("#roomViewTranslationResult").text(data.result);
		},
		error:function(request,status,error){
			console.log(request);
			console.log(status);
			console.log(error);
		}
	});
}