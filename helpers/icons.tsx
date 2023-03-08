import { IconBook, IconSum, IconClipboard, IconAbacus, IconAlarm, IconArticle, IconBackpack, IconBallAmericanFootball, IconBallBasketball, IconBallon, IconBallonOff, IconBallpen, IconBeach, IconBellSchool, IconBooks, IconBuildingArch, IconCalculator, IconCalendar, IconChalkboard, IconChartBar, IconChecks, IconClock, IconDeviceDesktopAnalytics, IconMicrophone2, IconPodium, IconScale, IconSquareRoot, IconTicket, IconTimelineEvent } from "@tabler/icons";

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

export const courseIcons = [
  { icon: <IconBooks size={30} />, label: "Books" },
  { icon: <IconDeviceDesktopAnalytics size={30} />, label: "Desktop" },
  { icon: <IconBuildingArch size={30} />, label: "Arch" },
  { icon: <IconScale size={30} />, label: "Scale" },
  { icon: <IconBallAmericanFootball size={30} />, label: "Football" },
  { icon: <IconCalculator size={30} />, label: "Calculator" },
  { icon: <IconChalkboard size={30} />, label: "Book" },
  { icon: <IconSum size={30} />, label: "Sum" },
  { icon: <IconChartBar size={30} />, label: "Chart" },
]
