export default interface TableFields {
  name: string,
  type: string,
  required: boolean,
  deleteValidationLevel: 'none' | 'confirm'
  state: 'register' | 'updating'
  wasChanged: boolean
}
