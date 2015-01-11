function datetime(date) {
	//take a javascript date object and return a mysql datetime string

	var datetimeString = '';

	datetimeString += date.getFullYear();
	datetimeString += '-'; 
	datetimeString += (date.getMonth() + 1);
	datetimeString += '-';
	datetimeString += date.getDate();
	datetimeString += ' ';
	datetimeString += date.getHours();
	datetimeString += ':'
	datetimeString += date.getMinutes();
	datetimeString += ':';
	datetimeString += date.getSeconds();

	return datetimeString;
};

module.exports.datetime = datetime;