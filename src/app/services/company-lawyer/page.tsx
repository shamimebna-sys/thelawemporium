import { makeCategoryPage } from "@/lib/service-category-page";

const { generateMetadata, Page } = makeCategoryPage("company");
export { generateMetadata };
export default Page;
