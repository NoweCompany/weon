export default interface Field {
  key: string;
  type: string;
  required: boolean;
  allNames: string[];
  currentName: string;
  originalName: string;
}