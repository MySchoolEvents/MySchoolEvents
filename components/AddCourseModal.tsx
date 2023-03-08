import {
	Menu,
	createStyles,
	Modal,
	Title,
	TextInput,
	Button,
	Stack,
	Center,
	Text,
} from "@mantine/core";
import { Children, useState } from "react";
import { IconBooks } from "@tabler/icons";
import { courseIcons } from "@/helpers/icons";

const useStyles = createStyles((theme) => ({
	root: {
		position: "relative",
	},

	input: {
		height: "auto",
		paddingTop: 18,
	},

	label: {
		position: "absolute",
		pointerEvents: "none",
		fontSize: theme.fontSizes.xs,
		paddingLeft: theme.spacing.sm,
		paddingTop: theme.spacing.sm / 2,
		zIndex: 1,
	},
}));

function AddCourseModal(props: {addCourseModalIsOpen: boolean, setAddCourseModalIsOpen: Function}) {
	const { classes, theme } = useStyles();
	const [courseTitle, setCourseTitle] = useState("");
	const [courseTeacher, setCourseTeacher] = useState("");
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [courseIcon, setCourseIcon] = useState(<IconBooks />);

	const handleCourseCreation = () => {};

	return (
		<Modal
			opened={props.addCourseModalIsOpen}
			centered
			onClose={() => props.setAddCourseModalIsOpen(false)}
			withCloseButton={false}
			overlayColor={
				theme.colorScheme === "dark"
					? theme.colors.dark[9]
					: theme.colors.gray[2]
			}
			overlayOpacity={0.55}
			overlayBlur={3}
			zIndex={999999}
			radius={"md"}
			trapFocus
		>
			<Stack>
				<Title size={"lg"} order={4} align="center">
					Add a course
				</Title>
				<TextInput
					value={courseTitle}
					onChange={(event) => {
						setCourseTitle(event.currentTarget.value);
						if (event.currentTarget.value === "" || courseTeacher === "") {
							setButtonDisabled(true);
						} else {
							setButtonDisabled(false);
						}
					}}
					label="Title"
					placeholder="Write your course title here"
					required
					classNames={classes}
					onKeyDown={(event) => {
						if (
							event.key === "Enter" &&
							courseTitle !== "" &&
							courseTeacher !== ""
						) {
                            handleCourseCreation();
						}
					}}
				/>
				<TextInput
					value={courseTeacher}
					onChange={(event) => {
						setCourseTeacher(event.currentTarget.value);
						if (event.currentTarget.value === "" || courseTitle === "") {
							setButtonDisabled(true);
						} else {
							setButtonDisabled(false);
						}
					}}
					label="Teacher"
					placeholder="Write your course teacher here"
					required
					classNames={classes}
					onKeyDown={(event) => {
						if (
							event.key === "Enter" &&
							courseTitle !== "" &&
							courseTeacher !== ""
						) {
                            handleCourseCreation();
						}
					}}
				/>
				<Text fw={500} c="black" size="xs" mb={-8}>
					Course Icon
				</Text>
				<Menu shadow="md" width={"100%"}>
					<Menu.Target>
						<Button variant="default" color="gray">
							<Center>{courseIcon}</Center>
						</Button>
					</Menu.Target>

					<Menu.Dropdown>
						{Children.toArray(
							courseIcons.map((courseIcon) => (
								<Menu.Item
									icon={courseIcon.icon}
									onClick={() => setCourseIcon(courseIcon.icon)}
								>
									{courseIcon.label}
								</Menu.Item>
							))
						)}
					</Menu.Dropdown>
				</Menu>
				<Button
					onClick={() => {
						if (courseTitle !== "" && courseTeacher !== "") {
                            handleCourseCreation();
						}
					}}
					disabled={buttonDisabled}
				>
					Create Course
				</Button>
			</Stack>
		</Modal>
	);
}

export default AddCourseModal;
