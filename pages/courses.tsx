import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Stack, AppShell, Navbar, Text, ActionIcon, Group, Tooltip, Avatar, } from '@mantine/core'
import CustomNavbar from '@/components/Navbar'
import { IconChevronLeft } from "@tabler/icons"
import CustomAppShell from '@/components/CustomAppShell'

export default function Courses() {

  return (
    <>
      <Head>
        <title>Courses</title>
        <meta name="description" content="Courses Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CustomAppShell selectedTab='courses'>
          Courses
        </CustomAppShell>
      </main>
    </>
  )
}
