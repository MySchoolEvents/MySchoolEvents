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
					<Accordion.Control>How can I reset my password?</Accordion.Control>
					<Accordion.Panel>{placeholder}</Accordion.Panel>
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
						What payment systems to you work with?
					</Accordion.Control>
					<Accordion.Panel>{placeholder}</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
}

export default FAQ;
