import { useNavigate } from "react-router-dom";
import Button from "../Reusable/Button";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const navigate = useNavigate();
  const { price, pizzas, status } = useSelector((state) => state.cart);

  return (
    <AnimatePresence mode="popLayout">
      {status ? (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ opacity: 0.95, y: "0" }}
          exit={{ opacity: 0, y: "100%" }}
          className="flex justify-between items-center bg-stone-800 w-full text-white px-4 py-3"
        >
          <div className="flex gap-2 items-center">
            <h1>{pizzas.length} PIZZAS</h1>
            <h1>€{price}.00</h1>
          </div>
          <Button
            title="OPEN CART →"
            textColor="text-black"
            transition={{ type: "spring" }}
            event={(e) => navigate("/React-Pizza-App/Cart")}
          ></Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
