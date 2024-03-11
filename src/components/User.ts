// User.ts
class User {
    id: string;
    username: string;
    firstName: string;
    favoriteGame: string;
    email: string;
  
    constructor(id: string, username: string, firstName: string, favoriteGame: string, email: string) {
      this.id = id;
      this.username = username;
      this.firstName = firstName;
      this.favoriteGame = favoriteGame;
      this.email = email;
    }
  }
  
  export default User;
  