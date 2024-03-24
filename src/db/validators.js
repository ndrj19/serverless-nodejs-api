const { z, number } = require("zod");
const { getMaxHouseId } = require("./crud");

const validateCharacter = async (postData) => {
  const maxHouseId = await getMaxHouseId();
  const character = z.object({
    name: z
      .string()
      .min(4, { message: "Must be 4 or more characters long" })
      .max(128, { message: "Must be 128 or fewer characters long" }),
    house: z
      .number()
      .int()
      .positive()
      .lte(maxHouseId, { message: "House does not exist" })
      .nullable(),
    title: z
      .string()
      .max(512, { message: "Must be 512 or fewer characters long" }),
    status: z
      .string()
      .min(4, { message: "Must be 4 or more characters long" })
      .max(64, { message: "Must be 64 or fewer characters long" }),
  });

  let hasError;
  let validData = {};
  let message;
  try {
    validData = character.parse(postData);
    hasError = false;
  } catch (err) {
    hasError = true;
    message = err.message;
  }

  return {
    data: validData,
    hasError: hasError,
    message: message,
  };
};

const validateCharacterUpdate = async (putData) => {
  const maxHouseId = await getMaxHouseId();
  const character = z.object({
    id: number(),
    name: z
      .string()
      .min(3, { message: "Must be 4 or more characters long" })
      .max(128, { message: "Must be 128 or fewer characters long" })
      .optional(),
    house: z
      .number()
      .int()
      .positive()
      .lte(maxHouseId, { message: "House does not exist" })
      .optional(),

    title: z
      .string()
      .max(512, { message: "Must be 512 or fewer characters long" })
      .optional(),
    status: z
      .string()
      .min(4, { message: "Must be 4 or more characters long" })
      .max(64, { message: "Must be 64 or fewer characters long" })
      .optional(),
  });

  let hasError;
  let validData = {};
  let message;
  try {
    validData = character.parse(putData);
    hasError = false;
  } catch (err) {
    hasError = true;
    message = err.message;
  }

  return {
    data: validData,
    hasError: hasError,
    message: message,
  };
};

const validateHouse = async (postData) => {
  const house = z.object({
    name: z
      .string()
      .min(4, { message: "Must be 4 or more characters long" })
      .max(128, { message: "Must be 128 or fewer characters long" }),
  });

  let hasError;
  let validData = {};
  let message;
  try {
    validData = house.parse(postData);
    hasError = false;
  } catch (err) {
    hasError = true;
    message = err.message;
  }

  return {
    data: validData,
    hasError: hasError,
    message: message,
  };
};

module.exports = {
  validateCharacter,
  validateCharacterUpdate,
  validateHouse,
};
