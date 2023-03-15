// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ChatGPTAPI } from "chatgpt";
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
	const api = new ChatGPTAPI({
		// @ts-ignore
		apiKey: process.env.OPENAI_API_KEY,
		systemMessage: req.body.studentSupport
			? getStudentSupportPrompt(req.body.conversationHistory)
			: getAdminSupportPrompt(req.body.conversationHistory),
	});

	try {
		let chatResponse = await api.sendMessage(req.body.message);
		res.status(200).json({ response: chatResponse.text });
	} catch (error) {
		// @ts-ignore
		res.status(401).json(error.message);
	}
}
