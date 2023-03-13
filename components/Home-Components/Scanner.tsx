import React, { useState } from "react";
import BarCodeScanner from 'barcode-react-scanner';
import { Center, Flex, Group } from "@mantine/core";

function Scanner({ setID }: { setID: any }) {

  return (
    <BarCodeScanner onUpdate={(err, resp): void => {
      if (resp && resp.getText().length == 6) {
        console.log(resp.getText())
        setID(resp.getText())
      }
    }}
    />
  );
}
export default Scanner;
