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
import { courseIconsBlack } from "@/helpers/icons";
import { editCourse, removeCourse } from "@/helpers/FirebaseHelpers";
import { UserAuth } from "@/context/AuthContext";

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
		iconIndex: number;
		backgroundColorIndex: number;
		index: number;
		id: string,
	};
	setCurrentCourseProperties: Function;
	courseArray:
		| {
				title: string;
				teacher: string;
				previewIconIndex: number;
				backgroundColorIndex: number;
				id: string;
		  }[]
		| [];
	setCourseArray: Function;
}) {
	const { user } = UserAuth();
	const { classes, theme } = useStyles();
	const [courseTitle, setCourseTitle] = useState("");
	const [courseTeacher, setCourseTeacher] = useState("");
	const [courseIcon, setCourseIcon] = useState(
		props.currentCourseProperties.icon
	);
	const [courseIconIndex, setCourseIconIndex] = useState(0);

	useEffect(() => {
		setCourseIcon(props.currentCourseProperties.icon);
	}, [props.currentCourseProperties]);

	const handleCourseEdit = () => {
		const updatedTitle =
			courseTitle === "" ? props.currentCourseProperties.title : courseTitle;
		const updatedTeacher =
			courseTeacher === ""
				? props.currentCourseProperties.teacher
				: courseTeacher;
		// if null, won't change course icon index, otherwise will change to current state
		const updatedIcon =
			props.currentCourseProperties.icon !== courseIcon
				? courseIconIndex
				: props.currentCourseProperties.iconIndex;

		// update state of current course in course array
		let clonedCourseArray = [...props.courseArray];
		clonedCourseArray[props.currentCourseProperties.index] = {
			title: updatedTitle,
			teacher: updatedTeacher,
			previewIconIndex: updatedIcon,
			backgroundColorIndex: props.currentCourseProperties.backgroundColorIndex,
			id: props.currentCourseProperties.id,
		};

		props.setCourseArray(clonedCourseArray);
		// @ts-ignore
		editCourse(user.uid, props.currentCourseProperties.id, updatedTitle, updatedTeacher, updatedIcon);

		resetState();
		props.setEditCourseModalIsOpen(false);
	};

	const handleCourseRemoval = () => {
		let clonedCourseArray = [...props.courseArray];
		clonedCourseArray.splice(props.currentCourseProperties.index, 1);

		props.setCourseArray(clonedCourseArray);
		// @ts-ignore
		removeCourse(user.uid, props.currentCourseProperties.id);

		resetState();
		props.setEditCourseModalIsOpen(false);
	};

	const resetState = () => {
		setCourseTitle("");
		setCourseTeacher("");
		setCourseIconIndex(0);
		setCourseIcon(<IconBooks size={30} />);
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
				<Title
					sx={(theme) => ({
						fontFamily: `Greycliff CF, ${theme.fontFamily}`,
						fontWeight: 700,
					})}
					size={"lg"}
					order={4}
					align="center"
				>
					Edit course
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
						if (event.key === "Enter") {
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
						if (event.key === "Enter") {
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
							courseIconsBlack.map((courseIcon, index) => (
								<Menu.Item
									icon={courseIcon.icon}
									onClick={() => {
										setCourseIcon(courseIcon.icon);
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
					Save
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
