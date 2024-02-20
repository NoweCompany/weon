import userData from '@/interfaces/UserData';

export default class Auth{
  getToken(): string | null {
    if (document && document.cookie) {
      const tokenFormatted = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
  
      if (tokenFormatted) {
        return tokenFormatted.split("=")[1];
      }
    }
    return null;
  }

  setToken(token: string): void{
    const maxAge = 60 * 60 * 24 * 7
    document.cookie = `token=${token};max-age=${maxAge}; path=/`;
    
  }
  
  getUserData(): userData | null{
    const userData = window.localStorage.getItem('weonDataUser')
    if(!userData) return null
    return JSON.parse(userData)
  }

  setUserData(userData: userData): void{
    const jsonDataUser = JSON.stringify(userData)
    window.localStorage.setItem('weonDataUser', jsonDataUser)
  }
}