import type { Sequelize } from "sequelize";
import { user, userAttributes } from "./user";

export {
  user,
};

export type {
  userAttributes
};

export function initModels(sequelize: Sequelize) {
const models = {
  user: user.initModel(sequelize)
}

  return models;
}
