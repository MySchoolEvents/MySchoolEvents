import React, {
	JSXElementConstructor,
	ReactElement,
	ReactFragment,
	ReactPortal,
} from "react";
import {
	Button,
	Menu,
	createStyles,
	Text,
	ActionIcon,
	Group,
	Stack,
	Avatar,
	SimpleGrid,
	Title,
	Center,
} from "@mantine/core";
import { IconChevronDown, IconPlus } from "@tabler/icons";
import { getCurrentDateOrdinalSuffixes } from "@/helpers/utils";
import { Children, useState, useEffect } from "react";
import CourseCard from "./CourseCard";

const useStyles = createStyles((theme) => ({
	courseCard: {
		transition: "transform 150ms ease, box-shadow 150ms ease",

		"&:hover": {
			transform: "scale(1.05)",
			boxShadow: theme.shadows.md,
		},
	},
}));

function CoursesContent(props: {
	setAddCourseModalIsOpen: Function;
	setEditCourseModalIsOpen: Function;
	setCurrentCourseProperties: Function;
	courseArray: {
		courseName: string;
		courseTeacher: string;
		previewIconIndex: number;
		backgroundColorIndex: number;
	}[];
	setCourseArray: Function;
}) {
	const { classes } = useStyles();
	const [sortMenuState, setSortMenuState] = useState("by order added");

	// useeffect issue

	useEffect(() => {
		let courseListClone = [...props.courseArray];
		let sortedCourseList;

		if (sortMenuState === "by order added") {
			sortedCourseList = courseListClone.sort(
				(a, b) => a.backgroundColorIndex - b.backgroundColorIndex
			);
		} else {
			sortedCourseList = courseListClone.sort((a, b) =>
				a.courseName.localeCompare(b.courseName)
			);
		}

		props.setCourseArray(sortedCourseList);
	}, [sortMenuState, props.setCourseArray]);

	return (
		<Stack m={"md"}>
			<Stack>
				{/* course activity header */}
				<Group position="apart">
					<Stack spacing={0}>
						<Title
							sx={(theme) => ({
								fontFamily: `Greycliff CF, ${theme.fontFamily}`,
								fontWeight: 900,
							})}
						>
							Course Activity
						</Title>
						<Title
							sx={(theme) => ({
								fontFamily: `Greycliff CF, ${theme.fontFamily}`,
								fontWeight: 700,
							})}
							color="blue"
							order={2}
						>
							{getCurrentDateOrdinalSuffixes()}
						</Title>
					</Stack>

					<ActionIcon
						size="xl"
						variant="filled"
						color="blue"
						radius="xl"
						onClick={() => props.setAddCourseModalIsOpen(true)}
					>
						<IconPlus />
					</ActionIcon>
				</Group>

				{/* courses components */}
				<Stack>
					<Group position="apart">
						<Text fw={500} c="dimmed" size="xl">
							Courses
						</Text>
						<Menu transitionDuration={150} transition="scale-y">
							<Menu.Target>
								<Button variant="subtle" radius="xl">
									<Group>
										Sort {sortMenuState}
										<IconChevronDown />
									</Group>
								</Button>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item onClick={() => setSortMenuState("by order added")}>
									by order added
								</Menu.Item>
								<Menu.Item onClick={() => setSortMenuState("alphabetically")}>
									alphabetically
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
					{/* course grid component here*/}
					{props.courseArray.length !== 0 ? (
						<SimpleGrid
							cols={3}
							breakpoints={[{ maxWidth: "sm", cols: 1 }]}
							mb="xl"
							spacing="xl"
						>
							{Children.toArray(
								props.courseArray.map((course) => (
									<CourseCard
										course={course}
										courseCardClass={classes.courseCard}
										setEditCourseModalIsOpen={props.setEditCourseModalIsOpen}
										setCurrentCourseProperties={
											props.setCurrentCourseProperties
										}
									/>
								))
							)}
						</SimpleGrid>
					) : (
						<Center>
							<Text
								weight={"bold"}
								c="dimmed"
								size="lg"
								ta="center"
								transform="uppercase"
							>
								No courses available
							</Text>
						</Center>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
}

export default CoursesContent;
