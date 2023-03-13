import React from "react";
import { Avatar, createStyles } from "@mantine/core";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";

const useStyles = createStyles((theme) => ({
	avatarSelectedOutline: {
		outline: "3px solid #228be6",
		outlineOffset: "0.1rem"
	},
}));

export const UserAvatar = (props: { isSelected: boolean }) => {
	const { user } = UserAuth();
	const { classes } = useStyles();

	return (
		<Link href={`/user`}>
			<Avatar
				radius={"xl"}
				size="lg"
				src={user?.photoURL}
				className={props.isSelected ? classes.avatarSelectedOutline : ""}
			/>
		</Link>
	);
};
