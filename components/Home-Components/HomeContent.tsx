import { Card, Center, Group, Stack, Title, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { Tabs, ActionIcon } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings, IconPlus } from '@tabler/icons';
import { getCurrentDateOrdinalSuffixes } from '@/helpers/utils';
import { getCurrentEvents, getHomeScreenEvents, getPastEvents, getUpcomingEvents } from '@/helpers/FirebaseHelpers';
import { GetServerSideProps } from 'next';
import Upcoming from './Upcoming';
import Past from './Past';
import Current from './Current';



export default function HomeContent(props: { upcoming: any[], current: any[], past: any[] }) {

  return (
    <Stack>
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
        {/* <ActionIcon size="xl" variant="filled" color="blue" radius="xl"> */}
        {/*   <IconPlus /> */}
        {/* </ActionIcon> */}

      </Group>

      {/* @ts-ignore */}

      <Tabs variant="default" size="xl" radius="md" defaultValue="current">
        <Tabs.List grow>
          <Tabs.Tab value="past" color="blue" icon={<IconSettings size="1.2rem" />}><Text size="md" weight="bold">Past</Text></Tabs.Tab>
          <Tabs.Tab value="current" color="blue" icon={<IconMessageCircle size="1.2rem" />}><Text size="md" weight={"bold"}>Current</Text></Tabs.Tab>
          <Tabs.Tab value="upcoming" color="blue" icon={<IconPhoto size="1.2rem" />}><Text size="md" weight={"bold"}>Upcoming</Text></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="upcoming" pt="xs">

          <Upcoming upcomingEvents={props.upcoming ?? []} />

        </Tabs.Panel>

        <Tabs.Panel value="current" pt="xs">
          <Current currentEvents={props.current ?? []} />
        </Tabs.Panel>
        <Tabs.Panel value="past" pt="xs">
          <Past pastEvents={props.past ?? []} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  )
}
