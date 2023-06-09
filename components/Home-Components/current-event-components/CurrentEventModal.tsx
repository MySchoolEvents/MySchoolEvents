import { useEffect, useState } from "react";
import { useCountUp } from 'react-use-count-up';
import CountUp from "react-countup";
import dynamic from "next/dynamic";
import {
  Center,
  createStyles,
  Flex,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Stepper, Button, Group, Card } from "@mantine/core";
import Current from "./Current";
import { StudentIDCard } from "@/components/StudentIDCard";
import { User as FirebaseUser } from "firebase/auth";
import { IconAlertTriangle } from "@tabler/icons";
import { updatePoints } from "@/helpers/FirebaseHelpers";

const StudentIDScanner = dynamic(() => import("../Scanner"), {
  ssr: false,
});

const useStyles = createStyles((theme) => ({
  invalid: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.red[8], 0.15)
        : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === "dark" ? 7 : 6],
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

function CurrentEventModal({
  setCompletedEvents,
  completedEvents,
  userData,
  user,
  event,
  openEventModal,
  gradeExists,
  setGradeExists,
  currentGrade,
  setCurrentGrade,
}: any) {
  const { classes } = useStyles();

  const [active, setActive] = useState(0);

  const [studentID, setStudentID] = useState("");
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const checkEventID = (inputID: any) => {
    // event id = event.id first 5 characters + last character
    //

    const eventID = event.id.slice(0, 4) + event.id.slice(-1);

    if (inputID.toLowerCase() === eventID.toLowerCase()) {
      nextStep();
    }
  };

  // show studentIDCard if studentID matches email of user

  const showStudent = () => {
    // get beginning of email
    const emailHead = user?.email?.split("@")[0];
    if (emailHead === studentID) {
      return (
        <Stack w="100%">
          <Center>
            <StudentIDCard
              name={user?.displayName}
              grade={userData.grade}
              gradeExists={gradeExists}
              setGradeExists={setGradeExists}
              currentGrade={currentGrade}
              setCurrentGrade={setCurrentGrade}
              studentID={studentID}
            />
          </Center>
          <Space h="xl" />
          <Center>
            <Button
              color="gray"
              radius={"xl"}
              size="lg"
              maw="50%"
              onClick={nextStep}
              disabled={!gradeExists}
            >
              Continue to next step
            </Button>
          </Center>
        </Stack>
      );
    } else {
      return (
        <Stack>
          <Title>{"This ID doesn't seem like it belongs to you"}</Title>
          <Button onClick={() => setStudentID("")}>Try again</Button>
        </Stack>
      );
    }
  };

  const getTotalPoints = () => {

    const initialPoints = userData?.points ? userData?.points : 0;

    return initialPoints + 5;
  };



  const [started, setStarted] = useState(false);
  const value = useCountUp({ start: userData?.points ? userData?.points : 0, end: getTotalPoints(), duration: 2500, started });


  useEffect(() => {

    if (active === 2) {
      setStarted(true);
      // timer for 3000 seconds 
      setTimeout(() => {

        updatePoints(user.uid, 5, event.id);
        const newCompletedEvents = [...completedEvents, event.id];
        setCompletedEvents(newCompletedEvents);
      }, 3000)
    }

  }, [active])


  return (
    <>
      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="First step" description="Scan Student ID">
          {/* student ID scanner */}
          <Center h="70vh">
            {/* barcode scanner only renders when modal is event to prevent camera from being on while students browse */}
            {openEventModal ? (
              <>
                {/* if student ID hasn't been scanned, shows scanner, otherwise shows the next step */}
                {studentID == "" ? (
                  <Card
                    withBorder
                    p="xl"
                    radius="md"
                    className={classes.card}
                    style={{ transform: "translateY(7%)" }}
                  >
                    <Title
                      ta="center"
                      fz="lg"
                      mb="md"
                      sx={(theme) => ({
                        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        fontWeight: 700,
                      })}
                    >
                      Scan the barcode on your student ID using the camera
                      <Text
                        ta="center"
                        fz="sm"
                        mt={0}
                        mb="md"
                        c="dimmed"
                        sx={(theme) => ({
                          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                          fontWeight: 700,
                        })}
                      >
                        {"if it's in a lanyard or covering, take it out"}
                      </Text>
                    </Title>
                    <StudentIDScanner setID={setStudentID} />
                  </Card>
                ) : (
                  showStudent()
                )}
              </>
            ) : (
              <></>
            )}
          </Center>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Input Event ID ">
          <Stack h="80vh" spacing={40} pt="30vh">
            <Title ta="center">Enter Event ID below</Title>
            <Center>
              <TextInput
                placeholder="Event ID"
                maw={"50%"}
                size="lg"
                onChange={(e) => checkEventID(e.target.value)}
              />
            </Center>
            <Center>
              <Text color="dimmed">
                Note: Ask event administrator for the Event ID
              </Text>
            </Center>
          </Stack>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get Points">
          <Stack h="80vh" spacing={40} pt="20vh">
            <Title ta="center">Thanks for attending {event.name}!</Title>

            <Center>
              <Flex align={"center"} ml="xl">
                {/* <CountUp */}
                {/*   start={userData?.points ? userData?.points : 0} */}
                {/*   end={getTotalPoints()} */}
                {/*   duration={4.0} */}
                {/*   onEnd={() => { */}
                {/*     // update on firebase */}
                {/*   }} */}
                {/* > */}
                {/*   {({ countUpRef, start }: any) => ( */}
                <span
                  style={{
                    fontSize: "90px",
                    fontWeight: "bold",
                    color: "#339af0",
                  }}
                >{value}</span>
                {/*   )} */}
                {/* </CountUp> */}

                <Text weight={"bold"} color="dimmed" size="lg" ml="xs">
                  +5 points
                </Text>
              </Flex>
            </Center>
          </Stack>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      {/*   <Button variant="default" onClick={prevStep}>Back</Button> */}
      {/*   <Button onClick={nextStep}>Next step</Button> */}
      {/* </Group> */}
    </>
  );
}
export default CurrentEventModal;
