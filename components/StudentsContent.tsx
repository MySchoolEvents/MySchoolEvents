import { getCurrentDateOrdinalSuffixes } from '@/helpers/utils'
import { Group, GroupedTransition, Stack, Title } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { StudentTable } from './students-components/StudentsTable'
import nookies from "nookies";
import { admin } from "@/firebase/admin";


const StudentsContent = ({ students }: any) => {

  console.log(students)
  return (

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
      </Group>

      {/* @ts-ignore */}
      <StudentTable data={students} />


    </Stack>


  )
}

export default StudentsContent
