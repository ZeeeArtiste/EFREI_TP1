import { User } from "./user";
import { UserService } from "./user.service";
import * as fs from "fs";

export class UserJSONService implements UserService {
  add(username: string): User {
    // Charger les données actuelles
    const data = fs.readFileSync(__dirname + "/users.json", "utf8");
    const users: User[] = JSON.parse(data);

    // Vérifier si l'utilisateur existe déjà
    if (users.some((user) => user.username === username)) {
      throw new Error("Utilisateur déjà existant");
    }

    // Ajouter le nouvel utilisateur avec le nouvel ID en focntion du dernier
    const newUser: User = { id: users[users.length - 1].id + 1, username };
    users.push(newUser);

    // Enregistrer les nouvelles données
    fs.writeFileSync(
      __dirname + "/users.json",
      JSON.stringify(users, null, 2),
      "utf8"
    );
    console.log("Utilisateur ajouté avec succès");

    return newUser;
  }

  getById(id: number): User | null {
    // Charger les données existantes à partir du fichier JSON
    const data = fs.readFileSync("users.json", "utf8");
    const users: User[] = JSON.parse(data);

    // Trouver l'utilisateur par son ID
    const user = users.find((user) => user.id === id);

    if (user) {
      return user;
    } else {
      throw new Error("Utilisateur introuvable");
    }
  }
}
