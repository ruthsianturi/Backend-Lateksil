import { DataTypes } from "sequelize";
import db from "../config/database.js";
import OrderPengujian from "./orderPengujian.js";
import Pengujian from "./pengujian.js";
import Status from "./status.js";
import Users from "./user.js";

const Order = db.define("order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total_price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(Order);
Order.belongsTo(Users);

Order.hasOne(Status, { as: "status", foreignKey: "id" });
Status.belongsTo(Order, { as: "orders", foreignKey: "id" });

Pengujian.belongsToMany(Order, { through: OrderPengujian });
Order.belongsToMany(Pengujian, { through: OrderPengujian });

export default Order;

(async () => {
  await Order.sync({ alter: true }).then(() => {
    console.log("Order Database  & tables created!");
  });
})();
