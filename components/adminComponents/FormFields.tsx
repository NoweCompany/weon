import ButtonContent from '@/interfaces/ButtonContent';
import FloatNavFields from './FloatNavFields';

interface FormFields {
  buttonContentNavFields: ButtonContent[]
}

export function FormFields({
  buttonContentNavFields
}: FormFields) {


  return (
    <form action="">
      <FloatNavFields 
        title="Tabela"
        buttonContent={buttonContentNavFields} 
        input={{
          value: '',
          tittle: 'Nome da tabela'
        }}      
      />

    </form>
  )
}