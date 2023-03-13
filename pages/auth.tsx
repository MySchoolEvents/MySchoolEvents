import {
	Button,
	Center,
	Stack,
	Paper,
	Title,
	Text,
	Container,
	Loader,
} from "@mantine/core";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	IconBrandGoogle,
} from "@tabler/icons";

export default function AuthPage() {
	const { user, googleSignIn, logOut } = UserAuth();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			setIsLoading(false);
			logOut();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignIn = async (signInCallback: Function) => {
		try {
			setIsLoading(true);
			await signInCallback();
		} catch (error) {
			setIsLoading(false);
			window.location.reload();
			console.error(error);
		}
	};

	useEffect(() => {
		if (user != null) {
			// redirect to home page after user successfully logs in
			router.push("/");
		}
	}, [user]);

	return (
		<>
			{isLoading && user == null ? (
				<Center>
					<Loader />
				</Center>
			) : (
				<Container size="xs" style={{ transform: "translateY(100%)" }}>
					<Title
						align="center"
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 900,
						})}
					>
						Log in
					</Title>

					<Text color="dimmed" size="lg" align="center" mt={5}>
						to enjoy all of our cool features ✌️
					</Text>

					<Paper withBorder shadow="md" p={30} mt={20} radius="lg">
						<Stack>
							<Stack>
								<Center>
									<Button
										onClick={async () => handleSignIn(googleSignIn)}
										variant={"filled"}
										leftIcon={<IconBrandGoogle />}
										w={"80%"}
										radius={"md"}
										color={"ocean-blue"}
									>
										Sign in with Google
									</Button>
								</Center>
							</Stack>
						</Stack>
					</Paper>
				</Container>
			)}
		</>
	);
}
