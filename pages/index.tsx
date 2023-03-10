import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AppShell, Navbar, Text, ActionIcon, Group, Tooltip, Avatar, Stack, } from '@mantine/core'
import CustomNavbar from '@/components/Navbar'
import { IconChevronLeft } from "@tabler/icons"
import { UserAvatar } from '@/components/UserAvatar'
import CustomAppShell from '@/components/CustomAppShell'
import { getHomeScreenEvents } from '@/helpers/FirebaseHelpers'
import HomeContent from '@/components/Home-Components/HomeContent'

export async function getServerSideProps() {


  const events = await getHomeScreenEvents()

  return {
    props: {
      events: events
    }
  }
}


export default function Home({ events }: any) {
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

          <HomeContent current={events.current} past={events.past} upcoming={events.upcoming} />

        </CustomAppShell>
      </main>
    </>
  )
}
