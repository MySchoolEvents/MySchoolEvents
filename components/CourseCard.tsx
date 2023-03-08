import React from "react";
import {
  Text,
  Group,
  Stack,
  useMantineTheme,
  Paper,
} from "@mantine/core";

type CourseCardProps = {
  courseCardClass: string;
  index: number;
  course: any;
};

function CourseCard({ courseCardClass, index, course }: CourseCardProps) {
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
    if (index < 6) {
      return courseBackgroundColors[index];
    } else {
      return chooseColorRecursively(index - 6);
    }
  }
  return (
    <Paper
      className={courseCardClass}
      shadow="sm"
      radius="lg"
      p="lg"
      style={{ backgroundColor: chooseColorRecursively(index) }}
    >
      <Stack spacing={0}>
        <Group position="center" noWrap>
          {course.previewIcon}
          <Stack spacing={0}>
            <Text truncate fw={700} ta="center" color="white">
              {course.courseName}
            </Text>
            <Text truncate fw={500} ta="center" color="white">
              {course.courseTeacher}
            </Text>
          </Stack>
          {/* <Text color="white" fw={700} size="xl"> */}
          {/* 	{(course.courseGrade * 100).toFixed(0)}% */}
          {/* </Text> */}
        </Group>
      </Stack>
    </Paper>
  );
}

export default CourseCard;
