import React, { useEffect, useState } from "react";
import { Center, Pagination, Stack, Text } from "@mantine/core";
import { EventTable } from "./EventTable";

const Past = ({ pastEvents, setPastEvents, user }: any) => {
	const [page, setPage] = useState(1);
	const [events, setEvents] = useState(pastEvents.slice(0, 10));

	const onPaginationChange = (newPage: number) => {
		setPage(newPage);

		setEvents(pastEvents.slice(newPage * 10 - 10, newPage * 10));
	};

	useEffect(() => {
		setEvents(pastEvents.slice(0, 10));
		setPage(1);
	}, [pastEvents])

	return (
		<Stack mih={"100%"}>
			<EventTable
				events={events}
				totalEvents={pastEvents}
				setTotalEvents={setPastEvents}
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
						pastEvents.length % 10 === 0
							? pastEvents.length / 10
							: Math.floor(pastEvents.length / 10) + 1
					}
				/>
			</Center>
		</Stack>
	);
};

export default Past;
