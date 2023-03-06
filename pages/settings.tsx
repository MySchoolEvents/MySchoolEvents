import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Stack, Avatar, AppShell, Navbar, Text, ActionIcon, Group, Tooltip, } from '@mantine/core'
import CustomNavbar from '@/components/Navbar'
import { IconChevronLeft } from "@tabler/icons"
import CustomAppShell from '@/components/CustomAppShell'

export default function Settings() {



  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Settings Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CustomAppShell selectedTab='settings'>
          settings
        </CustomAppShell>
      </main>
    </>
  )
}
