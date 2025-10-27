import { useParams } from "react-router-dom";
import Electronics from "../components/categories/electronics/Electronics";
import Jewelery from "../components/categories/jewelery/Jewelery";
import Mensclothing from "../components/categories/mensclothing/Mensclothing";
import Womensclothing from "../components/categories/womensclothing/Womensclothing";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  const renderCategory = () => {
    switch (category) {
      case "electronics":
        return <Electronics />;
      case "jewelery":
        return <Jewelery />;
      case "mensclothing":
        return <Mensclothing />;
      case "womensclothing":
        return <Womensclothing />;
      default:
        return <div>Category not found</div>;
    }
  };

  return <>{renderCategory()}</>;
};

export default CategoryPage;
