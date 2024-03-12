import sty from "../../styles/style-components/iconeNowe.module.css";
import Link from "next/link";
import Image from "next/image";

export default function IconeNowe() {
  return (
    <>
      <Link href="https://nowecompany.com.br" target="_blank" rel="noopener noreferrer">
          <Image className={sty.icon} width={100} height={100} src="/img/blackIco.png" alt="" />
      </Link>
    </>
  );
}
