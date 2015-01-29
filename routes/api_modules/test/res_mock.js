module.exports = {

	layout: '',
	
	rendered: '',

	status: function(status) {
		return this;
	},

	set: function(value) {
		return this;
	},

	render: function(layout, objToRender) {
		this.rendered = objToRender;
		return this;
	}

}