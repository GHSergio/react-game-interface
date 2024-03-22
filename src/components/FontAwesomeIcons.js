import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescriptionBottleMedical,
  faHeart,
  faBolt,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
// import {} from "@fortawesome/free-brands-svg-icons";

const HeartIcon = () => <FontAwesomeIcon icon={faHeart} />;

const EnergyIcon = () => <FontAwesomeIcon icon={faBolt} />;

const ReplyPotionIcon = () => (
  <FontAwesomeIcon icon={faPrescriptionBottleMedical} />
);

const ShieldIcon = () => <FontAwesomeIcon icon={faShield} />;

export { HeartIcon, EnergyIcon, ReplyPotionIcon, ShieldIcon };
