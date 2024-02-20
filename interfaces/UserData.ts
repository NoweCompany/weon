export default interface userData{
    user: {
      id: number,
      email: string,
      idCompany: number,
      nameCompany: string
    },
    companyUser: {
      id: number,
      name: string,
      createdAt: string,
      updatedAt: string,
      company_user_id: number
    },
    permissionData: {
      id: number,
      adm: boolean,
      insert: boolean,
      edit: boolean,
      delet: boolean,
      createdAt: string,
      updatedAt: string,
      user_id: number
    }
  }