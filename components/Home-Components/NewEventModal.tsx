import React, { useState } from 'react'
import { Modal, Title, TextInput, Stack, Button } from "@mantine/core"
import { DatePicker } from '@mantine/dates';
import { createNewEvent } from '@/helpers/FirebaseHelpers';
import { useRouter } from 'next/router'

const NewEventModal = ({ opened, setOpened }: any) => {
  const router = useRouter()
  const [dateVal, setDateVal] = useState<Date | null>(null);
  const [eventName, setEventName] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");


  const addEvent = () => {
    // Add event to database


    // convert date to numeric value
    // @ts-ignore
    const month = dateVal.getMonth() + 1; // Adding 1 to the month value because it is zero-indexed
    // @ts-ignore
    const day = dateVal.getDate();
    const numericValue = month * 100 + day;


    createNewEvent(eventName, eventLocation, numericValue, numericValue)


    // close modal
    setOpened(false);
    router.reload()

  }


  return (


    <Modal withCloseButton={false} centered opened={opened} onClose={() => {
      setOpened(false)


    }}>

      <Stack>
        <Title>Add New Event</Title>

        <TextInput label="Event Name" placeholder="Event Name" onChange={(e) => setEventName(e.target.value)} value={eventName} />
        <TextInput label="Location" placeholder="Event Location" onChange={(e) => setEventLocation(e.target.value)} value={eventLocation} />
        <DatePicker label="Date" value={dateVal} onChange={setDateVal} />

        <Button disabled={!dateVal || !eventName || !eventLocation} onClick={addEvent}>Finish</Button>


      </Stack>
    </Modal>


  )
}

export default NewEventModal
