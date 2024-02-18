import sty from "../styles/style-components/dataform.module.css";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Dataform({ campos }) {
  return (
    <>
      <div className={sty.containerMain}>
        <Card className={sty.card}>
          <CardContent>
          <ScrollArea className={sty.scrollArea}>
            <form className="cardForm">
                <div className={sty.formContent}>
              {campos && campos.map((campo, index) => (
                <div className={sty.inputGroup} key={index}>
                  <div className={sty.fragmentInput}>
                    <Label htmlFor={campo}>{campo}</Label>
                    <Input id={campo} placeholder={campo} />
                  </div>
                </div>
              ))}
              </div>
            </form>
     </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
