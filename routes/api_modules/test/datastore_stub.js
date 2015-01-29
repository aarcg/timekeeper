module.exports = {
	data: {
		items: [{
			id: '1',
			description: 'test'
		}]
	},
	selectCustomerItems: function selectCustomerItems (id, callback) {
		if (id && this.data.hasOwnProperty(id)) {
			callback(null, data[id]);
		} else if (id && !this.data.hasOwnProperty(id)) {
			callback('Id not found', null);
		} else {
			callback(null, data);
		}
	}
};