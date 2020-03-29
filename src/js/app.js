function showCommonDestination() {
	//TODO: autoformat this strings
	//TODO: keep market as parameter as well
	const url1 = `https://www.ryanair.com/api/locate/v1/autocomplete/routes?arrivalPhrase=&departurePhrase=${$("#input1").val()}&market=it-it`;
	const url2 = `https://www.ryanair.com/api/locate/v1/autocomplete/routes?arrivalPhrase=&departurePhrase=${$("#input2").val()}&market=it-it`;
	const dest1 = getRequest(url1);
	const dest2 = getRequest(url2);

	Promise.all([dest1, dest2]).then(values => {
		const commonDestinations = getCommonDestinations(...values);
		appendHTML(commonDestinations);
	}).catch(error => {
		console.log(error)
	});
}

async function getRequest(url){
	try {
		const response = await fetch(url);
		const jsonRest = await response.json();

		return jsonRest;
	} catch (error) {
		console.log(error);
	}
}

function getCommonDestinations(dest1, dest2) {
	const res = [];
	dest1.forEach(dep => {
		dest2.forEach(arr => {
			//TODO: improve this comparison
			if(dep["arrivalAirport"]["city"]["name"] === arr["arrivalAirport"]["city"]["name"]) {
				res.push(dep);
			}
		});
	});
	return res;
}

function appendHTML(commonDestinations) {
	$(".card").remove();
	
	commonDestinations.forEach(dest => {
		$(".cards").append(
			`<div class="card">
				<h2>${dest["arrivalAirport"]["country"]["name"]}</h2>
				<p>${dest["arrivalAirport"]["city"]["name"]} (${dest["arrivalAirport"]["code"]})</p>
			</div>`
		);
	});
}