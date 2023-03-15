import {
	Card,
	Avatar,
	Text,
	Progress,
	Badge,
	Group,
	ActionIcon,
	createStyles,
	Modal,
	Stack,
	Center,
	Title,
} from "@mantine/core";
import { useState } from "react";
import CurrentEventModal from "./CurrentEventModal";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconClipboard, IconTrash } from "@tabler/icons";
import { removeEvent } from "@/helpers/FirebaseHelpers";

const useStyles = createStyles((theme) => ({
	card: {
		transition: "box-shadow 150ms ease, transform 100ms ease",
		"&:hover": {
			boxShadow: theme.shadows.md,
			transform: "scale(1.05)",
		},
	},
}));

export function CurrentEventsCard({
	setCompletedEvents,
	completedEvents,
	userData,
	user,
	title,
	location,
	group,
	end,
	start,
	event,
	gradeExists,
	setGradeExists,
	currentGrade,
	setCurrentGrade,
	currentEvents,
	setCurrentEvents,
	index,
}: any) {
	const [openEventModal, setOpenEventModal] = useState(false);

	const goToEvent = () => {
		setOpenEventModal(true);
	};

	const getDateLength = () => {
		const days = end - start + 1;

		return `${days} day${days > 1 ? "s" : ""}`;
	};

	const clipboard = useClipboard({ timeout: 1000 });

	const copyToClipboard = () => {
		const eventID = event.id.slice(0, 4) + event.id.slice(-1);
		clipboard.copy(eventID.toLowerCase());

		showNotification({
			title: "Copied to Clipboard",
			message: "Event ID copied to clipboard",
			color: "green",
			icon: <IconClipboard />,
		});
	};

	const showModalDependingOnAdmin = () => {
		const eventID = event.id.slice(0, 4) + event.id.slice(-1);

		if (user?.customClaims?.admin) {
			return (
				<Modal
					fullScreen
					opened={openEventModal}
					onClose={() => setOpenEventModal(false)}
				>
					<Stack h="100%" style={{ transform: "translateY(30%)" }}>
						<Title ta="center">
							{event.name}
							<Title ta="center" color="blue">
								Event ID
							</Title>
						</Title>

						<Center>
							<Title onClick={copyToClipboard} order={1} size="250px">
								{eventID.toLowerCase()}
							</Title>
						</Center>
					</Stack>
				</Modal>
			);
		} else {
			return (
				<Modal
					fullScreen
					opened={openEventModal}
					onClose={() => setOpenEventModal(false)}
				>
					<CurrentEventModal
						setCompletedEvents={setCompletedEvents}
						completedEvents={completedEvents}
						userData={userData}
						user={user}
						event={event}
						openEventModal={openEventModal}
						gradeExists={gradeExists}
						setGradeExists={setGradeExists}
						currentGrade={currentGrade}
						setCurrentGrade={setCurrentGrade}
					/>
				</Modal>
			);
		}
	};

	const handleEventRemoval = (mouseEvent: any) => {
		mouseEvent.stopPropagation();
		mouseEvent.preventDefault();

		let clonedEventArray = [...currentEvents];
		clonedEventArray.splice(index, 1);
		setCurrentEvents(clonedEventArray);
		removeEvent(event.id);
	};

	const { classes } = useStyles();

	return (
		<>
			{showModalDependingOnAdmin()}

			<Card
				withBorder
				// @ts-ignore
				padding="xl"
				radius="md"
				className={classes.card}
				onClick={goToEvent}
			>
				<Group position="apart" p={"sm"}>
					<Text fz="lg" fw={500}>
						{title}
					</Text>
					{/* <Badge>{(end - start) + 1} long</Badge> */}
					<Badge>{getDateLength()}</Badge>
				</Group>

				<Group mx="sm" position="apart">
					<Text fz="sm" c="dimmed" mt={5}>
						{location + " " + (group ? group : "")}
					</Text>
					{user?.customClaims?.admin && (
						<ActionIcon
							color="red"
							onClick={(event) => handleEventRemoval(event)}
						>
							<IconTrash />
						</ActionIcon>
					)}
				</Group>
			</Card>
		</>
	);
}
