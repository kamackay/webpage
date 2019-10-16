import Address from "../Address";
import KeithProps from "../KeithProps";
import KeithState from "../KeithState";

export class AboutData {
  name: string;
  image: string;
  bio: string;
  address: Address;
  phone: string;
  email: string;
  resumeDownload: string;
  additional: { message: string; photo: string };
}

export class AboutProps extends KeithProps {
  data: AboutData;
}

export class AboutState extends KeithState {
  name: string;
  profilePic: string;
  bio: string;
  address: Address;
  phone: string;
  email: string;
  resumeDownload: string;
}
