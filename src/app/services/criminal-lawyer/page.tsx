import { makeCategoryPage } from "@/lib/service-category-page";

const { generateMetadata, Page } = makeCategoryPage("criminal");
export { generateMetadata };
export default Page;
