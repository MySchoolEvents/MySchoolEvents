import React, { useState } from "react";
import { Modal, Title, TextInput, Stack, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { createNewEvent } from "@/helpers/FirebaseHelpers";
import { uuidv4 } from "@firebase/util";
import { getDateNumber } from "@/helpers/EventsDateConverter";

const NewEventModal = ({
	opened,
	setOpened,
	current,
	setCurrent,
	upcoming,
	setUpcoming,
	past,
	setPast,
}: any) => {
	const [dateVal, setDateVal] = useState<Date | null>(null);
	const [eventName, setEventName] = useState<string>("");
	const [eventLocation, setEventLocation] = useState<string>("");

	const addEvent = () => {
		// Add event to database

		// convert date to numeric value
		// @ts-ignore
		const month = dateVal.getMonth() + 1; // Adding 1 to the month value because it is zero-indexed
		// @ts-ignore
		const day = dateVal.getDate();
		const numericValue = month * 100 + day;
		const newID = uuidv4();

		// // current event
		// if (numericValue === getDateNumber()) {
		// 	let currentEventsClone = [...current];
		// 	currentEventsClone.push({
		// 		name: eventName,
		// 		location: eventLocation,
		// 		startTime: numericValue,
		// 		endTime: numericValue,
		// 		id: newID,
		// 	});

		// 	let sortedCurrentEventsClone = currentEventsClone.sort(
		// 		(a, b) => a.endTime - b.endTime
		// 	);

		// 	setCurrent(sortedCurrentEventsClone);
		// } else if (numericValue > getDateNumber()) {
		// 	// upcoming event
		// 	let upcomingEventsClone = [...upcoming];
		// 	upcomingEventsClone.push({
		// 		name: eventName,
		// 		location: eventLocation,
		// 		startTime: numericValue,
		// 		endTime: numericValue,
		// 		id: newID,
		// 	});

		// 	// sort upcoming events from smallest to largest start time
		// 	let sortedUpcomingEventsClone = upcomingEventsClone.sort(
		// 		(a, b) => a.startTime - b.startTime
		// 	);

		// 	setUpcoming(sortedUpcomingEventsClone);
		// } else if (numericValue < getDateNumber()) {
		// 	// past event
		// 	let pastEventsClone = [...past];
		// 	pastEventsClone.push({
		// 		name: eventName,
		// 		location: eventLocation,
		// 		startTime: numericValue,
		// 		endTime: numericValue,
		// 		id: newID,
		// 	});

		// 	// sort past events by by start date from lowest to
		// 	let sortedPastEventsClone = pastEventsClone.sort(
		// 		(a, b) => b.startTime - a.startTime
		// 	);

		// 	setPast(sortedPastEventsClone);
		// }

		createNewEvent(eventName, eventLocation, numericValue, numericValue, newID);

		resetState();
		// close modal
		setOpened(false);
		location.reload();
	};

	const resetState = () => {
		setDateVal(null);
		setEventName("");
		setEventLocation("");
	};

	return (
		<Modal
			withCloseButton={false}
			centered
			opened={opened}
			onClose={() => {
				setOpened(false);
			}}
		>
			<Stack>
				<Title>Add New Event</Title>

				<TextInput
					label="Event Name"
					placeholder="Event Name"
					onChange={(e) => setEventName(e.target.value)}
					value={eventName}
					required
				/>
				<TextInput
					label="Location"
					placeholder="Event Location"
					onChange={(e) => setEventLocation(e.target.value)}
					value={eventLocation}
					required
				/>
				<DatePicker
					label="Date"
					value={dateVal}
					onChange={setDateVal}
					required
				/>

				<Button
					disabled={!dateVal || !eventName || !eventLocation}
					onClick={addEvent}
				>
					Finish
				</Button>
			</Stack>
		</Modal>
	);
};

export default NewEventModal;
