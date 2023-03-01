import { Button, Center, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import React, { useState } from 'react'
import { IconHomeStar, IconSettings, IconBooks } from '@tabler/icons'

type Props = {

  selectedTab: string

}

function CustomNavbar({ selectedTab }: Props) {

  return (
    <Center h="100%">
      <Stack spacing={60} w="100%" mr="xs">
        <UnstyledButton>
          <Group position="center">
            <IconHomeStar color={selectedTab == "home" ? "#228be6" : "gray"} fontWeight={3} />
            <Text color={selectedTab == "home" ? "#228be6" : "gray"} >Home</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton>
          <Group position="center">
            <IconBooks color="gray" fontWeight={3} />
            <Text color="gray">Courses</Text>
          </Group>
        </UnstyledButton>
        <UnstyledButton>
          <Group position='center'>
            <IconSettings color="gray" fontWeight={3} />
            <Text color="gray">Settings</Text>
          </Group>
        </UnstyledButton>
      </Stack>
    </Center>
  )
}

export default CustomNavbar
