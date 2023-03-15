import CustomAppShell from '@/components/CustomAppShell'
import nookies from "nookies";
import Head from 'next/head'
import React from 'react'
import { admin } from '@/firebase/admin';
import StudentsContent from '@/components/StudentsContent';
import { GetServerSidePropsContext } from 'next';


import { getStudents } from "../helpers/FirebaseHelpers"

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {


  try {
    const cookies = nookies.get(ctx);
    const token = await admin.auth().verifyIdToken(cookies.token);

    const { uid } = token;

    const userObj = await admin.auth().getUser(uid);

    const user = userObj.toJSON();
    const students = await getStudents()

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        students: students
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/auth" });
    ctx.res.end();

    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never };
  }

}

const students = ({ students, user }: any) => {
  console.log(students)
  return (

    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CustomAppShell user={user} selectedTab="students" >
          <StudentsContent students={students} />
        </CustomAppShell>
      </main>
    </>


  )
}

export default students
