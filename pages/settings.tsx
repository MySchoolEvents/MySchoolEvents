import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
	Stack,
	Avatar,
	AppShell,
	Navbar,
	Text,
	ActionIcon,
	Group,
	Tooltip,
} from "@mantine/core";
import CustomNavbar from "@/components/Navbar";
import { IconChevronLeft } from "@tabler/icons";
import CustomAppShell from "@/components/CustomAppShell";
import React from "react";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { admin } from "@/firebase/admin";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await admin.auth().verifyIdToken(cookies.token);

		// the user is authenticated!
		const { uid } = token;

		return {
			props: {},
		};
	} catch (err) {
		ctx.res.writeHead(302, { Location: "/auth" });
		ctx.res.end();
		
		return { props: {} as never };
	}
};

export default function Settings() {
	return (
		<>
			<Head>
				<title>Settings</title>
				<meta name="description" content="Settings Page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<CustomAppShell selectedTab="settings">settings</CustomAppShell>
			</main>
		</>
	);
}
