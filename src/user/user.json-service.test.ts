import * as fs from "fs";
import { UserJSONService } from "./user.json-service";

// Mock du module 'fs'
jest.mock("fs");

describe("UserJSONService", () => {
  let userService: UserJSONService;

  beforeEach(() => {
    userService = new UserJSONService();
  });

  test("should add a user successfully", () => {
    // Ici, on simule le comportement de fs.readFileSync
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([{ id: 1, username: "john" }])
    );

    const newUser = userService.add("doe");

    // Vérification que fs.writeFileSync a été appelé comme prévu
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.any(String),
      JSON.stringify(
        [
          { id: 1, username: "john" },
          { id: 2, username: "doe" },
        ],
        null,
        2
      ),
      "utf8"
    );

    expect(newUser).toEqual({ id: 2, username: "doe" });
  });

  test("should throw an error if the user already exists", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([{ id: 1, username: "john" }])
    );

    expect(() => userService.add("john")).toThrow("Utilisateur déjà existant");
  });

  test("should get a user by ID", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([{ id: 1, username: "john" }])
    );

    const user = userService.getById(1);

    expect(user).toEqual({ id: 1, username: "john" });
  });

  test("should throw an error if the user is not found", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify([{ id: 1, username: "john" }])
    );

    expect(() => userService.getById(999)).toThrow("Utilisateur introuvable");
  });
});
