import { UserAuth } from "@/context/AuthContext";
import {
	getCurrentDateOrdinalSuffixes,
	getOrdinalSuffixes,
} from "@/helpers/utils";
import {
	createStyles,
	Card,
	Avatar,
	Text,
	Button,
	Container,
	Center,
	Stack,
	Group,
	Badge,
	Title,
} from "@mantine/core";
import { IconId, IconSchool } from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	avatar: {
		border: `4px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
		}`,
	},
}));

interface UserContentProps {
	avatar: string;
	name: string;
	email: string;
	role: string;
	numberOfCourses: number;
	numberOfStudents: number;
	userData: any;
}

export function UserContent({
	avatar,
	name,
	role,
	numberOfCourses,
	numberOfStudents,
	email,
	userData,
}: UserContentProps) {
	const { classes } = useStyles();
	const { logOut } = UserAuth();

	return (
		<Stack m="md">
			{/* course activity header */}
			<Group position="apart">
				<Stack spacing={0}>
					<Title
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 900,
						})}
					>
						User Profile
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
			</Group>
			<Container style={{ transform: "translateY(25%)", width: 450 }}>
				<Card withBorder p="xl" radius="md" className={classes.card}>
					<Avatar
						src={avatar}
						size={"xl"}
						radius={80}
						mx="auto"
						className={classes.avatar}
					/>
					<Text
						ta="center"
						fz="lg"
						mt="sm"
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 700,
						})}
					>
						{name}
					</Text>
					<Text
						ta="center"
						fz="sm"
						c="dimmed"
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 700,
						})}
					>
						{role}
					</Text>
					{role === "Student" ? (
						<Center>
							<Badge color="blue" mt="sm" size="lg">
								{numberOfCourses} courses
							</Badge>
							<Badge color="blue" mt="sm" size="lg">
								{userData ? userData.points ?? 0 : 0} points
							</Badge>
						</Center>
					) : (
						<Center>
							<Badge color="blue" mt="sm" size="lg">
								{numberOfStudents} students
							</Badge>
						</Center>
					)}
					<Center mt="md">
						<Stack>
							{/* check if userData exists, then check if user has a grade and is not an admin before showing their grade */}
							{userData
								? userData.grade &&
								  role === "Student" && (
										<Group>
											<IconSchool size="2rem" />
											<Text
												ta="left"
												fz="sm"
												fw={500}
												sx={(theme) => ({
													fontFamily: `Greycliff CF, ${theme.fontFamily}`,
												})}
											>
												{userData.grade}
												{getOrdinalSuffixes(userData.grade)} grade
											</Text>
										</Group>
								  )
								: ""}
							<Group>
								<IconId size="2rem" />
								<Text
									ta="left"
									fz="sm"
									fw={500}
									sx={(theme) => ({
										fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									})}
								>
									{email.split("@")[0]}
								</Text>
							</Group>
						</Stack>
					</Center>
					<Button
						fullWidth
						radius="md"
						mt="xl"
						size="md"
						color={"red"}
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 700,
						})}
						onClick={() => {
							// router.push("/auth");
							window.open("/auth", "_self");
							logOut();
						}}
					>
						Log Out
					</Button>
				</Card>
			</Container>
		</Stack>
	);
}
