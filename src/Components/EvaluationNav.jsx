import { FaAngry, FaSearchengin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext } from "react";
import ProfilePic from "../Img/profile.png";
import { ModalContext } from "../Context/modalContext/ModalContext";
import { ProfileContext } from "../Context/ProfileContext";
import { MontungContext } from "../Context/MontungContext";

const EvaluationNav = () => {
  const { setAboutModal, setwhatThisModal, setprofileAdjust } =
    useContext(ModalContext);
  const { userID } = useContext(ProfileContext);
  const { montuang, montung,sourceID } = useContext(MontungContext);
  return (
    <div className="evaluation-tab-nav">
      <div
        onClick={() => console.log("current source", sourceID)}
        className="logo"
      >
        <FaAngry color="#FDBC2C" size={30} />
        <h3>Pengawasan Pemeriksaan</h3>
      </div>
      <div className="evaluation-tab-search">
        <motion.ul
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
          className="evaluation-nav-list"
        >
          <li className="nav-list" onClick={() => setwhatThisModal(true)}>
            What's this?
          </li>
          <li className="nav-list" onClick={() => setAboutModal(true)}>
            About
          </li>
        </motion.ul>
        <div className="evaluation-nav-search-bar">
          <input
            spellCheck="false"
            type="text"
            id="search-id"
            placeholder="Cari Data Pemeriksaan"
            autoComplete="off"
            required
          />
          <label htmlFor="search-id">
            <FaSearchengin id="search-icon" size={20} />
          </label>
        </div>
        <div
          className="evaluation-nav-profile"
          onClick={() => setprofileAdjust(true)}
        >
          <img src={userID.pics} alt="Profiles" />
          <div className="evaluation-nav-profile-layer" aria-disabled></div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationNav;
