import { User } from "./user";
import { UserService } from "./user.service";

export class UserController {
  constructor(private userService: UserService) {}

  add(username: string): User {
    const trimmedUsername = username.trim();

    // Vérifier si le nom d'utilisateur est vide
    if (trimmedUsername === "") {
      throw new Error("Le nom d'utilisateur ne peut pas être vide.");
    }

    // Vérifier la longueur minimale du nom d'utilisateur
    if (trimmedUsername.length < 5) {
      throw new Error(
        "Le nom d'utilisateur doit comporter au moins 5 caractères.",
      );
    }

    // Vérifier la longueur maximale du nom d'utilisateur
    if (trimmedUsername.length > 15) {
      throw new Error(
        "Le nom d'utilisateur ne peut pas dépasser 15 caractères.",
      );
    }

    // Vérifier si le nom d'utilisateur contient des caractères non autorisés
    const regex = /^[a-zA-Z0-9_]*$/;
    if (!regex.test(trimmedUsername)) {
      throw new Error(
        "Le nom d'utilisateur contient des caractères non autorisés.",
      );
    }

    return this.userService.add(trimmedUsername);
  }

  getById(id: number): User | null {
    // Vérifier si l'ID est un nombre décimal
    if (id % 1 !== 0) {
      throw new Error("L'ID doit être un nombre entier.");
    }

    // Vérifier si l'ID est un nombre négatif
    if (id < 0) {
      throw new Error("L'ID ne peut pas être un nombre négatif.");
    }

    return this.userService.getById(id);
  }
}
