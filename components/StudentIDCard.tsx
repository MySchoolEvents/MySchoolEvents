import { UserAuth } from "@/context/AuthContext";
import { updateGrade } from "@/helpers/FirebaseHelpers";
import {
	createStyles,
	Card,
	Text,
	Button,
	Title,
	TextInput,
	ActionIcon,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},
}));

export function StudentIDCard({
	name,
	grade,
	studentID,
	gradeExists,
	setGradeExists,
	currentGrade,
	setCurrentGrade,
}: any) {
	const { classes } = useStyles();
	const [gradeInput, setGradeInput] = useState("");
	const [error, setError] = useState("");

  // matches strings 09, 9, 10, 11, 12 to ensure user enters grades 9-12
	const hsGradesRegex = /^(0?[9]|1[0-2])$/;
  
	const { user } = UserAuth();

	const handleGradeInput = () => {
		if (gradeInput !== "" && hsGradesRegex.test(gradeInput)) {
			setError("");
			const formattedGrade = gradeInput === "09" ? "9" : gradeInput;

			// @ts-ignore
			updateGrade(user?.uid, formattedGrade);
			setCurrentGrade(formattedGrade);
			setGradeExists(true);
		} else if (gradeInput !== "") {
			setError("Please enter a valid grade between 9 and 12.");
		}
	};

	return (
		<>
			<Card
				withBorder
				w="50%"
				// @ts-ignore
				padding="xl"
				radius="md"
				className={classes.card}
			>
				<Title ta={"center"}>{name ? name : "No Name"}</Title>
				<Text size="xl" ta="center" mt="sm">
					{studentID ? studentID : "No Student ID"}
				</Text>
				{gradeExists ? (
					<Button fullWidth radius="md" mt="xl" size="md">
						Grade {grade ? grade : currentGrade}
					</Button>
				) : (
					<TextInput
						value={gradeInput}
						onChange={(e) => setGradeInput(e.currentTarget.value)}
						mt="xl"
						size="md"
						placeholder="Enter your current grade"
						variant="filled"
						radius="md"
						rightSection={
							<ActionIcon onClick={() => handleGradeInput()}>
								<IconChevronRight />
							</ActionIcon>
						}
						onKeyDown={(e) => {
							if (e.key === "Enter" && gradeInput !== "") {
								handleGradeInput();
							}
						}}
						error={error}
					/>
				)}
			</Card>
		</>
	);
}
