function getCurrentDateOrdinalSuffixes() {
	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = currentDate.toLocaleString("default", { month: "long" });
	const year = currentDate.getFullYear();

	return `${month} ${day}${getOrdinalSuffixes(day)}, ${year}`;
}

function getOrdinalSuffixes(currentDay: number) {
	if (currentDay > 3 && currentDay < 21) return "th";
	switch (currentDay % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

function formatChatTime(dateObject: Date) {
	const hour = dateObject.getHours();
	let formattedHour = hour % 12;
	if (formattedHour === 0) {
		formattedHour = 12;
	}
	const minutes = dateObject.getMinutes();
	const amOrPm = hour < 12 ? "AM" : "PM";
	let formattedTime = `${formattedHour}:${
		minutes < 10 ? "0" : ""
	}${minutes} ${amOrPm}`;

	const now = new Date();
	const today = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate()
	).valueOf();
	const weekAgo = today - 7 * 24 * 60 * 60 * 1000;
	const dateValue = dateObject.valueOf();

	if (dateObject.getTime() === new Date().getTime()) {
		formattedTime = `${formattedTime}`;
	} else {
		if (dateValue < today && dateValue >= weekAgo) {
			const day = dateObject.getDay();
			formattedTime = `${
				[
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				][day]
			}, ${formattedTime}`;
		} else {
			const month = dateObject.getMonth() + 1;
			const day = dateObject.getDate();
			const year = dateObject.getFullYear();
			if (year !== new Date().getFullYear()) {
				formattedTime = `${month}/${day}/${year} ${formattedTime}`;
			} else {
				formattedTime = `${month}/${day} ${formattedTime}`;
			}
		}
	}

	return formattedTime;
}

export { getCurrentDateOrdinalSuffixes, formatChatTime };
