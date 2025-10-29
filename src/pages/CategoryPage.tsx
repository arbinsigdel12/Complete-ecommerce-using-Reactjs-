import { useParams } from "react-router-dom";
import CategoryProducts from "../components/categories/CatagoryProducts";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  return <CategoryProducts category={category} />;
};

export default CategoryPage;
