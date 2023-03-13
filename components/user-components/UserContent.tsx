import { UserAuth } from "@/context/AuthContext";
import {
	createStyles,
	Card,
	Avatar,
	Text,
	Button,
	SimpleGrid,
	Container,
} from "@mantine/core";
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
	avatar: string | null | undefined;
	name: string | null | undefined;
	role: string;
	numberOfCourses: number;
}

export function UserContent({
	avatar,
	name,
	role,
	numberOfCourses,
}: UserContentProps) {
	const { classes } = useStyles();
	const { logOut } = UserAuth();
	const router = useRouter();

	return (
		<Container style={{ transform: "translateY(50%)", width: 450 }}>
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
					fw={500}
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
				<SimpleGrid mt="md" spacing={0}>
					<Text
						ta="center"
						fz="xl"
						fw={500}
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 700,
						})}
					>
						{numberOfCourses}
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
						Courses
					</Text>
				</SimpleGrid>
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
                        router.push("/auth");
                        logOut();
					}}
				>
					Log Out
				</Button>
			</Card>
		</Container>
	);
}