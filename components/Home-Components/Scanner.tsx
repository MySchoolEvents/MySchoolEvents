import React, { useState } from "react";
import BarCodeScanner from 'barcode-react-scanner';

function Scanner() {
  const [code, setCode] = useState<string>('')

  return (
    <>
      {code && <p> {code} </p>}
      <BarCodeScanner onUpdate={(err, resp): void => {
        if (resp) {
          setCode(resp.getText())
        }
      }}
      />
    </>
  );
}
export default Scanner;
