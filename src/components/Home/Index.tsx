import React, { useEffect, useState } from "react";
import HomeSpeakers from "./HomeSpeakers";
import HomeOrganizers from "./HomeOrganizers/Index";
import HomeSponsors from "./HomeSponsors/Index";
import LastEvents from "./LastEvents/Index";
import { getCommunitySummary } from "../../services/communityServices";
import { Member } from "../../services/models/Member";

import { Sponsor } from "../../services/models/sponsor";
import { EventDetail } from "../../services/models/Events/Event";
import NumbersHomeSummary from "./NumbersHomeSummary";
import HomeHeaderBanner from "./HomeHeaderBanner/Index";
import PhotosSummary from './PhotosSummary/Index';

type LoginProps = {};
export const Home: React.SFC<LoginProps> = () => {
  const [loadReady, setLoadReady] = useState(false);
  const [sponsors, setSponsors] = useState(new Array<Sponsor>());
  const [speakers, setSpeakers] = useState(new Array<Member>());
  const [organizers, setOrganizers] = useState(new Array<Member>());
  const [lastEvents, setLastEvents] = useState(new Array<EventDetail>());
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [totalSlackMembers, setTotalSlackMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    getCommunitySummary().then(x => {
      setSponsors(x.sponsors);
      setSpeakers(x.speakers);
      setOrganizers(x.organizers);
      setLastEvents(x.lastEvents);
      setTotalEvents(x.totalEvents);
      setTotalSlackMembers(x.totalUsersSlack);
      setTotalMembers(x.totalUsersMeetup);
      setTotalSpeakers(x.totalSpeakers);
      setLoadReady(true);
    });
  }, []);
  return (
    <>
      {/* <HomeHeaderBanner></HomeHeaderBanner> */}
      {/* <NextEvent></NextEvent> */}

      {/* <LastEvents events={lastEvents}></LastEvents> */}
      {/* <PhotosSummary></PhotosSummary> */}
      {/* <HomeOrganizers organizers={organizers}></HomeOrganizers> */}
      {/* <VideoPreview></VideoPreview> */}

      {loadReady && <>
        <HomeOrganizers organizers={organizers}></HomeOrganizers>
        {/* <PhotosSummary></PhotosSummary> */}
        <LastEvents events={lastEvents}></LastEvents>
        <HomeSpeakers speakers={speakers}></HomeSpeakers>

        <HomeSponsors sponsors={sponsors}></HomeSponsors>
        <NumbersHomeSummary
          totalEvents={totalEvents}
          totalMembers={totalMembers}
          totalSlackMembers={totalSlackMembers}
          totalSpeakers={totalSpeakers}
        ></NumbersHomeSummary>
      </>
      }


    </>
  );
};

export default Home;
