import React from "react";
import { Text, Group, Stack, useMantineTheme, Paper } from "@mantine/core";
import { courseIcons, courseIconsModal } from "@/helpers/icons";

type CourseCardProps = {
	courseCardClass: string;
	index: number;
	course: any;
	setEditCourseModalIsOpen: Function;
	setCurrentCourseProperties: Function;
};

function CourseCard({
	courseCardClass,
	index,
	course,
	setEditCourseModalIsOpen,
	setCurrentCourseProperties,
}: CourseCardProps) {
	const theme = useMantineTheme();

	const courseBackgroundColors = [
		theme.colors.blue[5],
		theme.colors.red[5],
		theme.colors.green[5],
		theme.colors.orange[5],
		theme.colors.grape[5],
		theme.colors.teal[5],
	];

	function chooseColorRecursively(index: number): string {
		if (index < courseBackgroundColors.length) {
			return courseBackgroundColors[index];
		} else {
			return chooseColorRecursively(index - courseBackgroundColors.length);
		}
	}

	return (
		<Paper
			className={courseCardClass}
			shadow="sm"
			radius="lg"
			p="lg"
			style={{ backgroundColor: chooseColorRecursively(index) }}
			onClick={(event) => {
				event.preventDefault();
				setCurrentCourseProperties({
					title: course.courseName,
					teacher: course.courseTeacher,
					icon: courseIconsModal[course.previewIconIndex].icon,
				});
				setEditCourseModalIsOpen(true);
			}}
		>
			<Stack spacing={0}>
				<Group position="center" noWrap>
					{courseIcons[course.previewIconIndex].icon}
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
