import { dbReal } from "firebase";
import { ref, set, get, onValue, push, child, update } from "firebase/database";

export const createProduct = async (product) => {
  console.log("product: ", product);

  const newProductKey = push(child(ref(dbReal), "products")).key;
  const updates = {};
  updates["/products/" + newProductKey] = product;

  console.log("newProduct: ", newProductKey);

  update(ref(dbReal), updates)
    .then((res) => {
      console.log(">>> res: ", res);
    })
    .catch((err) => {
      console.log(">>> err: ", err);
    });

  // set(ref(dbReal, "products", product))
  //   .then((res) => {
  //     console.log(">>> created: ", res);
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log(">>> error: ", err);
  //   });
};
