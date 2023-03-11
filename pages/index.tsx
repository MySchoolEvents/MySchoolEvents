import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
	AppShell,
	Navbar,
	Text,
	ActionIcon,
	Group,
	Tooltip,
	Avatar,
	Stack,
} from "@mantine/core";
import CustomNavbar from "@/components/Navbar";
import { IconChevronLeft } from "@tabler/icons";
import { UserAvatar } from "@/components/UserAvatar";
import CustomAppShell from "@/components/CustomAppShell";
import { getHomeScreenEvents } from "@/helpers/FirebaseHelpers";
import HomeContent from "@/components/Home-Components/HomeContent";
import React from "react";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { admin } from "@/firebase/admin";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await admin.auth().verifyIdToken(cookies.token);

		const { uid } = token;

		const events = await getHomeScreenEvents();

		return {
			props: {
				events: events,
			},
		};
	} catch (err) {
		ctx.res.writeHead(302, { Location: "/auth" });
		ctx.res.end();

		return { props: {} as never };
	}
};

export default function Home({ events }: any) {
	return (
			<>
				<Head>
					<title>Home</title>
					<meta name="description" content="Home Page" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main>
					<CustomAppShell selectedTab="home">
						<HomeContent
							current={events.current}
							past={events.past}
							upcoming={events.upcoming}
						/>
					</CustomAppShell>
				</main>
			</>
	);
}
