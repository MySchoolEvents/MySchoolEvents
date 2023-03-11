import { IconSend, IconRefresh, IconX } from "@tabler/icons";
import {
	ScrollArea,
	Stack,
	Group,
	ActionIcon,
	TextInput,
	Loader,
} from "@mantine/core";
import { formatChatTime, handleFetchError } from "@/helpers/utils";
import { Children, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { showNotification } from "@mantine/notifications";

type ChatProps = {
	messages: {
		isAssistant: boolean;
		content: string;
		timestamp: Date;
		isLoader: boolean;
	}[];
	setMessages: Function;
};

function Chat({ messages, setMessages }: ChatProps) {
	const [chatInput, setChatInput] = useState("");
	const [conversationHistory, setConversationHistory] = useState(
		"Chatbot: 'Hello! I'm the My School Events AI assistant. How may I assist you today?'"
	);
	const [assistantTypingChange, setAssistantTypingChange] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, assistantTypingChange]);

	useEffect;

	const handleNewTopic = () => {
		setChatInput("");
		setConversationHistory(
			"Chatbot: 'Hello! I'm the My School Events AI assistant. How may I assist you today?'"
		);
		setMessages([
			{
				isAssistant: true,
				content:
					"Hello! I'm the My School Events AI assistant. How may I assist you today?",
				timestamp: new Date(),
				isLoader: false,
			},
		]);
	};

	const handleChatSend = () => {
		// append new message from user and add loader message to indicate chatbot is loading
		const messagesClone = [
			...messages,
			{
				isAssistant: false,
				content: chatInput,
				timestamp: new Date(),
				isLoader: false,
			},
			{
				isAssistant: true,
				content: "",
				timestamp: new Date(),
				isLoader: true,
			},
		];
		setMessages(messagesClone);
		setChatInput("");
		const chatHistory = conversationHistory.concat(` User: '${chatInput}'`);

		fetch("/api/chat", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				message: chatInput,
				conversationHistory: chatHistory,
			}),
		})
			.then(handleFetchError)
			.then((res) => res.json())
			.then((data) => {
				chatHistory.concat(` Chatbot: '${data.response}'`);
				setConversationHistory(chatHistory);

				// remove chatbot loading message
				messagesClone.pop();

				// append new message from assistant
				messagesClone.push({
					isAssistant: true,
					content: data.response,
					timestamp: new Date(),
					isLoader: false,
				});
				setMessages(messagesClone);
				setAssistantTypingChange(!assistantTypingChange);
			})
			.catch((error) => {
				console.log(error);
				// remove chatbot loading message
				messagesClone.pop();

				// append new message from assistant
				messagesClone.push({
					isAssistant: true,
					content: `Sorry, looks like we ran into an issue sending your message. Check your Wi-Fi connection 
						or browser to make sure you have Internet access.`,
					timestamp: new Date(),
					isLoader: false,
				});
				setMessages(messagesClone);
				setAssistantTypingChange(!assistantTypingChange);
			});
	};

	return (
		<>
			<Stack sx={{ height: "66vh" }} p={0}>
				<ScrollArea p="xs" sx={{ height: "66vh" }}>
					<Stack>
						{Children.toArray(
							messages.map((message) => (
								<ChatMessage
									message={message.content}
									timestamp={formatChatTime(message.timestamp)}
									isAssistant={message.isAssistant}
									assistantTypingChange={assistantTypingChange}
									setAssistantTypingChange={setAssistantTypingChange}
									isLoader={message.isLoader}
								/>
							))
						)}
					</Stack>
					<div style={{ float: "left", clear: "both" }} ref={scrollRef} />
				</ScrollArea>
			</Stack>
			{/* chat box ui here */}
			<Group position="right" p="xs">
				<ActionIcon
					size="lg"
					title="New topic"
					onClick={() => {
						handleNewTopic();
					}}
				>
					<IconRefresh />
				</ActionIcon>
				<TextInput
					sx={{ flexGrow: 1 }}
					radius="lg"
					placeholder="Got a question? Type it in here."
					autoFocus
					value={chatInput}
					onChange={(event) => {
						setChatInput(event.currentTarget.value);
					}}
					onKeyDown={(event) => {
						if (event.key === "Enter" && chatInput !== "") {
							handleChatSend();
						}
					}}
				/>
				<ActionIcon
					size="lg"
					title="Send message"
					onClick={() => {
						if (chatInput !== "") handleChatSend();
					}}
				>
					<IconSend />
				</ActionIcon>
			</Group>
			{/* ends here */}
		</>
	);
}

export default Chat;
