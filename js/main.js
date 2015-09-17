function Reference(authors, year, title) {
	this.authors = authors.split(/[\|]+/);
	this.year = year;
	this.title = title;
};
Reference.prototype = {
	inText: function() {
		//TO DO Optimize ampersand and commas, Refactor to a method?
		var authorsArrayNoFirstName = [];
		for (var i = 0; i < this.authors.length	; i++) {
				authorsArrayNoFirstName[i] = this.authors[i].split(',')[0];
		};
		var authorString = authorsArrayNoFirstName[0];
		if (authorsArrayNoFirstName.length == 2) {
			authorString = authorsArrayNoFirstName[0] + " & " + authorsArrayNoFirstName[1];
		}else if(authorsArrayNoFirstName.length == 3) { 
			authorString = authorsArrayNoFirstName[0] + ", " + authorsArrayNoFirstName[1] + " & " + authorsArrayNoFirstName[2];
		}
		else if(authorsArrayNoFirstName.length > 3){
			authorString = authorsArrayNoFirstName[0] + " et al.";
		}
		return "<p>(" + authorString + " " + this.year + ")</p>";
	}
};

function Book(authors, year, title, edited, editors, edition, publisher, placeOfPublication, chapter) {
	Reference.call(this, authors, year, title);
	this.edited = edited;
	this.editors = editors.split(/[\|]+/);
	this.edition = edition;
	this.publisher = publisher;
	this.placeOfPublication = placeOfPublication;
	this.chapter = chapter;
}
Book.prototype = Object.create(Reference.prototype, {
	inText: {
		value: function () {
			return Reference.prototype.inText.apply(this)
		},
		enumerable: true, 
		configurable: true, 
		writable: true 
	}
});
Book.prototype.referenceList = function() {
			//Todo authors and editors method.
			var reference = "<p>" + this.authors + " " + this.year + ", ";
			if (this.edited) {
				reference += "'" + this.chapter +"', in ";
				if (this.editors.length > 1) {
					reference += this.editors.split(',')[1] + " " + this.editors.split(',')[0] + " (ed), ";
				}else{

				}
			}
			reference += this.title.italics();	
			// if(edition != null) {
			// //do something with edition
			// }
			//todo page numbers
			reference += ", " + this.publisher + ", " + this.placeOfPublication + ".</p>";
			return reference;
};
Book.prototype.constructor = Book;


$("#bookButton").click(function() {
	var book = new Book($("#author").val(), $("#year").val(), $("#title").val(), 
		$("#editCheckbox").prop('checked'), $("#editor").val(), $("#edition").val(), 
		$("#publisher").val(), $("#placeOfPublication").val());
	$("#inTextReference").empty();
	$("#inTextReference").html(book.inText());
	$("#referenceList").empty();
	$("#referenceList").html(book.referenceList());
	console.log(book);
})
$("#sourceType").on("change", function() {
	if ($(this).val() == '') { 
		$("#sourceInformation").children().addClass("hidden");
	};
	$("#" + $(this).val() + "Fieldset").removeClass("hidden").siblings().addClass("hidden");
})

$("#editCheckbox").on("change", function() {
	if ($(this).is(':checked')) { 
		$("#editedInformation").removeClass("hidden");
	}else {
		$("#editedInformation").addClass("hidden");
	}
})

$("#onlineCheckbox").on("change", function() {
	if ($(this).is(':checked')) { 
		$("#onlineInformation").removeClass("hidden");
	}else {
		$("#onlineInformation").addClass("hidden");
	}
})