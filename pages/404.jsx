import Image from "next/image";
import notfound from "public/images/404.jpeg";

export default function NotFound() {
  return <Image src={notfound} />
}