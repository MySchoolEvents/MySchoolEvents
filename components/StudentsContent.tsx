import { getCurrentDateOrdinalSuffixes } from '@/helpers/utils'
import { Badge, Button, Card, Group, GroupedTransition, Modal, Stack, Text, Title } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import React, { Children, useEffect } from 'react'
import { StudentTable } from './students-components/StudentsTable'
import nookies from "nookies";
import { admin } from "@/firebase/admin";
import CsvLink from "react-csv-export"

import dynamic from "next/dynamic";

const CsvExport = dynamic(() => import("./students-components/CsvLink"), {
  ssr: false
}
)



const StudentsContent = ({ students }: any) => {

  const [selected, setSelected] = React.useState<any[]>([])

  const calculatePrize = (points: number) => {
    // switch statement between 0 to 50

    if (points >= 0 && points <= 75) return "Sam's Club Hot Dog"
    else if (points >= 75 && points <= 120) return "School Spirit T-Shirt"
    else return "VIP Parking Spot"


  }


  const calculateWinners = () => {
    const tempStudentsArray = [...students]
    const winners = []

    let highestPoints = -1;
    let highestPointsIndex = -1;
    for (let i = 0; i < students.length; i++) {
      if (students[i].points > highestPoints) {
        highestPoints = students[i].points;
        highestPointsIndex = i;
      }
    }


    // student with highest points
    winners.push(students[highestPointsIndex])

    tempStudentsArray.splice(highestPointsIndex, 1)

    // get students by grade
    const freshman = tempStudentsArray.filter((student: any) => student.grade == 9)
    const sophomore = tempStudentsArray.filter((student: any) => student.grade == 10)
    const junior = tempStudentsArray.filter((student: any) => student.grade == 11)
    const senior = tempStudentsArray.filter((student: any) => student.grade == 12)


    // get random from each grade 

    winners.push(freshman[Math.floor(Math.random() * freshman.length)])
    winners.push(sophomore[Math.floor(Math.random() * sophomore.length)])
    winners.push(junior[Math.floor(Math.random() * junior.length)])
    winners.push(senior[Math.floor(Math.random() * senior.length)])

    return winners


  }
  const [winners, setWinners] = React.useState([])

  const getSelectedStudents = () => {
    const selectedStudents = students.filter((student: any) => selected.includes(student.id))
    // remove avatar
    selectedStudents.forEach((student: any) => {
      delete student.avatar
    })
    return selectedStudents
  }

  const getReadableDate = () => {
    const date = new Date()
    const readableDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
    return readableDate
  }

  const [openedWinnersModal, setOpenedWinnersModal] = React.useState(false)

  return (
    <>

      <Modal centered withCloseButton={false} opened={openedWinnersModal} onClose={() => setOpenedWinnersModal(false)}>
        <Stack>
          <Title ta="center">Winners</Title>
          {winners.map((student: any) => {
            return (Children.toArray(
              <Card shadow={"xl"}>
                <Stack >
                  <Group position={"apart"}>
                    <Text weight={"bold"}>{student.name}</Text>
                    <Badge color="violet">Grade {student.grade}</Badge>
                  </Group>
                  <Group position="apart">
                    <Text weight="bold" color="dimmed">points: {student.points}</Text>
                    <Text weight="bold" color="blue">{calculatePrize(student.points)}</Text>
                  </Group>
                </Stack>

              </Card>

            ))
          })}
          <Button onClick={() => {
            // @ts-ignore
            setWinners(calculateWinners())

          }}>Reroll Winners</Button>
        </Stack>
      </Modal>

      <Stack m={"md"}>
        <Group position="apart">
          <Stack spacing={0}>
            <Title
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Students
            </Title>
            <Title
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 700,
              })}
              color="blue"
              order={2}
            >
              {getCurrentDateOrdinalSuffixes()}
            </Title>

          </Stack>
          <Group>
            <Button onClick={() => {
              // @ts-ignore
              setWinners(calculateWinners())
              setOpenedWinnersModal(true)
            }
            } color="violet">Calculate Winners</Button>
            <CsvExport data={getSelectedStudents()} filename={`students_${getReadableDate()}.csv`} />
          </Group>
        </Group>

        {/* @ts-ignore */}
        <StudentTable setSelection={setSelected} selection={selected} data={students} />


      </Stack >
    </>


  )
}

export default StudentsContent
