import { IconSend, IconRefresh } from "@tabler/icons";
import {
	ScrollArea,
	Stack,
	Group,
	ActionIcon,
	TextInput,
	useMantineTheme,
} from "@mantine/core";
import { formatChatTime } from "@/helpers/utils";
import { Children } from "react";
import ChatMessage from "./ChatMessage";

type ChatProps = {
	messages: { isAssistant: boolean; content: string; timestamp: Date }[];
};

function Chat({ messages }: ChatProps) {
	const theme = useMantineTheme();

	return (
		<>
			<Stack sx={{ height: "67vh" }} p={0}>
				<ScrollArea p="xs" sx={{ height: "67vh" }}>
					<Stack>
						{Children.toArray(
							messages.map((message) => (
								<ChatMessage
									message={message.content}
									timestamp={formatChatTime(message.timestamp)}
									isAssistant={message.isAssistant}
								/>
							))
						)}
					</Stack>
				</ScrollArea>
			</Stack>
			{/* chat box ui here */}
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
			{/* ends here */}
		</>
	);
}

export default Chat;
