import Table from '@/components/Table';

import { Checkbox } from "@/components/ui/checkbox"

const fieldsInf = {
  collectionName: "Usuários",
  fields: [
      {
          key: "Nome",
          type: "string",
          required: true,
          allNames: [
              "Nome"
          ],
          currentName: "Nome",
          originalName: "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1"
      },
      {
          key: "Cargo",
          type: "string",
          required: true,
          allNames: [
              "Cargo"
          ],
          currentName: "Cargo",
          originalName: "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b"
      },
      {
          key: "E-mail",
          type: "string",
          required: true,
          allNames: [
              "E-mail"
          ],
          currentName: "E-mail",
          originalName: "E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a"
      },
      {
          key: "Data de Cadastro",
          type: "date",
          required: true,
          allNames: [
              "Data de Cadastro"
          ],
          currentName: "Data de Cadastro",
          originalName: "Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89"
      }
  ]
};
const dados = [
    {
        "_id": '1',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Fulano',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Gerente',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'fulano@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2024-02-21'
    },
    {
        "_id": '2',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Ciclano',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Analista',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'ciclano@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2024-02-20'
    },
    {
        "_id": '3',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Beltrano',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Estagiário',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'beltrano@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2024-02-19'
    },
    {
        "_id": '4',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'João',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Desenvolvedor',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'joao@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2023-12-15'
    },
    {
        "_id": '5',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Maria',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Designer',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'maria@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2023-11-28'
    },
    {
        "_id": '6',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Fulano',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Gerente',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'fulano@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2024-02-21'
    },
    {
        "_id": '7',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Ciclano',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Analista',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'ciclano@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2024-02-20'
    },
    {
        "_id": '8',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Beltrano',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Estagiário',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'beltrano@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2024-02-19'
    },
    {
        "_id": '9',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'João',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Desenvolvedor',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'joao@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2023-12-15'
    },
    {
        "_id": '10',
        "Nome_22a8bed3-6507-4a3b-878f-d57ab60c64c1": 'Maria',
        "Cargo_fc2995f2-68a2-440c-b9c1-ab726ec7626b": 'Designer',
        'E-mail_b70f5998-f68d-40d1-acc9-5d325a40c45a': 'maria@example.com',
        'Data de Cadastro_4d5e6a5b-bda6-4629-bab6-65e6a095ed89': '2023-11-28'
    }
];




export default function Test() {
    const { fields, collectionName } = fieldsInf
    return (
        <>
            <Table 
                collectionName={collectionName}
                tableColumns={fields}
                tableRows={dados}>
            </Table>
        </>
    );
}
