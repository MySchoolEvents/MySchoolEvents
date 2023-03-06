import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AppShell, Navbar, Text, ActionIcon, Group, Tooltip, Avatar, Stack, } from '@mantine/core'
import CustomNavbar from '@/components/Navbar'
import { IconChevronLeft } from "@tabler/icons"
import HomeContent from '@/components/HomeContent'
import { UserAvatar } from '@/components/UserAvatar'
import CustomAppShell from '@/components/CustomAppShell'

export default function Home() {

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CustomAppShell selectedTab='home'>
          <HomeContent />
        </CustomAppShell>
      </main>
    </>
  )
}
