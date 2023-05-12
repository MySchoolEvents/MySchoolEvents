// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import {
	getAdminSupportPrompt,
	getStudentSupportPrompt,
} from "@/helpers/prompts";
dotenv.config();

type Data = {
	response: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: req.body.studentSupport
					? getStudentSupportPrompt(req.body.conversationHistory)
							.trim()
							.replaceAll("\n", " ")
					: getAdminSupportPrompt(req.body.conversationHistory)
							.trim()
							.replaceAll("\n", " "),
			},
			{
				role: "user",
				content: req.body.message,
			},
		],
		temperature: 1.0,
		max_tokens: 75,
	});

	try {
		res
			.status(200)
			// @ts-ignore
			.json({ response: completion.data.choices[0].message.content });
	} catch (error) {
		// @ts-ignore
		res.status(401).json(error.message);
	}
}
