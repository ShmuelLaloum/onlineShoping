import { faker } from "@faker-js/faker";
import type { FetchProductsResponse } from "../types";

const ITEMS_PER_PAGE = 15;

export const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }): Promise<FetchProductsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const items = Array.from({ length: ITEMS_PER_PAGE }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 1, max: 100 })), 
    image: faker.image.url({ width: 640, height: 480 }), 
   
  }));

  const nextPage = pageParam < 5 ? pageParam + 1 : undefined;

  return { items, nextPage };
};
