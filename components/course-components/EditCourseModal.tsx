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
import { Children, useState, useEffect } from "react";
import { IconBooks } from "@tabler/icons";
import { courseIconsModal } from "@/helpers/icons";

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

function EditCourseModal(props: {
	editCourseModalIsOpen: boolean;
	setEditCourseModalIsOpen: Function;
	currentCourseProperties: {
		title: string;
		teacher: string;
		icon: JSX.Element;
	};
	setCurrentCourseProperties: Function;
}) {
	const { classes, theme } = useStyles();
	const [courseTitle, setCourseTitle] = useState("");
	const [courseTeacher, setCourseTeacher] = useState("");
    const [courseIcon, setCourseIcon] = useState(props.currentCourseProperties.icon)
	const [courseIconIndex, setCourseIconIndex] = useState(0);

    useEffect(() => {
        setCourseIcon(props.currentCourseProperties.icon);
    }, [props.currentCourseProperties])

	const handleCourseEdit = () => {
		const updatedTitle =
			courseTitle === "" ? props.currentCourseProperties.title : courseTitle;
		const updatedTeacher =
			courseTeacher === ""
				? props.currentCourseProperties.teacher
				: courseTeacher;
        // if null, won't change course icon index, otherwise will change to current state
        const updatedIcon = props.currentCourseProperties.icon !== courseIcon ? courseIconIndex : null;

		resetState();
		props.setEditCourseModalIsOpen(false);
	};

	const handleCourseRemoval = () => {
		resetState();
		props.setEditCourseModalIsOpen(false);
	};

	const resetState = () => {
		setCourseTitle("");
		setCourseTeacher("");
		setCourseIconIndex(0);
        setCourseIcon(<IconBooks size={30} />)
	};

	return (
		<Modal
			opened={props.editCourseModalIsOpen}
			centered
			onClose={() => {
				resetState();
				props.setEditCourseModalIsOpen(false);
			}}
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
					Edit a course
				</Title>
				<TextInput
					value={courseTitle}
					onChange={(event) => {
						setCourseTitle(event.currentTarget.value);
					}}
					label="Title"
					placeholder={props.currentCourseProperties.title}
					classNames={classes}
					onKeyDown={(event) => {
						if (
							event.key === "Enter"
						) {
							handleCourseEdit();
						}
					}}
				/>
				<TextInput
					value={courseTeacher}
					onChange={(event) => {
						setCourseTeacher(event.currentTarget.value);
					}}
					label="Teacher"
					placeholder={props.currentCourseProperties.teacher}
					classNames={classes}
					onKeyDown={(event) => {
						if (
							event.key === "Enter"
						) {
							handleCourseEdit();
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
							courseIconsModal.map((courseIcon, index) => (
								<Menu.Item
									icon={courseIcon.icon}
									onClick={() => {
										setCourseIcon(courseIcon.icon)
										setCourseIconIndex(index);
									}}
								>
									{courseIcon.label}
								</Menu.Item>
							))
						)}
					</Menu.Dropdown>
				</Menu>
				<Button
					onClick={() => {
						handleCourseEdit();
					}}
				>
					Edit Course
				</Button>
				<Button
					color="red"
					onClick={() => {
						handleCourseRemoval();
					}}
				>
					Remove
				</Button>
			</Stack>
		</Modal>
	);
}

export default EditCourseModal;