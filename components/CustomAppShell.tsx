import React from "react";
import { AppShell, Navbar, Stack, Group, useMantineTheme } from "@mantine/core";
import { UserAvatar } from "./UserAvatar";
import CustomNavbar from "./Navbar";

interface Props {
	children: React.ReactNode;
	selectedTab: string;
}

const CustomAppShell = ({ children, selectedTab }: Props) => {
	const theme = useMantineTheme();

	return (
		<AppShell
			styles={{
				main: {
					background: theme.colors.gray[0],
				},
			}}
			navbar={
				<Navbar width={{ base: 200 }} height={"100%"}>
					<CustomNavbar selectedTab={selectedTab} />
				</Navbar>
			}
		>
			<Stack spacing={0}>
				<Group position="right" maw="100%">
					<UserAvatar />
				</Group>

				{/* actual content */}
				{children}
			</Stack>
		</AppShell>
	);
};

export default CustomAppShell;
