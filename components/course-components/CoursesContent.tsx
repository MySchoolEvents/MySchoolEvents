import React, { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";
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
} from "@mantine/core";
import {
	IconChevronDown,
	IconPlus,
} from "@tabler/icons";
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
	courses: {
		courseName: string;
		courseTeacher: string;
		previewIconIndex: number;
	}[];
	setAddCourseModalIsOpen: Function;
	setEditCourseModalIsOpen: Function;
	setCurrentCourseProperties: Function;
  courseCards: (string | number | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal)[];
  setCourseCards: Function;
}) {

	const { classes } = useStyles();
	const [sortMenuState, setSortMenuState] = useState("by order added");

	const setCourseDisplayCards = (
		courseList: {
			courseName: string;
			courseTeacher: string;
			previewIconIndex: number;
		}[]
	) => {
		props.setCourseCards(
			Children.toArray(
				courseList.map((course, index) => (
					<CourseCard
						index={index}
						course={course}
						courseCardClass={classes.courseCard}
						setEditCourseModalIsOpen={props.setEditCourseModalIsOpen}
						setCurrentCourseProperties={props.setCurrentCourseProperties}
					/>
				))
			)
		);
	};

	useEffect(() => {
		let courseListClone = [...props.courses];
		let sortedCourseList;

		if (sortMenuState === "by order added") {
			sortedCourseList = courseListClone;
		} else {
			sortedCourseList = courseListClone.sort((a, b) =>
				a.courseName.localeCompare(b.courseName)
			);
		}

		setCourseDisplayCards(sortedCourseList);
	}, [sortMenuState]);

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
					<SimpleGrid
						cols={3}
						breakpoints={[{ maxWidth: "sm", cols: 1 }]}
						mb="xl"
						spacing="xl"
					>
						{props.courseCards}
					</SimpleGrid>
				</Stack>
			</Stack>
		</Stack>
	);
}

export default CoursesContent;
