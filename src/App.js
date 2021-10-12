import { useEffect, useState } from 'react';
import liff from '@line/liff';

function App() {
  const [pictureUrl, setPictureUrl] = useState();
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

   const initLine = () => {
    liff.init({ liffId: '1656526665-Pn8ng4dB' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      //setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  }, []);

  const logout = () => {
    liff.logout();
    window.location.reload();
  }
  return (
    <div className="App">
      Hello
      <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
    </div>
  );
}

export default App;
