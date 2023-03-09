import { IconMessages, IconHelp } from "@tabler/icons";
import {
	Stack,
	Group,
	Title,
	Tabs,
	Space,
} from "@mantine/core";
import { getCurrentDateOrdinalSuffixes } from "@/helpers/utils";
import FAQ from "./faq";
import Chat from "./chat";

function SupportContent() {
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
					<Tabs.Tab value="chat" icon={<IconMessages size="0.8rem" />}>
						AI Chat
					</Tabs.Tab>
					<Tabs.Tab value="faq" icon={<IconHelp size="0.8rem" />}>
						FAQ
					</Tabs.Tab>
				</Tabs.List>

				<Space h="sm" />

				<Tabs.Panel value="chat" pt="xs">
					<Chat />
				</Tabs.Panel>

				<Tabs.Panel value="faq" pt="xs">
					<FAQ />
				</Tabs.Panel>
			</Tabs>
		</Stack>
	);
}

export default SupportContent;
