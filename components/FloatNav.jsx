import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sty from "../styles/style-components/floatnav.module.css";

export default function FloatNav({ title }) {
    return (
        <>
            <Card className={sty.card}>
                <CardHeader className={sty.cardHeader}>
                    <CardTitle className={sty.cardTitle}>{title}</CardTitle>
                    <div className={sty.buttonContainer}>
                        <Button>Button</Button>
                        <Button>Button</Button>
                        <Button>Button</Button>
                    </div>
                </CardHeader>
            </Card>
        </>
    );
}
