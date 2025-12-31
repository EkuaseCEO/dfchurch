import React, { useEffect, useState } from 'react'
import YoutubeLive from '../components/YoutubeLive'
import CallToAction from '../components/CallToAction'
import DaysofService from '../components/daysofService'
import { apiFetch } from '../../../src/api';

export default function Contact() {
   const [setting, setSetting] = useState([]);
   useEffect(() => {
                const fetchSettings = async () => {
                      try {
                        const res = await apiFetch('/post/getSettings');
                        // console.log(res.Settings[0]);
                        setSetting(res.Settings[0]);
                      } catch (err) {
                        console.error("Fetch failed:", err);
                      }
                    };
              fetchSettings(); 
            }, []);
  return (
    <div>
        <DaysofService  setting={setting} />
        <YoutubeLive />
        <CallToAction />

    </div>
  )
}
