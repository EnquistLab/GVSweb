import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import {
  TopBar,
} from "../components/";

import {
  requestChecklistsByCountry,
  requestChecklistsInfo,
  requestCitations
} from "../actions/";

export default function Home() {
  let [checklistsByCountry, setChecklistsByCountry] = useState([]);
  let [checklistsInfo, setChecklistsInfo] = useState([]);
  let [citations, setCitations] = useState([])

  useEffect(() => {
    async function fetchMapInfo() {
      // checklists per country
      let clByCountry = await requestChecklistsByCountry()
      setChecklistsByCountry(clByCountry)

      // checklists info
      // this is displayed on each popup
      let clInfo = await requestChecklistsInfo()
      setChecklistsInfo(clInfo)

      // getting citations
      let parsedCitations = await requestCitations();
      setCitations(parsedCitations)
    }
    fetchMapInfo()
  }, []);

  const MapWithNoSSR = dynamic(() => import("../components/map/map"), {
    ssr: false
  });

  return (
    <>
      <TopBar />
      <MapWithNoSSR citations={citations} checklistsByCountry={checklistsByCountry} checklistsInfo={checklistsInfo} />
    </>
  );
}
