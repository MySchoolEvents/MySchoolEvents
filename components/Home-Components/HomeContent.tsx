import { Card, Center, Group, Stack, Title, Text, Button } from '@mantine/core'
import React, { useEffect } from 'react'
import { Tabs, ActionIcon } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconPlus } from '@tabler/icons';
import { getCurrentDateOrdinalSuffixes } from '@/helpers/utils';
import { getCurrentEvents, getHomeScreenEvents, getPastEvents, getUpcomingEvents } from '@/helpers/FirebaseHelpers';
import { GetServerSideProps } from 'next';
import Upcoming from './Upcoming';
import Past from './Past';
import Current from './current-event-components/Current';
import NewEventModal from './NewEventModal';



export default function HomeContent(props: { userData: any, upcoming: any[], current: any[], past: any[], user: any }) {

  const [openNewEventModal, setOpenNewEventModal] = React.useState(false)

  const [current, setCurrent] = React.useState(props.current)
  const [upcoming, setUpcoming] = React.useState(props.upcoming)

  const [past, setPast] = React.useState(props.past)


  return (
    <>
      {props.user?.customClaims?.admin == true && (
        <NewEventModal opened={openNewEventModal} setOpened={setOpenNewEventModal} />
      )
      }
      <Stack m="md">
        <Group position='apart'>
          <Stack spacing={0} mb={7}>
            <Title
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              School Events
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
          {props.user?.customClaims?.admin == true && (
            <ActionIcon
              size="xl"
              variant="filled"
              color="blue"
              radius="xl"
              onClick={() => { setOpenNewEventModal(true) }}
            >
              <IconPlus />
            </ActionIcon>
          )}


        </Group>

        {/* @ts-ignore */}

        <Tabs variant="default" size="xl" radius="md" defaultValue="current">
          <Tabs.List grow>
            <Tabs.Tab value="past" color="blue" icon={<IconSettings size="1.2rem" />}><Text size="md" weight="bold">Past</Text></Tabs.Tab>
            <Tabs.Tab value="current" color="blue" icon={<IconMessageCircle size="1.2rem" />}><Text size="md" weight={"bold"}>Current</Text></Tabs.Tab>
            <Tabs.Tab value="upcoming" color="blue" icon={<IconPhoto size="1.2rem" />}><Text size="md" weight={"bold"}>Upcoming</Text></Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="upcoming" pt="xs">

            <Upcoming upcomingEvents={upcoming ?? []} />

          </Tabs.Panel>

          <Tabs.Panel value="current" pt="xs">
            <Current userData={props.userData} currentEvents={current ?? []} user={props.user} />
          </Tabs.Panel>
          <Tabs.Panel value="past" pt="xs">
            <Past pastEvents={past ?? []} />
          </Tabs.Panel>
        </Tabs>
      </Stack >
    </>
  )
}
