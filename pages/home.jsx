import NavBar from "../components/Navbar"
import sty from "../styles/Style-Pages/home.module.css"
import IconeNowe from "../components/IconeNowe";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import { Newspaper } from 'lucide-react';
export default function home(){

    return(
        <>
        <NavBar />
        <div className={sty.containerCenter}>
            <img className={sty.img} src="./img/black.png" alt="" />
            <h1 className={sty.imgDescription}> Bem-vindo a weon</h1>
        </div>

        <Sheet>
  <SheetTrigger> <p className={sty.link}> <Newspaper /> Updates </p> </SheetTrigger>
  <SheetContent side={"bottom"}>
    <SheetHeader>
      <SheetTitle>ACOMPANHAR</SheetTitle>
      <SheetDescription>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ad, natus officiis pariatur non tempore vel sunt quasi adipisci eveniet dolore dolorum! Sit provident incidunt asperiores similique dignissimos, porro reprehenderit.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

<IconeNowe />
        </>
    )
}