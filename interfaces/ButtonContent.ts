export default interface Button {
  name: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  functionOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Corrigindo a tipagem da função
}

