import ButtonContent from '@/interfaces/ButtonContent';
import FloatNavFields from './FloatNavFields';
import { Card } from '../ui/card';

interface FormFields {
  buttonContentNavFields: ButtonContent[]
}

export function FormFields({
  buttonContentNavFields
}: FormFields) {
  return (
    <div className="flex justify-center"> {/* Centraliza o formulário */}
      <form action="">
        <FloatNavFields 
          title="Tabela"
          buttonContent={buttonContentNavFields} 
          input={{
            value: '',
            tittle: 'Nome da tabela'
          }}      
        />

        <Card>
          <table className="table-auto w-full border-collapse border border-gray-300" id="titulotabela">
            <thead className="text-center">
                <tr>
                    <th className="px-4 py-2 font-normal">Nome</th>
                    <th className="px-4 py-2 font-normal">Tipo</th>
                    <th className="px-4 py-2 font-normal">Obrigatório</th>
                    <th className="px-4 py-2 font-normal">Delete</th>
                </tr>
            </thead>
            <tbody className="tbody" id="tbody">
            </tbody>
          </table>
        </Card>
      </form>
    </div>
  )
}
