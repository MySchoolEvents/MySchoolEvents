import { Card, Center, Group, Stack, Title, Text } from '@mantine/core'
import React from 'react'
import { Tabs } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons';

type Props = {}

export default function HomeContent({ }: Props) {
  return (
    <Center mah="100%" w="100%">
      <Tabs variant="default" radius="md" defaultValue="current">
        <Tabs.List grow>
          <Tabs.Tab value="upcoming" color="blue" icon={<IconPhoto size="0.8rem" />}>Upcoming</Tabs.Tab>
          <Tabs.Tab value="current" color="red" icon={<IconMessageCircle size="0.8rem" />}>Current</Tabs.Tab>
          <Tabs.Tab value="past" color="green" icon={<IconSettings size="0.8rem" />}>Past</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          Gallery tab content
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          Messages tab content
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </Center>
  )
}
