import { makeCategoryPage } from "@/lib/service-category-page";

const { generateMetadata, Page } = makeCategoryPage("pro-bono");
export { generateMetadata };
export default Page;
