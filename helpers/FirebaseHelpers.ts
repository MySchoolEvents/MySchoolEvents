import {
	collection,
	getDocs,
	where,
	query,
	limit,
	updateDoc,
	serverTimestamp,
	doc,
	setDoc,
	getDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export async function getUpcomingEvents() {
	// upcoming events from firestore
	//
	const eventsRef = collection(db, "school-events");

	const q = query(eventsRef, where("startTime", ">", 309));

	const querySnapshot = await getDocs(q);

	const documentArray: any[] = [];

	querySnapshot.forEach((doc) => {
		documentArray.push(doc.data());
	});

	return documentArray;
}

export async function getHomeScreenEvents() {
	const upcoming = await getUpcomingEvents();
	const past = await getPastEvents();
	const current = await getCurrentEvents();

	return { upcoming: upcoming, past: past, current: current };
}

export async function getCurrentEvents() {
	// upcoming events from firestore
	//
	const eventsRef = collection(db, "school-events");

	const q = query(eventsRef, where("startTime", "==", 309), limit(10));

	const querySnapshot = await getDocs(q);

	const documentArray: any[] = [];

	querySnapshot.forEach((doc) => {
		documentArray.push(doc.data());
	});

	return documentArray;
}

export async function getPastEvents() {
	// upcoming events from firestore
	//
	const eventsRef = collection(db, "school-events");

	const q = query(eventsRef, where("startTime", "<", 309), limit(50));

	const querySnapshot = await getDocs(q);
	const documentArray: any[] = [];

	querySnapshot.forEach((doc) => {
		documentArray.push(doc.data());
	});

	return documentArray;
}

// load courses from firestore
export async function loadCourses(userID: string) {
	const coursesRef = collection(db, "users", userID, "courses");
	const querySnapshot = await getDocs(coursesRef);

	const coursesArray: any[] = [];

	querySnapshot.forEach((doc) => {
		coursesArray.push(doc.data());
	});

	return coursesArray;
}

// create a new course in firestore
export async function createCourse(
	userID: string,
	courseID: string,
	title: string,
	teacher: string,
	previewIconIndex: number,
	backgroundColorIndex: number
) {
	const courseRef = doc(db, "users", userID, "courses", courseID);
	try {
		await setDoc(courseRef, {
			title: title,
			teacher: teacher,
			previewIconIndex: previewIconIndex,
			backgroundColorIndex: backgroundColorIndex,
			id: courseID,
		});
	} catch (error) {
		console.log(error);
	}
}

// edit a course in firestore
export async function editCourse(
	userID: string,
	courseID: string,
	title: string,
	teacher: string,
	previewIconIndex: number
) {
	const courseRef = doc(db, "users", userID, "courses", courseID);
	try {
		await updateDoc(courseRef, {
			title: title,
			teacher: teacher,
			previewIconIndex: previewIconIndex,
		});
	} catch (error) {
		console.log(error);
	}
}

// remove a course from firestore
export async function removeCourse(userID: string, courseID: string) {
  const courseRef = doc(db, "users", userID, "courses", courseID);
  try {
    await deleteDoc(courseRef);
  } catch (error) {
    console.log(error);
  }
}
