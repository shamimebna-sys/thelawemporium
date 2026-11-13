import { makeCategoryPage } from "@/lib/service-category-page";

const { generateMetadata, Page } = makeCategoryPage("civil");
export { generateMetadata };
export default Page;
