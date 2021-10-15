import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import liff from "@line/liff";
import logo from "./logo.svg";

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

  useEffect(() => {
    initLine();
  }, []);

  const logout = () => {
    liff.logout();
    window.location.reload();
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

    html2canvas(data, {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
      scale: 3,
    })
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

  return (
    <div className='w-screen h-screen flex flex-col items-center bg-mainbg bg-local bg-cover bg-center bg-no-repeat overflow-auto'>
      <p className='m-10 text-5xl font-bold font-header'>Line Profile Card</p>
      <div
        className='bg-white w-96 h-box flex flex-col items-center'
        id='exportContainer'
      >
        <p className='text-5xl m-10 font-body font-extrabold'>{displayName}</p>
        <div className='bg-blue-400 w-40 h-40'></div>
        {/* <img src={logo} className='w-28 h-28'></img> */}
        <p className='text-4xl m-10 font-body'>{statusMessage}</p>
        {/* <img src={pictureUrl} className='w-16 h-20'></img> */}
      </div>
      <button
        onClick={() => exportAsPicture()}
        className='w-96 h-16 m-6 bg-green-500 rounded-full font-header text-3xl flex justify-center items-center text-white'
      >
        Save
      </button>
      <button
        onClick={() => logout()}
        className='w-96 h-16 rounded-full font-header text-3xl flex justify-center items-center bg-red-400 text-white'
      >
        Logout
      </button>
    </div>
  );
}

export default App;
