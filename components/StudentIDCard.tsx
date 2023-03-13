import { createStyles, Card, Avatar, Text, Group, Button, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

}));


export function StudentIDCard({ name, grade, studentID }: any) {
  const { classes, theme } = useStyles();

  return (
    // @ts-ignore
    <Card withBorder w="50%" padding="xl" radius="md" className={classes.card}>
      <Title ta={"center"}>
        {name ? name : 'No Name'}
      </Title >
      <Text size="xl" ta="center" mt="sm">
        {studentID ? studentID : 'No Student ID'}
      </Text>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
      >
        Grade {grade ? grade : 'No Grade'}
      </Button>
    </Card >
  );
}
