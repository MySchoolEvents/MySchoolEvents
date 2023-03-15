import { Button } from "@mantine/core";
import CsvLink from "react-csv-export";


const CsvExport = ({ data, filename }: any) => {
  if (data.length == 0) return (<Button disabled>Export Students</Button>)
  return (

    // @ts-ignore
    < CsvLink data={data} fileName={filename}  >
      <Button disabled={data.length == 0}>Export Students</Button>
    </CsvLink >
  )
}

export default CsvExport
