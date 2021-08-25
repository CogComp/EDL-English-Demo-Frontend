
var xel_examples = {
    "eng": [
		"Sigmund Freud was an Austrian neurologist and the founder of psychoanalysis, a clinical method for treating psychopathology through dialogue between a patient and a psychoanalyst. Freud was born to Galician Jewish parents in the Moravian town of Freiberg, in the Austrian Empire. He qualified as a doctor of medicine in 1881 at the University of Vienna. Freud lived and worked in Vienna, having set up his clinical practice there in 1886. In 1938, Freud left Austria to escape Nazi persecution. He died in exile in the United Kingdom in 1939.",
        "Barack Hussein Obama II is an American politician and attorney who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, Obama was the first African-American president of the United States. He previously served as a U.S. senator from Illinois from 2005 to 2008 and an Illinois state senator from 1997 to 2004.",
		"Mohandas Karamchand Gandhi was an Indian lawyer, anti-colonial nationalist, and political ethicist. He employed nonviolent resistance to lead the successful campaign for India's independence from British rule, and in turn inspired movements for civil rights and freedom across the world. The honorific Mahātmā, first applied to him in 1914 in South Africa, is now used throughout the world.",
		"Two bombs were detonated in Boston."		
    ]
}
var xel_langs = {
    "eng": "English"
}

function fillLanguageSelectField() {
	selectField = document.getElementById("lang");
	textField = document.getElementById("text");
	for (var key in xel_langs) {
		if (xel_langs.hasOwnProperty(key)) {           
			var opt = document.createElement("option");
			opt.value=key;
			opt.innerHTML = xel_langs[key]; // ["lang"]; 
			selectField.appendChild(opt);
		}
	}	
	selectField.value = "eng";
	// textField.value = xel_langs["eng"]["text"];
	fillExampleSelectField(selectField.value)
}

function newLanguageSelect() {
	hideResult();
	langSelectField = document.getElementById("lang");
	lang = langSelectField.value;
	fillExampleSelectField(lang);
	//textField = document.getElementById("text");
	//textField.value = xel_langs[languageSelected]["text"]; 
	//$("#result").html( "" );
}

function fillExampleSelectField(lang="eng") {
	hideResult();
	// lang="eng";
	// alert("examples...");
	$("#example").empty();
	selectField = document.getElementById("example");
	textField = document.getElementById("text");
	idx = 0;
	for (var example in xel_examples[lang]) {
		var opt = document.createElement("option");
		opt.value=idx;
		opt.innerHTML = xel_examples[lang][idx].substring(0,50)+"..."; 
		selectField.appendChild(opt);
		idx += 1;
	}	
	selectField.value = "0";
	textField.value = xel_examples[lang][0];
}

function newExampleSelect() {
	hideResult();
	//langSelectField = document.getElementById("lang");
	//lang = langSelectField.value;
	lang='eng'
	exampleSelectField = document.getElementById("example");
	example = exampleSelectField.value;
	textField = document.getElementById("text");
	// textField.value = xel_langs[languageSelected]["text"]; 
	textField.value = xel_examples[lang][example]; 
}

function getSelectedAnnotators() {
	var selectedAnnotators = [];
	var annotator_buttons = document.getElementsByClassName('annotator');
	for(var i = 0; i<annotator_buttons.length;i++)
	{
		var ann_button = annotator_buttons[i];
		//console.log(checkbox_button);
		if(ann_button.checked) {
			//alert(ann_button.id);
			var text_of_button = ann_button.id;
			//console.log(text_of_button);
			selectedAnnotators.push(text_of_button);
		}
	}
	return selectedAnnotators;
}

function hideResult() {
	$("#result").hide();
	$("#result").html("");
}

function showResult() {
	$("#result").show();
}

/*
async function httpPOST(url = '', data = {}, pfunction) {
  console.log(url);
  console.log(JSON.stringify(data));
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
	cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
        .then(json => {
                pfunction(json);
        });
}
*/

async function postInput(url = '', data = {}) {
	const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //mode: 'no-cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'omit', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
       // 'Accept': 'application/json, text/plaini, */*'
      //'Content-Type': 'application/json'
        //,'Data-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    //body: data
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function formSubmit() {
	hideResult();
	$("#result").html("Working...");
	showResult();
	anns = getSelectedAnnotators();
	lang = "eng"
	text = document.getElementById("text").value;
	data = {
		"lang": lang,
		"text": text,
		"anns": anns
	};
	url = "view";
	postInput(url, data)
		.then(data => {
			// console.log(data);
			$("#result").html(data.html);
			showResult();
    });
	// $("#result").html(anns.join(","));
	// showResult();
	return false;
}

function main() {
	fillExampleSelectField();
	//fillLanguageSelectField();
}


