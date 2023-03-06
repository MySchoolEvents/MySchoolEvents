import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button, Menu, Center, RingProgress, createStyles, AppShell, Navbar, Text, ActionIcon, Group, Tooltip, Stack, Avatar, useMantineTheme, SimpleGrid, Paper, Title, Image, Progress } from '@mantine/core'
import CustomNavbar from '@/components/Navbar'
import { IconChevronDown, IconGripVertical, IconPlus, IconChevronRight, IconChevronLeft, IconDeviceDesktopAnalytics, IconSquareRoot2, IconBooks, IconScale, IconList } from "@tabler/icons"
import { getCurrentDateOrdinalSuffixes } from '@/utils/utils'
import { Children, useState } from 'react'

const useStyles = createStyles((theme) => ({
  courseCard: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows.md,
    },
  },
}));

export default function Courses() {

  const { classes, theme } = useStyles();
  const [sortMenuState, setSortMenuState] = useState("");

  const courseBackgroundColors = [
    theme.colors.blue[5],
    theme.colors.red[5],
    theme.colors.green[5],
    theme.colors.orange[5],
    theme.colors.grape[5],
    theme.colors.teal[5],
  ]

  function chooseColorRecursively(index: number): string {
    if (index < 6) {
      return courseBackgroundColors[index];
    } else {
      return chooseColorRecursively(index - 6);
    }
  }

  const courseIconSize = 30;
  const courseIconColor = "white";

  const courses = [
    {
      courseId: "CSC101",
      courseName: "Introduction to Computer Science",
      courseTeacher: "John Smith",
      teacherId: "JS100",
      previewIcon: <IconDeviceDesktopAnalytics color={courseIconColor} size={courseIconSize} />,
      courseGrade: 0.84364
    },
    {
      courseId: "MAT202",
      courseName: "Linear Algebra",
      courseTeacher: "Emily Johnson",
      teacherId: "EJ101",
      previewIcon: <IconSquareRoot2 color={courseIconColor} size={courseIconSize} />,
      courseGrade: 0.74261
    },
    {
      courseId: "ENG301",
      courseName: "Shakespearean Literature",
      courseTeacher: "William Brown",
      teacherId: "WB201",
      previewIcon: <IconBooks color={courseIconColor} size={courseIconSize} />,
      courseGrade: 0.83272
    },
    {
      courseId: "PHI401",
      courseName: "Philosophy of Ethics",
      courseTeacher: "Sarah Lee",
      teacherId: "SL301",
      previewIcon: <IconScale color={courseIconColor} size={courseIconSize} />,
      courseGrade: 0.7238732
    }
  ];

  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppShell
          styles={{
            main: {
              background: theme.colors.gray[0],
            },
          }}

          navbar={<Navbar width={{ base: 200 }} height={"100%"} p="xs">

            <CustomNavbar selectedTab='courses' />

          </Navbar>}

        >
          <Stack>
            <Stack spacing={0}>
              <Group position="right" maw="100%">
                <Avatar radius={"xl"} size="lg" color="indigo" />
              </Group>
            </Stack>

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

                <ActionIcon size="xl" variant='filled' color="blue" radius="xl">
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
                          Sort by {sortMenuState}<IconChevronDown />
                        </Group>
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => setSortMenuState("grades")}>
                        Grades
                      </Menu.Item>
                      <Menu.Item onClick={() => setSortMenuState("class name")}>
                        Class Name
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
                  {Children.toArray(courses.map((course, index) => (
                    <Paper
                      className={classes.courseCard}
                      shadow="sm"
                      radius="lg"
                      p="lg"
                      style={{ backgroundColor: chooseColorRecursively(index) }}
                    >
                      <Stack spacing={0}>
                        <Group position="apart" noWrap>
                          {course.previewIcon}
                          <Stack spacing={0}>
                            <Text truncate fw={700} ta="center" color="white">{course.courseName}</Text>
                            <Text truncate fw={500} ta="center" color="white">{course.courseTeacher}</Text>
                          </Stack>
                          <Text color="white" fw={700} size="xl">{(course.courseGrade * 100).toFixed(0)}%</Text>
                        </Group>
                      </Stack>
                    </Paper>)))}
                </SimpleGrid>
              </Stack>
            </Stack>

          </Stack>

        </AppShell>
      </main>
    </>
  )
}
