import { Container, Accordion, createStyles, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	wrapper: {
		paddingTop: `calc(${theme.spacing.xl} * 2)`,
		paddingBottom: `calc(${theme.spacing.xl} * 2)`,
	},

	item: {
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[7],
	},
}));

const placeholder =
	"It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.";

function FAQ() {
	const { classes } = useStyles();
	return (
		<Container size="sm" className={classes.wrapper}>
			<Title
				sx={(theme) => ({
					fontFamily: `Greycliff CF, ${theme.fontFamily}`,
					fontWeight: 700,
				})}
				align="center"
				my="xl"
			>
				Frequently Asked Questions
			</Title>

			<Accordion
				chevronPosition="right"
				defaultValue="reset-password"
				variant="separated"
			>
				<Accordion.Item className={classes.item} value="reset-password">
					<Accordion.Control>
						How do I sign up for My School Events?
					</Accordion.Control>
					<Accordion.Panel>{`You can sign up for My School Events with Google. We integrate OAuth to 
					ensure an easy migration process for schools and seamless sign-in for users.`}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="another-account">
					<Accordion.Control>
						Can I create more that one account?
					</Accordion.Control>
					<Accordion.Panel>{placeholder}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="newsletter">
					<Accordion.Control>
						How can I subscribe to monthly newsletter?
					</Accordion.Control>
					<Accordion.Panel>{placeholder}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="credit-card">
					<Accordion.Control>
						Do you store credit card information securely?
					</Accordion.Control>
					<Accordion.Panel>{placeholder}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="payment">
					<Accordion.Control>
						How can I contact technical support if I have a problem with the
						application?
					</Accordion.Control>
					<Accordion.Panel>{`We have an intelligent support chatbot that is designed 
					to help users with any queries they might have regarding My School Events. 
					Alternatively, you can email support at devaidanbunch@gmail.com or devderekhsieh@gmail.com.`}</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
}

export default FAQ;
