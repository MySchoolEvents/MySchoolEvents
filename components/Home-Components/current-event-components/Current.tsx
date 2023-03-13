import React, { useEffect, useState } from 'react'
import { Button, Center, Modal, Stack, Text } from '@mantine/core';
import Scanner from '../Scanner';
import dynamic from 'next/dynamic';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { CurrentEventsCard } from "./CurrentEventCards"
import { UserAuth } from '@/context/AuthContext';



const DynamicComponentWithNoSSR = dynamic(() => import("../Scanner"), {
  ssr: false
});


const Current = ({ currentEvents, user }: any) => {


  const [data, setData] = useState("No result");
  const [torchOn, setTorchOn] = useState(false)

  const [showBarcode, setShowBarcode] = useState(false)

  const [scanner, setScanner] = useState(<></>)




  return (



    <>

      {/**/}
      {/*   setShowBarcode(false) */}
      {/**/}
      {/* }}> */}
      {/*   <DynamicComponentWithNoSSR /> */}
      {/* </Modal> */}

      <Stack>
        <Center>
          <Stack w="70%" mt="xl">
            {
              currentEvents.map((event: any) => {
                return (
                  <CurrentEventsCard event={event} user={user} title={event.name} location={event.location} group={event.group} start={event.startTime} end={event.endTime} />
                )
              })

            }
          </Stack>
        </Center>

      </Stack >
    </>

  );
}

export default Current
