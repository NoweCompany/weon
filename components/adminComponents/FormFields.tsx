import ButtonContent from '@/interfaces/ButtonContent';
import FloatNavFields from './FloatNavFields';

interface FormFields {
  setShowFormFields: React.Dispatch<React.SetStateAction<boolean>>
}

export function FormFields({
  setShowFormFields
}: FormFields) {

  function onButtonClickBack(){
    setShowFormFields(false)
  } 

  const buttonContentNavFields: ButtonContent[] = [
    {
        name: 'voltar',
        functionOnClick: onButtonClickBack,
        variant: 'secondary'
    }
  ]

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