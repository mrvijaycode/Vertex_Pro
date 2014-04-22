Person = Backbone.Model.extend({
	defaults: {
		name: "Madhu",
		age: 19
	},
	initialize: function() {
		alert("Welcome to this world");
		this.on("change:name", function(model) {
			var name = model.get("name");
			alert("Changed my name to " + name);
		});
	},
	adopt: function(newChildName) {
		this.set({
			child: newChildName
		});
	}
});

var _person = new Person({
	name: "Vijay",
	age: 29
});

_person.set({
	name: "Amar"
});

var age = _person.get("age");
var name = _person.get("name");
_person.adopt("Samyukta");
var child = _person.get("child");

$("div#canvas").html(name + age + "<br>Children:" + child);
//$("div#canvas").html();

//Started View
SearchView = Backbone.View.extend({
	initialize: function() {
		alert("Alerts suck");
	}
});

//var search_View=new SearchView();
var search_View=new SearchView({el:$("#srhContainer")});
