import React from 'react'
import { AppShell, Navbar, Stack, Group } from '@mantine/core'
import { UserAvatar } from './UserAvatar'
import CustomNavbar from './Navbar'

interface Props {
  children: React.ReactNode;
  selectedTab: string;
}

const CustomAppShell = ({ children, selectedTab }: Props) => {
  return (
    <AppShell

      navbar={<Navbar width={{ base: 200 }} height={"100%"} p="xs">

        <CustomNavbar selectedTab={selectedTab} />

      </Navbar>}

    >

      <Stack spacing={0}>
        <Group position="right" maw="100%">
          <UserAvatar />
        </Group>


        {/* actual content */}
        {children}

      </Stack>

    </AppShell>
  )
}

export default CustomAppShell
