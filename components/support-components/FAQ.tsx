import {
	Container,
	Accordion,
	createStyles,
	Title,
	Anchor,
} from "@mantine/core";

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

			<Accordion chevronPosition="right" defaultValue="faq" variant="separated">
				<Accordion.Item className={classes.item} value="sign-up">
					<Accordion.Control>
						How do I sign up for My School Events?
					</Accordion.Control>
					<Accordion.Panel>{`You can sign up for My School Events with Google. We integrate OAuth to 
					ensure an easy migration process for schools and seamless sign-in for users.`}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="id-scanner">
					<Accordion.Control>
						{`Why isn't the student ID scanner working?`}
					</Accordion.Control>
					<Accordion.Panel>{`There may be a multitude of reasons for this. Try taking your ID out of any lanyards or coverings that 
					may be obscuring the full barcode. Similarly, make sure the ID is in full view of the camera and try not to shake or move 
					your hand. If all else fails, you can close the modal and try again later, or contact support.`}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="newsletter">
					<Accordion.Control>
						{`Help! I can't find an event I'm looking for...`}
					</Accordion.Control>
					<Accordion.Panel>{`You can find events in the home page. If the event you're looking for is currently ongoing,
					you should be able to find it in the current events tab. It may have already occurred, in which case you'll find it 
					in the past events tab. Similarly, if it hasn't happened yet, you can find it in the upcoming events tab. Both the upcoming 
					and past tables have a search bar, so you should be able to find it easily. If not, feel free to ask the chatbot 
					for help or contact support.`}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="credit-card">
					<Accordion.Control>
						Do you store information securely?
					</Accordion.Control>
					<Accordion.Panel>{`Yes! We store all of our information on Google's cloud computing service Firebase. All passwords are salted, hashed and 
					secure. Your information is accessible through a NoSQL database that allows us to easily store, sync and query data.`}</Accordion.Panel>
				</Accordion.Item>

				<Accordion.Item className={classes.item} value="technical-support">
					<Accordion.Control>
						How can I contact technical support if I have a problem with the
						application?
					</Accordion.Control>
					<Accordion.Panel>
						{`We have an intelligent support chatbot that is designed 
					to help users with any queries they might have regarding My School Events. This is located in the AI Chat tab
					on the top left corner of your screen. Alternatively, you can email support at the following addresses: `}
						<Anchor href="mailto: devaidanbunch@gmail.com">
							devaidanbunch@gmail.com
						</Anchor>
						{` or `}
						<Anchor href="mailto: devderekhsieh@gmail.com">
							devderekhsieh@gmail.com.
						</Anchor>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
}

export default FAQ;
