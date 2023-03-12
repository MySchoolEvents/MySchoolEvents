import React, { useEffect, useState } from 'react'
import { Button, Modal, Stack, Text } from '@mantine/core';
import Scanner from './Scanner';
import dynamic from 'next/dynamic';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const DynamicComponentWithNoSSR = dynamic(() => import("../Home-Components/Scanner"), {
  ssr: false
});




const Current = ({ currentEvents }: any) => {


  const [data, setData] = useState("No result");
  const [torchOn, setTorchOn] = useState(false)

  const [showBarcode, setShowBarcode] = useState(false)

  const [scanner, setScanner] = useState(<></>)




  return (



    <>
      <Modal fullScreen opened={showBarcode} onClose={() => {

        setShowBarcode(false)

      }}>
        <DynamicComponentWithNoSSR />
      </Modal>

      <Stack>
        <Button onClick={() => setShowBarcode(true)}>show modal</Button>
      </Stack>
    </>

  );
}

export default Current
