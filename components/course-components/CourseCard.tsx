import React from "react";
import { Text, Group, Stack, useMantineTheme, Paper } from "@mantine/core";
import { courseIconsWhite, courseIconsBlack } from "@/helpers/icons";
import { chooseColorRecursively, getCourseBackgroundColors } from "@/helpers/colors";

type CourseCardProps = {
	courseCardClass: string;
	course: any;
	setEditCourseModalIsOpen: Function;
	setCurrentCourseProperties: Function;
};

function CourseCard({
	courseCardClass,
	course,
	setEditCourseModalIsOpen,
	setCurrentCourseProperties,
}: CourseCardProps) {
	const theme = useMantineTheme();
	const courseBackgroundColors = getCourseBackgroundColors(theme);

	return (
		<Paper
			className={courseCardClass}
			shadow="sm"
			radius="lg"
			p="lg"
			style={{ backgroundColor:  chooseColorRecursively(course.backgroundColorIndex, courseBackgroundColors)}}
			onClick={(event) => {
				event.preventDefault();
				setCurrentCourseProperties({
					title: course.courseName,
					teacher: course.courseTeacher,
					icon: courseIconsBlack[course.previewIconIndex].icon,
				});
				setEditCourseModalIsOpen(true);
			}}
		>
			<Stack spacing={0}>
				<Group position="center" noWrap>
					{courseIconsWhite[course.previewIconIndex].icon}
					<Stack spacing={0}>
						<Text truncate fw={700} ta="center" color="white">
							{course.courseName}
						</Text>
						<Text truncate fw={500} ta="center" color="white">
							{course.courseTeacher}
						</Text>
					</Stack>
				</Group>
			</Stack>
		</Paper>
	);
}

export default CourseCard;
