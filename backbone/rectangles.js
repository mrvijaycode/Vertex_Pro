(function () {
	var Rectangle = Backbone.Model.extend({});
	var RectangleView = Backbone.View.extend({
		tagName:'div',
		className:'rectangle',
		
		render:function(){
			this.setDimensions();
		},
	});
	}
})();