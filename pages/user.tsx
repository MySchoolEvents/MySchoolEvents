import Head from "next/head";
import CustomAppShell from "@/components/CustomAppShell";
import React from "react";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";
import { admin } from "@/firebase/admin";
import { UserContent } from "@/components/user-components/UserContent";
import { UserAuth } from "@/context/AuthContext";
import {
	getUserData,
	loadCourses,
	loadNumberOfCourses,
	loadNumberOfStudents,
} from "@/helpers/FirebaseHelpers";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		const token = await admin.auth().verifyIdToken(cookies.token);

		// the user is authenticated!
		const { uid } = token;

		const userObj = await admin.auth().getUser(uid);

		const numberOfCourses = await loadNumberOfCourses(uid);
		const numberOfStudents = await loadNumberOfStudents();
		const data = await getUserData(uid);
		const userData = data;

		return {
			props: {
				numberOfCourses: numberOfCourses,
				userData: userData,
				user: JSON.parse(JSON.stringify(userObj.toJSON())),
				numberOfStudents: numberOfStudents,
			},
		};
	} catch (err) {
		ctx.res.writeHead(302, { Location: "/auth" });
		ctx.res.end();

		return { props: {} as never };
	}
};

export default function User(props: {
	user: any;
	numberOfCourses: number;
	numberOfStudents: number;
	userData: any;
}) {
	const { user } = UserAuth();

	return (
		<>
			<Head>
				<title>User</title>
				<meta name="description" content="User Page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<CustomAppShell user={props.user} selectedTab="user">
					<UserContent
						// @ts-ignore
						role={props.user?.customClaims?.admin ? "Admin" : "Student"}
						avatar={user?.photoURL ?? ""}
						name={user?.displayName ?? ""}
						numberOfCourses={props.numberOfCourses}
						numberOfStudents={props.numberOfStudents}
						email={user?.email ?? ""}
						userData={props.userData}
					/>
				</CustomAppShell>
			</main>
		</>
	);
}
