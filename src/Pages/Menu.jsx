import { useLoaderData } from "react-router-dom";
import { getMenu } from "../Services/RestaurantApi";
import MenuItem from "../Components/MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <div className="flex dark:bg-stone-900 dark:text-slate-200 flex-col grow self-start w-full overflow-y-auto overflow-x-hidden h-full">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} menu={menu}></MenuItem>
      ))}
    </div>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
