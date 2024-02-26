export default interface Button {
  name: string;
  id?: string;
  className?: string;
  functionOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Corrigindo a tipagem da função
}