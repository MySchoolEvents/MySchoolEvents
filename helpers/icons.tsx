import { IconAlarm, IconBackpack, IconBallon, IconBallonOff, IconBallpen, IconBeach, IconBellSchool, IconCalendar, IconChalkboard, IconChecks, IconClock, IconMicrophone2, IconPodium, IconTicket, IconTimelineEvent } from "@tabler/icons";

export function generateRandomIcon() {

  const icons = [
    <IconBackpack />,
    <IconCalendar />,
    <IconTicket />,
    <IconTimelineEvent />,
    <IconBeach />,
    <IconBellSchool />,
    <IconChalkboard />,
    <IconMicrophone2 />,
    <IconPodium />,
    <IconBallpen />,
    <IconBallon />,
    <IconAlarm />,
    <IconClock />,
    <IconChecks />,
  ]


  return icons[Math.floor(Math.random() * icons.length)]


}
