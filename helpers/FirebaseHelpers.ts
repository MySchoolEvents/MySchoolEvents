import { uuidv4 } from "@firebase/util";
import {
  collection,
  getDocs,
  where,
  query,
  limit,
  updateDoc,
  arrayUnion,
  increment,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { getDateNumber } from "./EventsDateConverter";

export async function getStudents() {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  const usersArray: any[] = [];

  querySnapshot.forEach((doc) => {
    const user = doc.data();
    user.id = doc.id;
    usersArray.push(user);
  });

  return usersArray;

}

export async function loadNumberOfStudents() {
  const studentsRef = collection(db, "users");
  const studentsSnapshot = await getCountFromServer(studentsRef);
  return studentsSnapshot.data().count;
}

export async function getUpcomingEvents() {
  // upcoming events from firestore
  //
  const eventsRef = collection(db, "school-events");

  const q = query(eventsRef, where("startTime", ">", getDateNumber()), limit(30))

  const querySnapshot = await getDocs(q);

  const documentArray: any[] = [];

  querySnapshot.forEach((doc) => {
    const event = doc.data()
    event.id = doc.id
    documentArray.push(event);
  });

  return documentArray;
}

export async function getHomeScreenEvents() {
  const upcoming = await getUpcomingEvents();
  const past = await getPastEvents();
  const current = await getCurrentEvents();

  return { upcoming: upcoming, past: past, current: current };
}

export async function createNewEvent(name: string, location: string, startTime: number, endTime: number, eventID: string) {
  const eventsRef = doc(db, "school-events", eventID);
  try {
    await setDoc(eventsRef, {
      name: name,
      location: location,
      startTime: startTime,
      endTime: endTime,
    });
  } catch (error) {
    console.log(error);
  }
}


export async function updatePoints(userID: string, addedPoints: number, attendedEventID: string) {

  const userRef = doc(db, "users", userID);
  // increment points 

  try {
    await updateDoc(userRef, {
      points: increment(addedPoints),
      attendedEventID: arrayUnion(attendedEventID),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserData(userID: string) {
  const userRef = doc(db, "users", userID)
  // get data without using await

  const snap = await getDoc(userRef)

  if (snap.exists()) {

    const data = snap.data()

    return data


  } else {

    setDoc(userRef, {
      points: 0,
    })
  }

  // awaitgetDoc(userRef).then((doc) => {
  //
  //   if (doc.exists()) {
  //     const data = doc.data()
  //     console.log(typeof data)
  //     return data
  //   } else {
  //     // doc.data() will be undefined in this case
  //
  //     setDoc(userRef, {
  //       points: 0,
  //     })
  //
  //   }
  //
  // })






}

export async function getCurrentEvents() {
  // upcoming events from firestore
  //
  const eventsRef = collection(db, "school-events");

  const q = query(eventsRef, where("startTime", "==", getDateNumber()), limit(10))

  const querySnapshot = await getDocs(q);

  const documentArray: any[] = [];

  querySnapshot.forEach((doc) => {
    const event = doc.data()
    event.id = doc.id
    documentArray.push(event)
  });
  return documentArray;
}

export async function getPastEvents() {
  // upcoming events from firestore
  //
  const eventsRef = collection(db, "school-events");

  const q = query(eventsRef, where("startTime", "<", getDateNumber()), limit(30));

  const querySnapshot = await getDocs(q);
  const documentArray: any[] = [];

  querySnapshot.forEach((doc) => {
    const event = doc.data()
    event.id = doc.id
    documentArray.push(event);
  });

  return documentArray;
}

// delete an event from Firestore
export async function removeEvent(eventID: string) {
  const eventRef = doc(db, "school-events", eventID);
  try {
    await deleteDoc(eventRef);
  } catch (error) {
    console.log(error);
  }
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

// load number of courses from firestore
export async function loadNumberOfCourses(userID: string) {
  const coursesRef = collection(db, "users", userID, "courses");
  const coursesSnapshot = await getCountFromServer(coursesRef);
  return coursesSnapshot.data().count;
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

// set grade field for a specific user in firestore
export async function updateGrade(userID: string, grade: string) {
  const userRef = doc(db, "users", userID);

  // try to update grade field in user doc
  try {
    await updateDoc(userRef, {
      grade: grade,
    });
  } catch (error) {
    // if user doc doesn't exist, create it and set grade field
    try {
      await setDoc(userRef, {
        grade: grade,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
