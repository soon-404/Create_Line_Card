import { useEffect, useState } from "react";
import liff from "@line/liff";

function App() {
  const [pictureUrl, setPictureUrl] = useState();
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
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
        saveAs(image, "exported-vis.png");
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
        console.log(profile);
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
    <div className='App'>
      Hello
      <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>
        Logout
      </button>
      <button
        onClick={() => exportAsPicture()}
        style={{ width: "100%", height: 30 }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;
