
import React, { useState } from 'react'
import { Center, Pagination, Stack, Text } from '@mantine/core'
import { EventTable } from './EventTable'

const Past = ({ pastEvents }: any) => {
  const [page, setPage] = useState(1)
  const [events, setEvents] = useState(pastEvents.slice(0, 10))

  const onPaginationChange = (newPage: number) => {
    setPage(newPage)

    if (newPage == 1) return setEvents(pastEvents.slice(0, 10))

    setEvents(pastEvents.slice(newPage * 10, newPage * 10 + 10))

  }



  return (
    <Stack mih={"100%"}>

      <EventTable events={events} totalEvents={pastEvents} />
      <Center>
        {/* @ts-ignore */}
        <Pagination pos={"fixed"} bottom={30} value={page} onChange={onPaginationChange} total={pastEvents.length / 10} />
      </Center>
    </Stack>
  )
}


export default Past
