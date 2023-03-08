import React from "react";
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
  IconDeviceDesktopAnalytics,
  IconSquareRoot2,
  IconBooks,
  IconScale,
} from "@tabler/icons";
import { getCurrentDateOrdinalSuffixes } from "@/utils/utils";
import { Children, useState } from "react";
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

function CoursesContent(props: { setAddCourseModalIsOpen: Function }) {
  const { classes } = useStyles();
  const [sortMenuState, setSortMenuState] = useState("class name");

  const courseIconSize = 30;
  const courseIconColor = "white";

  const courses = [
    {
      courseId: "CSC101",
      courseName: "Introduction to Computer Science",
      courseTeacher: "John Smith",
      teacherId: "JS100",
      previewIcon: (
        <IconDeviceDesktopAnalytics
          color={courseIconColor}
          size={courseIconSize}
        />
      ),
      courseGrade: 0.84364,
    },
    {
      courseId: "MAT202",
      courseName: "Linear Algebra",
      courseTeacher: "Emily Johnson",
      teacherId: "EJ101",
      previewIcon: (
        <IconSquareRoot2 color={courseIconColor} size={courseIconSize} />
      ),
      courseGrade: 0.74261,
    },
    {
      courseId: "ENG301",
      courseName: "Shakespearean Literature",
      courseTeacher: "William Brown",
      teacherId: "WB201",
      previewIcon: <IconBooks color={courseIconColor} size={courseIconSize} />,
      courseGrade: 0.83272,
    },
    {
      courseId: "PHI401",
      courseName: "Philosophy of Ethics",
      courseTeacher: "Sarah Lee",
      teacherId: "SL301",
      previewIcon: <IconScale color={courseIconColor} size={courseIconSize} />,
      courseGrade: 0.7238732,
    },
  ];

  return (
    <Stack>
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

          <ActionIcon size="xl" variant="filled" color="blue" radius="xl" onClick={() => props.setAddCourseModalIsOpen(true)}>
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
                    Sort by {sortMenuState}
                    <IconChevronDown />
                  </Group>
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => setSortMenuState("class name")}>
                  Class Name
                </Menu.Item>
                <Menu.Item onClick={() => setSortMenuState("grades")}>
                  Grades
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
            {Children.toArray(
              courses.map((course, index) => (
                <CourseCard
                  index={index}
                  course={course}
                  courseCardClass={classes.courseCard}
                />
              ))
            )}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default CoursesContent;
