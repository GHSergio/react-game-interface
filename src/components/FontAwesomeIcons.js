import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescriptionBottleMedical,
  faHeart,
  faBolt,
  faShield,
  faXmark,
  faGavel,
  faBoxOpen,
  faGift,
  faRing,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
// import {} from "@fortawesome/free-brands-svg-icons";

const HeartIcon = () => <FontAwesomeIcon icon={faHeart} />;

const EnergyIcon = () => <FontAwesomeIcon icon={faBolt} />;

const ReplyPotionIcon = () => (
  <FontAwesomeIcon icon={faPrescriptionBottleMedical} />
);

const ShieldIcon = () => <FontAwesomeIcon icon={faShield} />;

const CancelIcon = ({ onClick }) => {
  <button onClick={onClick}>
    <FontAwesomeIcon icon={faXmark} />;
  </button>;
};

const WeaponIcon = () => <FontAwesomeIcon icon={faGavel} />;
const ArmorIcon = () => <FontAwesomeIcon icon={faBoxOpen} />;
const RingIcon = () => <FontAwesomeIcon icon={faRing} />;
const ItemIcon = () => <FontAwesomeIcon icon={faGift} />;
const EquippedIcon = () => <FontAwesomeIcon icon={faBox} />;

export {
  HeartIcon,
  EnergyIcon,
  ReplyPotionIcon,
  ShieldIcon,
  CancelIcon,
  WeaponIcon,
  ArmorIcon,
  RingIcon,
  ItemIcon,
  EquippedIcon,
};
