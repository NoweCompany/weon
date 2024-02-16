    import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tooltip } from '@nextui-org/react';
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import sty from "../../styles/style-components/adminUser.module.css"
export default function adminuser() {
    return (
        <>
            <Card className={sty.card}>
                <CardHeader>
                    <CardTitle className={sty.cardTitle}>Novo usuário</CardTitle>
                    <CardDescription className={sty.cardSubTitle}>Crie um acesso para um novo usuário</CardDescription>
                </CardHeader>
                <CardContent >
                    <form className="cardForm">
                        <h1 className={sty.formSubtitle}>Credenciais de acesso</h1>
                        <div className={sty.inputGroup}>

                            <div className={sty.fragmentInput}>
                                <Label htmlFor="Email">Nome</Label>
                                <Input id="Nome" placeholder="Nome" />
                            </div>

                            <div className={sty.fragmentInput}>
                                <Label htmlFor="Login">Login</Label>
                                <Input id="Login" placeholder="Login" />
                            </div>

                            <div className={sty.fragmentInput}>
                                <Label htmlFor="senha"> Senha</Label>
                                <Input id="senha" placeholder=" Senha" />
                            </div>
                        </div>

                        <h1 className={sty.formSubtitle}>Permissões do usuário</h1>
                        <div className={sty.inputGroupCheckBox}>
                            <Tooltip className="toolTip" placement="left" content=" Tera acesso a todas funções do sistema">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="adm" />
                                    <label htmlFor="adm" > Administrador</label>
                                </div>
                            </Tooltip>

                            <Tooltip className="toolTip" placement="left" content="Criar dados">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label htmlFor="terms" > Inserir</label>
                                </div>
                            </Tooltip>

                            <Tooltip className="toolTip" placement="left" content=" Editar dados ja criados">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label htmlFor="terms" > Editar</label>
                                </div>
                            </Tooltip>

                            <Tooltip className="toolTip" placement="left" content=" Deletar dados do sistema">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" />
                                    <label htmlFor="terms" > Deletar</label>
                                </div>
                            </Tooltip>

                        </div>
                    </form>
                </CardContent>
            </Card>

        </>
    )
}