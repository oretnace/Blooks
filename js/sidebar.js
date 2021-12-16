
featuredLoadXML();

function featuredLoadXML()
{
	var xmlhttp = new XMLHttpRequest(); /* create new object */
	xmlhttp.onreadystatechange = function() /* define a function to be called when readyState changes */
	{
		if (this.readyState == 4 && this.status == 200) /* request finished and response ready, status OK */
		{
			featuredWriteHTML(this); /* execute function which uses xml file */
		}
	};
	xmlhttp.open("GET", "catalog.xml", true); /* method, file url, asynchronous */
	xmlhttp.send(); /* send request to server */
}

/*

<div id = "bookWeek">
	<h4>
		Book of the Week
	</h4>
	<img class = "featured" src = "images/" alt = "Book of the Week">
</div>

<div id = "bookBest">
	<h4>
		Best Seller
	</h4>
	<img class = "featured" src = "images/" alt = "Best Seller">
</div>

<div id = "bookNew">
	<h4>
		Newest
	</h4>
	<img class = "featured" src = "images/" alt = "Newest">
</div>
*/

function featuredWriteHTML(xml)
{
	var i;
	var xmlDoc = xml.responseXML; /*response data as xml data */
	var x = xmlDoc.getElementsByTagName("book");
	var weekCode = "";
	var bestCode = "";
	var newCode = "";

	/* manually choose index of book, here, 7th book is chosen*/
	weekCode += '<h4>Book of the Week</h4><img class = "featured" src = "' +
		x[6].getElementsByTagName("image")[0].childNodes[0].nodeValue +
		'" alt = "Book of the Week">';
	document.getElementById("bookWeek").innerHTML = weekCode;
	
	/* manually choose index of book, here, 3th book is chosen*/
	bestCode += '<h4>Bestseller</h4><img class = "featured" src = "' +
		x[2].getElementsByTagName("image")[0].childNodes[0].nodeValue +
		'" alt = "Best Seller">';
	document.getElementById("bookBest").innerHTML = bestCode;
	
	/* gets the last item in xml file*/
	newCode += '<h4>Newly Added</h4><img class = "featured" src = "' +
		x[x.length - 1].getElementsByTagName("image")[0].childNodes[0].nodeValue +
		'" alt = "Newest">';
	document.getElementById("bookNew").innerHTML = newCode;

}