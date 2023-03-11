import * as admin from 'firebase-admin';
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(
	// @ts-ignore
	process.env.FIREBASE_SERVICE_ACCOUNT_KEY
);

if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: serviceAccount.project_id,
			clientEmail: serviceAccount.client_email,
			privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
		}),
	});
}

export { admin };