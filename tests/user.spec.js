import { getFirstName, isValidPassword } from "../src/utils/user.js";

test("Should return first name when given full name", () => {
  const firstName = getFirstName("Jon Palacio");
  expect(firstName).toBe("Jon");
  //if (firstName !== "Jon") {
  //throw new Error("Expected the string Jon");
  //}
});

test("Should return first name when given first name", () => {
  const firstName = getFirstName("Liz");
  expect(firstName).toBe("Liz");
});

test("Should reject password shorter than 8 charachters", () => {
  const isValid = isValidPassword("four");
  expect(isValid).toBe(false);
});

test("Should reject password that contains the word password", () => {
  const notPassword = isValidPassword("abcPassword098");
  expect(notPassword).toBe(false);
});

test("Should validate a correct password", () => {
  const isValid = isValidPassword("testing12");
  expect(isValid).toBe(true);
});
