export default interface TableFields {
  name: string,
  originalName: string,
  type: string,
  required: boolean,
  existValues: boolean
  wasChanged: boolean
  deleteValidationLevel: 'none' | 'confirm'
  state: 'register' | 'updating'
}
