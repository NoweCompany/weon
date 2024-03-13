export default interface TableFields {
  name: string,
  originalName: string,
  type: string,
  required: boolean,
  deleteValidationLevel: 'none' | 'confirm'
  state: 'register' | 'updating'
  wasChanged: boolean
}
