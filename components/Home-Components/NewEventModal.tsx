import React, { useState } from "react";
import { Modal, Title, TextInput, Stack, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { createNewEvent } from "@/helpers/FirebaseHelpers";
import { useRouter } from "next/router";
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
	const router = useRouter();
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

		// current event
		if (numericValue === getDateNumber()) {
			let currentEventsClone = [...current];
			currentEventsClone.push({
				name: eventName,
				location: eventLocation,
				startTime: numericValue,
				endTime: numericValue,
				id: newID,
			});

			setCurrent(currentEventsClone);
		} else if (numericValue > getDateNumber()) {
			// upcoming event
			let upcomingEventsClone = [...upcoming];
			upcomingEventsClone.push({
				name: eventName,
				location: eventLocation,
				startTime: numericValue,
				endTime: numericValue,
				id: newID,
			});

			setUpcoming(upcomingEventsClone);
		} else if (numericValue < getDateNumber()) {
			// past event
			let pastEventsClone = [...past];
			pastEventsClone.push({
				name: eventName,
				location: eventLocation,
				startTime: numericValue,
				endTime: numericValue,
				id: newID,
			});

			setPast(pastEventsClone);
		}

		createNewEvent(eventName, eventLocation, numericValue, numericValue, newID);

		// close modal
		setOpened(false);
		router.reload();
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
