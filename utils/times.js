import moment from 'moment';

const Times = (type, value) => {
	switch (type) {
		case 0:
			return moment().startOf('day').seconds(value).format('mm:ss');
		case 1:
			return moment().utc().format();
		case 2:
			return moment(value).utc();
	}
}

export default Times