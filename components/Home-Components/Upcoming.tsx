import React, { useEffect, useState } from "react";
import { Center, Pagination, Stack, Text } from "@mantine/core";
import { EventTable } from "./EventTable";

const Upcoming = ({ upcomingEvents, setUpcomingEvents, user }: any) => {
	const [page, setPage] = useState(1);
	const [events, setEvents] = useState(upcomingEvents.slice(0, 10));

	const onPaginationChange = (newPage: number) => {
		setPage(newPage);

		setEvents(upcomingEvents.slice(newPage * 10 - 10, newPage * 10));
	};

	useEffect(() => {
		setEvents(upcomingEvents.slice(0, 10));
	}, [upcomingEvents])

	return (
		<Stack mih={"100%"}>
			<EventTable
				events={events}
				totalEvents={upcomingEvents}
				setTotalEvents={setUpcomingEvents}
				setEvents={setEvents}
				user={user}
			/>
			<Center>
				<Pagination
					pos={"fixed"}
					bottom={30}
					// @ts-ignore
					value={page}
					onChange={onPaginationChange}
					total={
						upcomingEvents.length % 10 === 0
							? upcomingEvents.length / 10
							: Math.floor(upcomingEvents.length / 10) + 1
					}
				/>
			</Center>
		</Stack>
	);
};

export default Upcoming;
