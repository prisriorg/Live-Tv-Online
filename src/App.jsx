import { useEffect, useState } from 'react';
import HlsPlayer from './HlsPlayer';
const App = () => {
  const [channels, setChannels] = useState([]);

  const [load,setLoad] = useState(false)

  const extractAttributes = (line) => {
    const titleMatch = line.match(/,(.+)$/);
    const tvgIdMatch = line.match(/tvg-id="([^"]*)"/);
    const tvgLogoMatch = line.match(/tvg-logo="([^"]*)"/);
    const groupTitleMatch = line.match(/group-title="([^"]*)"/);
  
    return {
      title: titleMatch ? titleMatch[1] : '',
      tvgId: tvgIdMatch ? tvgIdMatch[1] : '',
      tvgLogo: tvgLogoMatch ? tvgLogoMatch[1] : '',
      groupTitle: groupTitleMatch ? groupTitleMatch[1] : 'Undefined',
    };
  };
  

  useEffect( () => {
    async function name() {
      await fetch("https://iptv-org.github.io/iptv" +
        // "/categories/undefined.m3u"
        // "/categories/kids.m3u"
        "/languages/hin.m3u"
        ).then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const items = [];

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('#EXTINF')) {
            const attributes = extractAttributes(lines[i]);
            const url = lines[i + 1] ? lines[i + 1].trim() : '';
            items.push({ ...attributes, url });
          }
        }
      setChannels(items);
      setLoad(true)
      })

    }
    name();
  }, []);

  return (
    <div>


      <video width={"100%"} height={"100%"} src={


"https://s3.ap-southeast-1.wasabisys.com/prisri/Sajan.Re.Jhooth.Mat.Bolo.2023.720p.HEVC.HDRip.Bhojpuri.2CH.x265%20%5BSkymoviesHD.bet%5D.mkv?AWSAccessKeyId=S9B9ZC9T9HQO94UEYUNQ&Expires=1722360604&Signature=H0M5NgoNEiyuFaffpAJ3I4LNK%2BI%3D"
      } controls></video>
       {channels.length > 0 ? (
        // <HlsPlayer src={
        //   "https://pub-811ef9427ee24b3caa387ea1e5024cde.r2.dev/_VIDEO%20_Khesari%20Lal%20_Aamrapali%20Dubey%20_%20%E0%A4%AE%E0%A5%81%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A5%80%20-%20Muski%20_%20Bhojpuri%20Song(1080P_HD).mp4"
          
        //   // channels.at(1).url
        // } />
        <></>
      ) : (
        <p>Loading...</p>
      )
    }
      {/* <div>
        {channels.map((channel, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{channel.title}</h2>
            <p><strong>Group:</strong> {channel.groupTitle}</p>
            <p><strong>TVG ID:</strong> {channel.tvgId}</p>
            {channel.tvgLogo && <img src={channel.tvgLogo} alt="Logo" style={{ width: '100px' }} />}
            <p><strong>URL:</strong> <a href={channel.url} target="_blank" rel="noopener noreferrer">{channel.url}</a></p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default App;

