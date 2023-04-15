import Cart from "../models/cart.js";
import Pengujian from "../models/pengujian.js";
import Users from "../models/user.js";

export const createCartServices = async (
  res,
  user_id,
  pengujian_id,
  quantity
) => {
  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    const pengujian = await Pengujian.findByPk(pengujian_id);

    if (!pengujian) {
      return res.status(404).json({ message: "Pengujian Not Found!" });
    }

    const cart = await Cart.create({
      UserId: user_id,
      PengujianId: pengujian_id,
      quantity,
    });
    return cart;
  } catch (error) {
    return error;
  }
};

export const deleteCartServices = async (res, id) => {
  try {
    const cart = await Cart.findByPk(id);

    if (!cart) {
      res.status(404).json({
        status: 404,
        message: "Data Not Found!",
      });
    }

    const deletedCart = await Cart.destroy({
      where: { id: id },
    });
    return deletedCart === 1;
  } catch (error) {
    return error;
  }
};
