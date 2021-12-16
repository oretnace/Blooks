
loadXML();

function loadXML()
{
	var xmlhttp = new XMLHttpRequest(); /* create new object */
	xmlhttp.onreadystatechange = function() /* define a function to be called when readyState changes */
	{
		if (this.readyState == 4 && this.status == 200) /* request finished and response ready, status OK */
		{
			writeBooks(this); /* execute function which uses xml file */
		}
	};
	xmlhttp.open("GET", "catalog.xml", true); /* method, file url, asynchronous */
	xmlhttp.send(); /* send request to server */
}

/*
<div id = "bookItem">
	<input type = "checkbox" name = "bookList" class = "bookList" onclick = "updateTotal()"
	value = "Price" id = "bookItem(Index)">
	<label for = "bookItem(Index)">
		<div class = "label">
			<img src = "Image" alt = "Title" class = "thumbnail">
			<h3>Title</h3>
		</div>
		<div class = "price">
			<h4>Price</h4>
		</div>
	</label>
</div>
*/

function writeBooks(xml)
{
	var i;
	var xmlDoc = xml.responseXML; /*response data as xml data */
	var x = xmlDoc.getElementsByTagName("book");
	var bookList = "";
		
	for (i = 0; i < x.length; i++)
	{
		bookList += '<div id = "bookItem">' +
			'<input type = "checkbox" name = "bookList" class = "bookList" onclick = "updateTotal()" value = "' +
			x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue +
			'" id = "bookItem' + i + '"><label for = "bookItem' + i +
			'"><div class = "label"><img src = "' +
			/* insert image url */
			x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue +
			'" alt = "' +
			/* alt */
			x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			'" class = "thumbnail"><h3>' +
			x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
			'</h3></div><div class = "price"><h4>&pound ' +
			x[i].getElementsByTagName("price")[0].childNodes[0].nodeValue +
			'</h4></div></label></div>';
			/* add to code */
		document.getElementById("books").innerHTML = bookList;
	}
}

function updateTotal()
{
	var i;
	var total = 0;
	var bookList = document.forms["order"]["bookList"];
	var deliverMethod = document.forms["order"]["deliverMethod"].value;
	var price = 0;
	
	for(i = 0; i < bookList.length; i++)
	{
		price = Number(bookList[i].value);
		if (bookList[i].checked)
		{
			total += price;
		}
	}
	if (deliverMethod == "Standard")
	{
		total += 2.99;
	}
	else if (deliverMethod == "Next Day")
	{
		total += 8.99;
	}
	else
	{
		if (deliverMethod == "Collect In-Store")
		{
			document.getElementById("collectAddr").style.display = "block";
		}
		total += 0;
	}
	
	document.forms["order"]["total"].value = total;
}

function checkPayMethod()
{
	var i;
	var field = document.getElementById("cardInfo");
	var cardFields = document.getElementsByClassName("cardInfo");
	var cardPay = document.getElementById("cardPay");
	
	/* card option */
	if (cardPay.checked)
	{
		for (i = 0; i < cardFields.length; i++)
		{
			cardFields[i].required = true;
			cardFields[i].disabled = false;
			field.style.display = "block";
		}
	}
	/* paypal option */
	else
	{
		for (i = 0; i < cardFields.length; i++)
		{
			cardFields[i].required = false;
			cardFields[i].disabled = true;
			field.style.display = "none";
		}
	}
}

function checkCountry()
{
	var opt = document.forms["order"]["shipCountry"].value;
	var field = document.forms["order"]["shipOtherCountry"];
	/* display and enable if other is selected, required */
	if (opt == "other")
	{
		field.required = true;
		field.disabled = false;
		field.style.display = "block";
	}
	/* else disable and not required */
	else
	{
		field.required = false;
		field.disabled = true;
		field.style.display = "none";
	}
}

