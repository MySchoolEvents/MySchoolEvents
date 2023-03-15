import React, { Children, useEffect, useState } from "react";
import { Button, Center, Modal, Stack, Text } from "@mantine/core";
import Scanner from "../Scanner";
import dynamic from "next/dynamic";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { CurrentEventsCard } from "./CurrentEventCards";

const DynamicComponentWithNoSSR = dynamic(() => import("../Scanner"), {
	ssr: false,
});

const Current = ({ userData, currentEvents, setCurrentEvents, user }: any) => {
	const [completedEvents, setCompletedEvents] = useState<any>(
		userData.attendedEventID
	);
	const [gradeExists, setGradeExists] = useState(userData.grade);
	const [currentGrade, setCurrentGrade] = useState("");

	return (
		<>
			{/**/}
			{/*   setShowBarcode(false) */}
			{/**/}
			{/* }}> */}
			{/*   <DynamicComponentWithNoSSR /> */}
			{/* </Modal> */}

			<Stack>
				<Center>
					<Stack w="70%" mt="xl">
						{Children.toArray(
							currentEvents.map((event: any, index: number) => {
								return (
									<CurrentEventsCard
										completedEvents={completedEvents}
										setCompletedEvents={setCompletedEvents}
										userData={userData}
										event={event}
										user={user}
										title={event.name}
										location={event.location}
										group={event.group}
										start={event.startTime}
										end={event.endTime}
										gradeExists={gradeExists}
										setGradeExists={setGradeExists}
										currentGrade={currentGrade}
										setCurrentGrade={setCurrentGrade}
										currentEvents={currentEvents}
										setCurrentEvents={setCurrentEvents}
										index={index}
									/>
								);
							})
						)}
					</Stack>
				</Center>
			</Stack>
		</>
	);
};

export default Current;
