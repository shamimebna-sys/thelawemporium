import { makeCategoryPage } from "@/lib/service-category-page";

const { generateMetadata, Page } = makeCategoryPage("constitutional");
export { generateMetadata };
export default Page;
