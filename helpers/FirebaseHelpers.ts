import { uuidv4 } from "@firebase/util";
import {
  collection,
  getDocs,
  where,
  query,
  limit
} from "firebase/firestore";
import { db } from "../firebase/config";
import { getDateNumber } from "./EventsDateConverter";

export async function getUpcomingEvents() {
  // upcoming events from firestore
  //
  const eventsRef = collection(db, "school-events")

  const q = query(eventsRef, where("startTime", ">", getDateNumber()))

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

  const q = query(eventsRef, where("startTime", "==", getDateNumber()), limit(10))

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

  const q = query(eventsRef, where("startTime", "<", getDateNumber()), limit(50))

  const querySnapshot = await getDocs(q);
  const documentArray: any[] = []


  querySnapshot.forEach((doc) => {
    documentArray.push(doc.data())
  });

  return documentArray

}
