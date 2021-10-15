import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import liff from "@line/liff";

function App() {
  const [pictureUrl, setPictureUrl] = useState();
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("Test");
  const [statusMessage, setStatusMessage] = useState("Hello ?");
  const [userId, setUserId] = useState("");

  const initLine = () => {
    liff.init(
      { liffId: "1656526665-Pn8ng4dB" },
      () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      },
      (err) => console.error(err)
    );
  };

  const exportAsPicture = () => {
    var html = document.getElementsByTagName("HTML")[0];
    var body = document.getElementsByTagName("BODY")[0];
    var htmlWidth = html.clientWidth;
    var bodyWidth = body.clientWidth;

    var data = document.getElementById("exportContainer");
    var newWidth = data.scrollWidth - data.clientWidth;

    if (newWidth > data.clientWidth) {
      htmlWidth += newWidth;
      bodyWidth += newWidth;
    }

    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";

    html2canvas(data)
      .then((canvas) => {
        var image = canvas.toDataURL("image/png", 1.0);
        return image;
      })
      .then((image) => {
        saveAs(image, "myLineCard.png");
        html.style.width = null;
        body.style.width = null;
      });
  };

  const saveAs = (blob, fileName) => {
    var elem = window.document.createElement("a");
    elem.href = blob;
    elem.download = fileName;
    elem.style = "display:none;";
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === "function") {
      elem.click();
    } else {
      elem.target = "_blank";
      elem.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    }
    URL.revokeObjectURL(elem.href);
    elem.remove();
  };

  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff
      .getProfile()
      .then((profile) => {
        setDisplayName(profile.displayName);
        setPictureUrl(profile.pictureUrl);
        setStatusMessage(profile.statusMessage);
        //setUserId(profile.userId);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    initLine();
  }, []);

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      {/* <p className='m-10 text-4xl font-bold'>Line Profile Card</p>
      <div
        className='bg-red-400 w-3/12 h-96 flex flex-col items-center'
        id='exportContainer'
      >
        <p className='text-4xl m-4'>{displayName}</p>
        <img src={pictureUrl} className='w-36 h-36'></img>
        <p className='text-2xl m-4'>{statusMessage}</p>
        <img src={pictureUrl} className='w-16 h-20'></img>
      </div>
      <button
        onClick={() => exportAsPicture()}
        className='w-96 h-16 m-10 bg-green-400'
      >
        Save
      </button> */}
      <button onClick={() => logout()} className='w-96 h-16 m-10 bg-green-400'>
        Logout
      </button>
    </div>
  );
}

export default App;
