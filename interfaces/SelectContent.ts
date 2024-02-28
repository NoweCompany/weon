export interface SelectOptions {
  name: string;
  id?: string;
  className?: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  functionOnClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void; 
}

export interface SelectContentProtocol {
  placeholder: string,
  selecteOptions: SelectOptions[]
}