import {
	Button,
	Center,
	Group,
	Stack,
	Text,
	Title,
	UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import { IconHomeStar, IconSettings, IconBooks, IconMessageCircle2 } from "@tabler/icons";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

type Props = {
	selectedTab: string;
};

function CustomNavbar({ selectedTab }: Props) {
	return (
		<Center h="100%">
			<Stack spacing={60} w="100%" mr="xs">
				<UserAvatar />

				<Link href={`/`}>
					<UnstyledButton>
						<Group position="center">
							<IconHomeStar
								color={selectedTab == "home" ? "#228be6" : "gray"}
								fontWeight={selectedTab == "home" ? "#228be6" : "gray"}
							/>
							<Text
								color={selectedTab == "home" ? "#228be6" : "gray"}
								weight={selectedTab == "home" ? "bold" : "normal"}
							>
								Home
							</Text>
						</Group>
					</UnstyledButton>
				</Link>

				<Link href={`/courses`}>
					<UnstyledButton>
						<Group position="center">
							<IconBooks
								color={selectedTab == "courses" ? "#228be6" : "gray"}
								fontWeight={selectedTab == "courses" ? "bold" : "regular"}
							/>
							<Text
								color={selectedTab == "courses" ? "#228be6" : "gray"}
								weight={selectedTab == "courses" ? "bold" : "normal"}
							>
								Courses
							</Text>
						</Group>
					</UnstyledButton>
				</Link>

				<Link href={`/settings`}>
					<UnstyledButton>
						<Group position="center">
							<IconSettings
								color={selectedTab == "settings" ? "#228be6" : "gray"}
								fontWeight={selectedTab == "settings" ? "#228be6" : "gray"}
							/>
							<Text
								color={selectedTab == "settings" ? "#228be6" : "gray"}
								weight={selectedTab == "settings" ? "bold" : "normal"}
							>
								Settings
							</Text>
						</Group>
					</UnstyledButton>
				</Link>

				<Link href={`/chat`}>
					<UnstyledButton>
						<Group position="center">
							<IconMessageCircle2
								color={selectedTab == "chat" ? "#228be6" : "gray"}
								fontWeight={selectedTab == "chat" ? "bold" : "regular"}
							/>
							<Text
								color={selectedTab == "chat" ? "#228be6" : "gray"}
								weight={selectedTab == "chat" ? "bold" : "normal"}
							>
								Chat
							</Text>
						</Group>
					</UnstyledButton>
				</Link>
			</Stack>
		</Center>
	);
}

export default CustomNavbar;
