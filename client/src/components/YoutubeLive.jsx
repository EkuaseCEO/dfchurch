import React, { useEffect, useState } from 'react'
import { apiFetch } from '../../../src/api';

export default function YoutubeLive() {
    const [setting, setSettings] = useState([]);
      
          useEffect(() => {
          const fetchPosts = async () => {
            // const res = await fetch('/api/post/getSettings');
            const res = await apiFetch('/api/post/getSettings');
            const data = await res.json();
            // console.log(data.Settings[0])
            setSettings(data.Settings[0]);
          };
          fetchPosts(); 
        }, []);

// const YoutubeLink = `"${setting.youtubelink}"`;
  return (
     <div className='p-3 bg-amber-100 dark:bg-slate-700'>
      {/* <h1>{setting.youtubelink}</h1> */}
        <div class="flex justify-center my-6">
        <iframe 
          class="w-full max-w-5xl aspect-video rounded shadow-lg"
          src={setting.youtubelink} 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
</div>

      </div>
  )
}
