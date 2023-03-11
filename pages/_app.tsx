import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthContextProvider } from "@/context/AuthContext";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	return (
		<>
			<Head>
				<title>CAP23</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: "light",
					colors: {
						"ocean-blue": [
							"#7AD1DD",
							"#5FCCDB",
							"#44CADC",
							"#2AC9DE",
							"#1AC2D9",
							"#11B7CD",
							"#09ADC3",
							"#0E99AC",
							"#128797",
							"#147885",
						],
					},
				}}
			>
				<NotificationsProvider />
				<AuthContextProvider>
					<Component {...pageProps} />
				</AuthContextProvider>
			</MantineProvider>
		</>
	);
}
