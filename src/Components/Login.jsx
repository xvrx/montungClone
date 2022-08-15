import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import {
  FaFileDownload,
  FaAngleDown,
  FaExclamationCircle,
} from "react-icons/fa";
import LoaderLogin from "./Loader/LoaderLogin";
import axios from "axios";
axios.defaults.withCredentials = true;

function Login() {
  // const server0 = "http://localhost:2000/";
  // const server0 = "http://10.13.1.63:2000/";
  const server0 = "http://192.168.1.2:2000/";

  const navigate = useNavigate();
  const [loginLoader, setloginLoader] = useState(false);
  const [news, setNews] = useState([]);
  const [startFrom, setStartFrom] = useState(0);
  const [newsLimit, setnewsLimit] = useState(0);

  useEffect(() => {
    setloginLoader(true);
    axios
      .get(server0 + "api/user/verify", { withCredentials: true })
      .then((res) => {
        console.log(res);
        setloginLoader(false);
        res?.data?.stat && navigate("/main");
        // boolean:
        // console.log(res?.data?.stat)
      })
      .catch((err) => {
        setloginLoader(false);
        console.log("status :", err?.response?.status);
        console.log("catch :", err?.response);
        // err boolean
        // console.log(err.response.data.stat)
        axios
          .get(
            server0 + "bruh0",
            { params: { startingPoint: 0 } },
            { withCredentials: false }
          )
          .then((news) => {
            console.log(news?.data);
            setNews(news?.data?.result);
            // start from index 0 (assuming 6 files are succesfully fetched)
            setStartFrom(6);
            // set max population / hide 'load more' button if max is reached
            setnewsLimit(news?.data?.newsPopulation);
          })
          .catch((err) => {
            console.log(err.response);
            console.log("ini server", server0 + "/bruh0");
          });
      });
    return () => {
      setloginLoader(false);
    };
  }, []);

  // async function initiateLogin() {
  //   try {
  //     const result = await axios.get("http://localhost:2000/api/user/verify", {
  //       withCredentials: true,
  //     });
  //     const stat = result?.data?.stat;
  //     console.log(stat);
  //     return stat;
  //   } catch (error) {
  //     const final = error?.response?.data?.stat || false;
  //     console.log(final);
  //     return final;
  //   }
  // }

  //! Get data
  function bruh() {
    axios
      .get(server0 + "user", { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function loadMore() {
    // console.log(startFrom)
    loader(true);
    axios
      .get(
        server0 + "bruh",
        { params: { startingPoint: startFrom } },
        { withCredentials: false }
      )
      .then((newNews) => {
        console.log(newNews?.data);
        const updated = parseInt(newNews?.data?.result?.length);
        setNews(news.concat(newNews?.data?.result));
        setStartFrom(startFrom + updated);
        loader(false);
      })
      .catch((err) => {
        console.log(err);
        loader(false);
      });
  }

  //! Logged Out
  // function getsm() {
  //   console.log("njeng");
  //   axios
  //     .post(url + "user/destroy", { withCredentials: true })
  //     .then((res) => {
  //       console.log(res);
  //       setstatusLogin(res?.message);
  //     })
  //     .catch((err) => {
  //       console.log(err?.response || "logged out failed");
  //     });
  // }

  const [timeOutId, setTimeOutId] = useState(0);

  function downloadDoc(fileName) {
    loader(true);
    axios
      .get(server0 + `news/${fileName}`, {
        method: "GET",
        withCredentials: true,
        responseType: "blob",
      })
      .then((res) => {
        const someLink = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = someLink;
        link.setAttribute("download", `${fileName}.pdf`); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        loader(false);
      })
      .catch(async (err) => {
        const data = err?.response?.data;
        let responseObj = await data?.text();
        // console.log(JSON.parse(responseObj).message)
        setErrormsg("file is not available in the server!");
        clearTimeout(timeOutId);
        seterrordisplay(true);
        let timer = setTimeout(() => {
          seterrordisplay(false);
        }, 5000);
        setTimeOutId(timer);
        loader(false);
      });

    //   axios({
    //     url: 'http://api.dev/file-download', //your url
    //     method: 'GET',
    //     responseType: 'blob', // important
    // }).then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', 'file.pdf'); //or any other extension
    //     document.body.appendChild(link);
    //     link.click();
    // });
  }

  const [user, setuser] = useState({
    user: "",
    key: "",
  });

  const [errormsg, setErrormsg] = useState("gw bingung juga bro!");
  const [errordisplay, seterrordisplay] = useState(false);

  function loader(status) {
    if (status === true) {
      setloginLoader(true);
    } else if (status === false) {
      setTimeout(() => {
        setloginLoader(false);
      }, 1000);
    }
  }

  const [statusLogin, setstatusLogin] = useState(false);

  function gas() {
    if (user.user === "" || user.key === "") {
      setErrormsg("username/password belum diinput!");
      clearTimeout(timeOutId);
      seterrordisplay(true);
      let timer = setTimeout(() => {
        seterrordisplay(false);
      }, 5000);
      setTimeOutId(timer);
    } else if (user.user.length > 0 || user.key.length > 0) {
      loader(true);
      axios
        .post(server0 + "api/user", user, { withCredentials: true })
        .then((resp) => {
          console.log("login whatever", resp);
          // if (resp.data.status) return navigate('/main')
          if (resp?.data?.status === true) {
            if (!loginLoader) {
              navigate("/main");
            }
          }
        })
        .catch((err) => {
          setErrormsg(
            err.response?.data?.desc || "something is wrong in the server"
          );
          clearTimeout(timeOutId);
          seterrordisplay(true);
          let timer = setTimeout(() => {
            seterrordisplay(false);
          }, 5000);
          setTimeOutId(timer);
          loader(false);
        });
    }
  }

  // function getUser () {
  //   axios.get(url + 'user', )
  // }

  // document.addEventListener("keypress", (e) => {
  //   if ( !keyPressed && (e.key === 'Enter' || e.key === 'NumpadEnter')) {
  //     // gas()
  //     setkeyPressed(true)
  //     // console.log('anjinglah mati aq')
  //     console.log(keyPressed)
  //   }
  // }, {once:true});

  // document.addEventListener("keyup", (e) => {
  //   if ((e.key === 'Enter' || e.key === 'NumpadEnter')) {
  //     setkeyPressed(false)
  //     console.log(keyPressed)
  //   }
  // });

  return (
    <div className="login-outer-container">
      {loginLoader ? <LoaderLogin /> : null}
      <div className="login-overlay-container">
        <div className="login-inner-container">
          <div className="login-docs-container">
            <div className="login-docs-header">
              <FaExclamationCircle onClick={bruh} size={15} /> &nbsp;Recent
              Update
            </div>
            <div className="login-docs-inner-wrapper">
              <div className="login-news-container">
                {news?.map((doc, index) => {
                  return (
                    <div key={index} className="login-news">
                      <h2 onClick={() => downloadDoc(doc?.fileName)}>
                        <FaFileDownload /> {doc?.title}
                      </h2>
                      <p>{doc?.hal}</p>
                      <span className="login-docs-tags-container">
                        tags: &nbsp;{" "}
                        {doc?.tags?.map((tagName, index) => {
                          if (index === doc?.tags?.length - 1)
                            return `#${tagName}. `;
                          return `#${tagName}, `;
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
              {newsLimit !== news.length ? (
                <div onClick={loadMore} className="login-load-more">
                  <FaAngleDown size={40} /> load more . . .
                </div>
              ) : null}
            </div>
            <div className="login-docs-bottom-overlay"></div>
          </div>
          <div className="login-form-container">
            <div className="login-form-logo">
              <svg
                // onClick={() => console.log(news, newsLimit)}
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                color="#FDBC2C"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "#323232" }}
              >
                <path
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM136 240c0-9.3 4.1-17.5 10.5-23.4l-31-9.3c-8.5-2.5-13.3-11.5-10.7-19.9 2.5-8.5 11.4-13.2 19.9-10.7l80 24c8.5 2.5 13.3 11.5 10.7 19.9-2.1 6.9-8.4 11.4-15.3 11.4-.5 0-1.1-.2-1.7-.2.7 2.7 1.7 5.3 1.7 8.2 0 17.7-14.3 32-32 32S136 257.7 136 240zm168 154.2c-27.8-33.4-84.2-33.4-112.1 0-13.5 16.3-38.2-4.2-24.6-20.5 20-24 49.4-37.8 80.6-37.8s60.6 13.8 80.6 37.8c13.8 16.5-11.1 36.6-24.5 20.5zm76.6-186.9-31 9.3c6.3 5.8 10.5 14.1 10.5 23.4 0 17.7-14.3 32-32 32s-32-14.3-32-32c0-2.9.9-5.6 1.7-8.2-.6.1-1.1.2-1.7.2-6.9 0-13.2-4.5-15.3-11.4-2.5-8.5 2.3-17.4 10.7-19.9l80-24c8.4-2.5 17.4 2.3 19.9 10.7 2.5 8.5-2.3 17.4-10.8 19.9z"
                  stroke="none"
                />
              </svg>
            </div>
            <div className="login-input-container">
              <div className="login-input-username-container">
                <div className="modal-username-input-container">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !loginLoader) {
                        gas();
                      }
                    }}
                    value={user.user}
                    onChange={(e) => setuser({ ...user, user: e.target.value })}
                    maxLength={15}
                    autoComplete="off"
                    spellCheck="false"
                    className="modal-username-input"
                    type="text"
                    id="modal-username-input"
                    required
                  />
                  <label
                    id="modal-username-input-label"
                    className="username-modal-text"
                    htmlFor="modal-username-input"
                  >
                    NIP (9 Digit)
                  </label>
                  <label
                    id="modal-username-input-garis"
                    className="username-modal-line"
                    htmlFor="modal-username-input"
                  ></label>
                </div>
                <div className="modal-key-input-container">
                  <input
                    autoComplete="off"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !loginLoader) {
                        gas();
                      }
                    }}
                    value={user.key}
                    onChange={(e) => setuser({ ...user, key: e.target.value })}
                    maxLength={15}
                    spellCheck="false"
                    className="modal-key-input"
                    type="password"
                    id="modal-key-input"
                    required
                  />
                  <label
                    id="modal-key-input-label"
                    className="key-modal-text"
                    htmlFor="modal-key-input"
                  >
                    Password
                  </label>
                  <label
                    id="modal-key-input-garis"
                    className="key-modal-line"
                    htmlFor="modal-key-input"
                  ></label>
                </div>
              </div>
              <div className="login-button-submit-container">
                <button id="login-submit" onClick={gas}>
                  <BiLogInCircle size={25} />
                  submit
                </button>
              </div>
            </div>
            <div
              className={
                errordisplay ? "login-error-flyer active" : "login-error-flyer"
              }
            >
              <p>{errormsg}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
