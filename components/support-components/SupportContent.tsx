import { IconMessages, IconHelp } from "@tabler/icons";
import { Stack, Group, Title, Tabs, Space, Text } from "@mantine/core";
import { getCurrentDateOrdinalSuffixes } from "@/helpers/utils";
import FAQ from "./FAQ";
import Chat from "./Chat";

type SupportContentProps = {
	messages: { isAssistant: boolean; content: string; timestamp: Date; isLoader: boolean; }[];
	setMessages: Function;
};

function SupportContent({ messages, setMessages }: SupportContentProps) {
	return (
		<Stack m="md">
			<Group position="apart">
				<Stack spacing={0}>
					<Title
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 900,
						})}
					>
						Support
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

			<Tabs defaultValue="chat" radius={"md"} variant="default">
				<Tabs.List grow>
					<Tabs.Tab value="chat" icon={<IconMessages size="1.2rem" />}>
						<Text weight="bold" size="md">
							AI Chat
						</Text>
					</Tabs.Tab>
					<Tabs.Tab value="faq" icon={<IconHelp size="1.2rem" />}>
						<Text weight="bold" size="md">
							FAQ
						</Text>
					</Tabs.Tab>
				</Tabs.List>

				<Space h="sm" />

				<Tabs.Panel value="chat" pt="xs">
					<Chat messages={messages} setMessages={setMessages} />
				</Tabs.Panel>

				<Tabs.Panel value="faq" pt="xs">
					<FAQ />
				</Tabs.Panel>
			</Tabs>
		</Stack>
	);
}

export default SupportContent;
