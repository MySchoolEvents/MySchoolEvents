import { useEffect, useState } from "react";
import { IconSend, IconRefresh } from "@tabler/icons";
import {
	ScrollArea,
	Stack,
	Group,
	ActionIcon,
	Alert,
	Avatar,
	Collapse,
	TextInput,
	Text,
	useMantineTheme,
	Tooltip,
} from "@mantine/core";
import { formatChatTime } from "@/helpers/utils";

function Chat() {
	const [hovering, setIsHovering] = useState(false);
	const theme = useMantineTheme();

	const messages = [
		{
			author: "assistant",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat totam, magnam quod iure tempore necessitatibus iusto esse praesentium? Alias quis rem sed, quaerat libero molestias delectus quidem voluptatem error ea?",
			timestamp: new Date(Date.now()),
		},
		{
			author: "user",
			content: "Thank you.",
			timestamp: new Date(Date.now()),
		},
	];

	return (
		<>
			<Stack sx={{ height: "67vh" }} p={0}>
				<ScrollArea p="xs" sx={{ height: "67vh" }}>
					<Stack>
						{/* user chat message on the right starts here */}
						<Group
							position={"right"}
							noWrap
							onMouseEnter={() => {
								setIsHovering(true);
							}}
							onMouseLeave={() => {
								setIsHovering(false);
							}}
						>
							<Stack p={0} spacing={2} sx={{ maxWidth: "80%" }}>
								<Group position={"right"} spacing="xs">
									<Stack p={0} spacing={0} m={0}>
										<Group position={"right"} spacing={3} align="center" noWrap>
											<Alert
												color={"blue"}
												radius="md"
												py={8}
												variant={"filled"}
											>
												<Text
													sx={(theme) => ({
														fontFamily: `Greycliff CF, ${theme.fontFamily}`,
													})}
													size="md"
												>
													Lorem ipsum dolor, sit amet consectetur adipisicing
													elit. Quisquam, repellendus. Reprehenderit minus vero
													error mollitia, aperiam veritatis similique voluptate,
													corporis natus, praesentium libero aspernatur? Ab id
													quibusdam alias iste odio?
												</Text>
											</Alert>
										</Group>
									</Stack>
								</Group>
								<Collapse in={true} px="xs">
									{
										<Text size="xs" align={"right"} color="dimmed">
											2:16 PM
										</Text>
									}
								</Collapse>
							</Stack>
						</Group>
						{/* ends here */}
						{/* message from chatbot on the left starts here */}
						<Group
							position={"left"}
							noWrap
							onMouseEnter={() => {
								setIsHovering(true);
							}}
							onMouseLeave={() => {
								setIsHovering(false);
							}}
						>
							<Stack p={0} spacing={2} sx={{ maxWidth: "80%" }}>
								<Group position={"left"} spacing="xs">
									<Tooltip label={"AI Assistant"} position="top-end">
										<Avatar />
									</Tooltip>

									<Stack p={0} spacing={0} m={0}>
										<Group position={"left"} spacing={3} align="center" noWrap>
											<Alert
												color="white"
												radius="md"
												py={8}
												variant={"outline"}
												style={{
													borderColor: `${theme.colors.gray[4]}`,
												}}
											>
												<Text
													sx={(theme) => ({
														fontFamily: `Greycliff CF, ${theme.fontFamily}`,
													})}
													size="md"
												>
													Good afternoon
												</Text>
											</Alert>
										</Group>
									</Stack>
								</Group>
								<Collapse in={true} px="xs">
									{
										<Text size="xs" color="dimmed" ml={50}>
											2:16 PM
										</Text>
									}
								</Collapse>
							</Stack>
						</Group>
						{/* ends here */}
					</Stack>
				</ScrollArea>
			</Stack>
			{/* chat box ui here */}
			{/* <div style={{ position: "sticky", bottom: 3, right: 3}}> */}
			<Group position="right" p="xs">
				<ActionIcon size="lg" title="New conversation">
					<IconRefresh />
				</ActionIcon>
				<TextInput
					sx={{ flexGrow: 1 }}
					radius="lg"
					placeholder="Got a question? Type it in here."
					autoFocus
				/>
				<ActionIcon size="lg" title="Send message">
					<IconSend />
				</ActionIcon>
			</Group>
			{/* </div> */}
			{/* ends here */}
		</>
	);
}

export default Chat;
