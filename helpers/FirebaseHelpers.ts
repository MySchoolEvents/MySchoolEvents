import { uuidv4 } from "@firebase/util";
import {
  collection,
  getDocs,
  where,
  query,
  limit
} from "firebase/firestore";
import { db } from "../firebase/config";

export async function getUpcomingEvents() {
  // upcoming events from firestore
  //
  const eventsRef = collection(db, "school-events")

  const q = query(eventsRef, where("startTime", ">", 309))

  const querySnapshot = await getDocs(q);

  const documentArray: any[] = []


  querySnapshot.forEach((doc) => {
    documentArray.push(doc.data())
  });

  return documentArray
}

export async function getHomeScreenEvents() {
  const upcoming = await getUpcomingEvents()
  const past = await getPastEvents()
  const current = await getCurrentEvents()


  return { upcoming: upcoming, past: past, current: current }

}

export async function getCurrentEvents() {
  // upcoming events from firestore
  //
  const eventsRef = collection(db, "school-events")

  const q = query(eventsRef, where("startTime", "==", 309), limit(10))

  const querySnapshot = await getDocs(q);

  const documentArray: any[] = []


  querySnapshot.forEach((doc) => {
    documentArray.push(doc.data())
  });

  return documentArray

}

export async function getPastEvents() {
  // upcoming events from firestore
  //
  const eventsRef = collection(db, "school-events")

  const q = query(eventsRef, where("startTime", "<", 309), limit(50))

  const querySnapshot = await getDocs(q);
  const documentArray: any[] = []


  querySnapshot.forEach((doc) => {
    documentArray.push(doc.data())
  });

  return documentArray

}
