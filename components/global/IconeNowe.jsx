import sty from "../../styles/style-components/iconeNowe.module.css";
import Link from "next/link";

export default function IconeNowe() {
  return (
    <>
      <Link href="https://nowecompany.com.br" target="_blank" rel="noopener noreferrer">
          <img className={sty.icon} src="/img/blackIco.png" alt="" />
      </Link>
    </>
  );
}