function validateForm()
{	
	/* check if any books selected */
	var bookList = document.forms["order"]["bookList"];
	var emptyCount = 0;
	for (i = 0; i < bookList.length; i++)
	{
		if (bookList[i].checked == false)
		{
			emptyCount++;
		}
	}
	
	

	var cardOpt = document.getElementById("cardPay");
	/* cardNumber (16 digits) */
	var cardNumber = document.forms["order"]["cardNumber"].value;
	var cardNumAlert = "Credit/Debit Card Number:\nPlease enter a valid 16 digit number";
	
	/* securityCode (3 digits) */
	var securityCode = document.forms["order"]["securityCode"].value;
	var secCodeAlert = "Security Code:\nPlease enter a valid 3 digit number";
	
	/* buyerNumber (10 or 11 digits) */
	var buyNumber = document.forms["order"]["buyNumber"].value;
	var buyNumAlert = "Phone Number:\nPlease enter a valid 11 digit phone number (no need for area code)";
	
	/* check if any books selected */
	if (emptyCount == bookList.length)
	{
		alert("Your basket is empty");
		return false;
	}
	/* check if card first */
	else if (cardOpt.checked)
	{
		/* cardNumber (16 digits) */
		if (cardNumber == "" || cardNumber.length !== 16 || isNaN(cardNumber))
		{
			alert(cardNumAlert);
			return false;
		}
		/* securityCode (3 digits) */
		else if (securityCode == "" || securityCode.length !== 3 || isNaN(securityCode))
		{
			alert(secCodeAlert);
			return false;
		}
	}
	
	/* if in case paypal, buyerNumber 11 digits */
	if ((buyNumber !== "")&(buyNumber.length !== 11) || isNaN(buyNumber))
	{
		alert(buyNumAlert);
		return false;
	} 
	/* all fields are valid */
	else
	{
		submitOrder();
	}
}

function submitOrder()
{
	/* hide form and page intro*/
	document.getElementById("orderForm").style.display = "none";
	document.getElementById("orderIntro").style.display = "none";
	
	/* get form values to replace items in order receipt, display hidden */
	document.getElementById("orderDetails").style.display = "block";
	
	/* first para */
	document.getElementById("orderFirstName").innerHTML = document.forms["order"]["buyFirstName"].value;
	document.getElementById("orderEmail").innerHTML = document.forms["order"]["buyEmail"].value;
	
	/* basket */
	var i;
	var basket = "";
	var bookList = document.forms["order"]["bookList"];
	var imgList = document.getElementsByClassName("thumbnail");
	for (i = 0; i < bookList.length; i++)
	{
		if (bookList[i].checked)
		{
			basket += String(imgList.alt) + "<br>";
		}
	}
	document.getElementById("orderBasket").innerHTML = basket;
	
	/* delivery and price */
	var deliverMethod = document.forms["order"]["deliverMethod"].value;
	document.getElementById("orderDelivery").innerHTML = deliverMethod;
	if (deliverMethod == "Collect In-Store")
	{
		document.getElementById("orderCollect").style.display = "block";
	}
	document.getElementById("orderPrice").innerHTML = document.forms["order"]["total"].value;
	
	/* shipped to */
	document.getElementById("orderAddr").innerHTML = document.forms["order"]["shipAddr"].value;
	document.getElementById("orderCity").innerHTML = document.forms["order"]["shipCity"].value;
	document.getElementById("orderCounty").innerHTML = document.forms["order"]["shipCounty"].value;
	document.getElementById("orderPostcode").innerHTML = document.forms["order"]["shipPostcode"].value;
	if (document.forms["order"]["shipCountry"].value == "other")
	{
		document.getElementById("orderCountry").innerHTML = document.forms["order"]["shipOtherCountry"].value;
	}
	else
	{
		document.getElementById("orderCountry").innerHTML = document.forms["order"]["shipCountry"].value;
	}
	
	/* payment method */
	/* check if card first */
	var cardPay = document.getElementById("cardPay");
	
	document.getElementById("orderPay").innerHTML = document.forms["order"]["payMethod"].value;
	
	/* if card */
	if (cardPay.checked)
	{
		document.getElementById("orderCard").style.display = "block";
		document.getElementById("orderCardFName").innerHTML = document.forms["order"]["cardFirstName"].value;
		document.getElementById("orderCardLName").innerHTML = document.forms["order"]["cardLastName"].value;
		var x = document.getElementById("orderCardNum");
		x.innerHTML = document.forms["order"]["cardNumber"].value.slice(-4, x.length);
	}
	
	return false;
}
