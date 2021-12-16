/* replaces catalog div in web page */

loadXML();

function loadXML()
{
	var xmlhttp = new XMLHttpRequest(); /* create new object */
	xmlhttp.onreadystatechange = function() /* define a function to be called when readyState changes */
	{
		if (this.readyState == 4 && this.status == 200) /* request finished and response ready, status OK */
		{
			writeCatalog(this); /* execute function which uses xml file */
		}
	};
	xmlhttp.open("GET", "catalog.xml", true); /* method, file url, asynchronous */
	xmlhttp.send(); /* send request to server */
}

/*
<div class = "catalog">
	<div class = "book">
    	<div class = "tag">
        	<img class = "tagImg" src = "Picture" alt = "Title">
			<h3>Title</h3>
            <h4>Author</h4>
            <h5>Genre</h5>
            <h4>&poundPrice</h4>
        </div>
        <div class = "details">
            <p>Description</p>
			<h5>Published X by X</h5>
        </div>
    </div>
	...
</div>
*/

function writeCatalog(xml)
{
	var i;
	var xmlDoc = xml.responseXML; /*response data as xml data */
	var x = xmlDoc.getElementsByTagName("book");
	var catalog = "";
		
	for (i = 0; i < x.length; i++)
	{
		catalog += '<div class = "book"><div class = "tag"><img class = "tagImg" src = "' +
			/* insert image url */
			x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue +
			'" alt = "' +
			x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			'"><h3>' +
			x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			"</h3><h4>" +
			x[i].getElementsByTagName("author")[0].childNodes[0].nodeValue +
			"</h4><h5>" +
			x[i].getElementsByTagName("genre")[0].childNodes[0].nodeValue +
			"</h5><h4>&pound" +
			x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue +
			'</h4></div><div class = "details"><p>' +
			x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
			"</p><h5>Published " +
			x[i].getElementsByTagName("publicationDate")[0].childNodes[0].nodeValue +
			" by " +
			x[i].getElementsByTagName("publisher")[0].childNodes[0].nodeValue +
			"</h5></div></div>";
			/* add to code */
		document.getElementById("catalog").innerHTML = catalog;
	}
}