/* fill images and titles div ids with HTML from XML*/
var currentSlide = 0; /* keeps track of slide first book shown by default */

loadXML();

function loadXML()
{
	var xmlhttp = new XMLHttpRequest(); /* create new object */
	xmlhttp.onreadystatechange = function() /* define a function to be called when readyState changes */
	{
		if (this.readyState == 4 && this.status == 200) /* request finished and response ready, status OK */
		{
			writeHTML(this); /* execute function which uses xml file */
		}
	};
	xmlhttp.open("GET", "catalog.xml", true); /* method, file url, asynchronous */
	xmlhttp.send(); /* send request to server */
}

/*
<div id = "slideshow">

	<div id = "thumbnails">
		<img class = "thumb" src = "" onclick = "showSlide(n)" alt = "Title Cover">
	</div>
	
	<div id = "images">
    	<img class = "img" src = "" alt = "Title Thumbnail">
    </div>
 
    <a class = "prev"> < </a>
    <a class = "next"> > </a>
	
	<div id = "text">
		<div class = "caption">
			<h3>Title</h3>
			<h4>Author</h4>
			<span class = "description">Description</span>
		</div>
    </div>
</div>

*/

function writeHTML(xml)
{
	var i;
	var xmlDoc = xml.responseXML; /*response data as xml data */
	var x = xmlDoc.getElementsByTagName("book");
	var imgCode = "";
	var thumbCode = "";
	var textCode = "";
		
	for (i = 0; i < x.length; i++)
	{
		imgCode += '<img class = "img" src = "' +
			x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue +
			'" alt = "' + x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			' Cover">';
		document.getElementById("images").innerHTML = imgCode;
		
		thumbCode += '<img class = "thumb" src = "' +
			x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue +
			'" alt = "' + x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			' Thumbnail" onclick = "showSlide(' + i + ')">';
		document.getElementById("thumbnails").innerHTML = thumbCode;
		
		textCode += '<div class = "caption"><h3>' +
			x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			"</h3><h4>" +
			x[i].getElementsByTagName("author")[0].childNodes[0].nodeValue +
			'</h4><span class = "description">' +
			x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
			"</span></div>";
		document.getElementById("text").innerHTML = textCode;
	}
}

function showSlide(slideNo)
{
	var i;
	var img = document.querySelectorAll(".img");
	var thumb = document.querySelectorAll(".thumb");
	var caption = document.querySelectorAll(".caption");
	var maxBooks = document.querySelectorAll(".img").length;
	
	for (i = 0; i < maxBooks; i++)
	{
		if (i == slideNo)
		{
			img[i].style.display = "block";
			caption[i].style.display = "block";
			thumb[i].className += " active"
		}
		else
		{
			img[i].style.display = "none";
			caption[i].style.display = "none";
			thumb[i].className = "thumb"
		}
		
	}
	
	currentSlide = slideNo;
}

function changeSlide(next)
{
	currentSlide += next;
	var maxBooks = document.querySelectorAll(".img").length;
	
	if (currentSlide == maxBooks)
	{
		currentSlide = 0;
	}
	else if (currentSlide < 0)
	{
		currentSlide = (maxBooks - 1);
	}
	
	showSlide(currentSlide);
}

