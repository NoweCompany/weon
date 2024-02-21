import sty from "../styles/style-components/dataform.module.css";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataFormProps {
  fields: string[];
}

export default function DataForm({ fields }: DataFormProps) {
  return (
    <>
      <div className={sty.containerMain}>
        <Card className={sty.card}>
          <CardContent>
            <ScrollArea className={sty.scrollArea}>
              <form className="cardForm">
                <div className={sty.formContent}>
                  {fields && fields.map((field, index) => (
                    <div className={sty.inputGroup} key={index}>
                      <div className={sty.fragmentInput}>
                        <Label htmlFor={field}>{field}</Label>
                        <Input id={field} placeholder={field} />
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
