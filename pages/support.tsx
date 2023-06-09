import Head from "next/head";
import CustomAppShell from "@/components/CustomAppShell";
import SupportContent from "@/components/support-components/SupportContent";
import { GetServerSideProps } from "next";
import { useState } from "react";
import React from "react";
import nookies from "nookies";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { admin } from "@/firebase/admin";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await admin.auth().verifyIdToken(cookies.token);

    const { uid } = token;
    const userObj = await admin.auth().getUser(uid);

    const user = userObj.toJSON();

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/auth" });
    ctx.res.end();

    return { props: {} as never };
  }
};

function Support({ user }: any) {
  const [messageData, setMessageData] = useState([
    {
      isAssistant: true,
      content:
        "Hello! I'm the My School Events AI assistant. How may I assist you today?",
      timestamp: new Date(),
      isLoader: false,
    },
  ]);

  return (
    <>
      <Head>
        <title>CAP23</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CustomAppShell user={user} selectedTab="support">
          <SupportContent messages={messageData} setMessages={setMessageData} user={user} />
        </CustomAppShell>
      </main>
    </>
  );
}

export default Support;

// for later iterations
// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const messages = [
// 		{
// 			isAssistant: true,
// 			content:
// 				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam minima repudiandae accusamus sequi est cumque voluptate, quia laboriosam nostrum veniam illo accusantium iusto officiis nam dignissimos culpa hic obcaecati. Maiores.",
// 			timestamp: new Date().toJSON(),
// 		},
// 		{
// 			isAssistant: false,
// 			content: "nam dignissimos culpa hic obcaecati. Maiores.",
// 			timestamp: new Date().toJSON(),
// 		},
// 	];

// 	return {
// 		props: {
// 			messages: messages,
// 		},
// 	};
// };

// type SupportProps = {
// 	messages: { isAssistant: boolean; content: string; timestamp: string }[];
// };
