import {
	Stack,
	Group,
	Alert,
	Avatar,
	Collapse,
	Text,
	useMantineTheme,
	Tooltip,
	Loader,
} from "@mantine/core";
import { useState } from "react";
import Typewriter from "typewriter-effect";

function ChatMessage(props: {
	message: string;
	timestamp: string;
	isAssistant: boolean;
	assistantTypingChange: boolean;
	setAssistantTypingChange: Function;
	isLoader: boolean;
}) {
	const [assistantTypingFinished, setAssistantTypingFinished] = useState(false);
	const theme = useMantineTheme();
	const position = props.isAssistant ? "left" : "right";

	return (
		<Group position={position} noWrap>
			<Stack p={0} spacing={2} sx={{ maxWidth: "80%" }}>
				<Group position={position} spacing="xs" noWrap>
					{props.isAssistant && (
						<Tooltip label={"AI Assistant"} position="top-end">
							<Avatar src={"/assistant.png"} />
						</Tooltip>
					)}
					<Stack p={0} spacing={0} m={0}>
						<Group position={position} spacing={3} align="center" noWrap>
							{props.isAssistant ? (
								<Alert
									color="white"
									radius="md"
									py={8}
									variant={"outline"}
									style={{
										borderColor: `${theme.colors.gray[4]}`,
									}}
								>
									{props.isLoader ? <Loader variant="dots" size="sm" /> : <Text
										sx={(theme) => ({
											fontFamily: `Greycliff CF, ${theme.fontFamily}`,
										})}
										size="md"
									>
										{!assistantTypingFinished ? (
											<Typewriter
												options={{
													delay: 20,
												}}
												onInit={(typewriter) => {
													typewriter
														.typeString(props.message)
														.callFunction(() => {
															setAssistantTypingFinished(true);
															props.setAssistantTypingChange(
																!props.assistantTypingChange
															);
														})
														.start();
												}}
											/>
										) : (
											props.message
										)}
									</Text>}
								</Alert>
							) : (
								<Alert color={"blue"} radius="md" py={8} variant={"filled"}>
									<Text
										sx={(theme) => ({
											fontFamily: `Greycliff CF, ${theme.fontFamily}`,
										})}
										size="md"
									>
										{props.message}
									</Text>
								</Alert>
							)}
						</Group>
					</Stack>
				</Group>
				<Collapse in={true} px="xs">
					{
						<Text
							size="xs"
							align={position}
							color="dimmed"
							sx={(theme) => ({
								fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							})}
							ml={props.isAssistant ? 50 : 0}
						>
							{props.timestamp}
						</Text>
					}
				</Collapse>
			</Stack>
		</Group>
	);
}

export default ChatMessage;
