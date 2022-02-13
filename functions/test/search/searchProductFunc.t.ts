import 'mocha';
import { searchProduct } from '../../func/search/searchProductsFunc';

describe('search products', () => {
  it('search products by key words sell', async () => {
    const data = {
      input: 'iPhone 13',
      preProductId: '',
      buy: false,
    };
    const out = await searchProduct(data);
    console.log(out);
  });
  it('search products by key words buy', async () => {
    const data = {
      input: 'iPhone 13',
      preProductId: '',
      buy: true,
    };
    const out = await searchProduct(data);
    console.log(out);
  });
  it('search products by key words buy', async () => {
    const data = {
      input: 'iPhone 13',
      preProductId: 'Vhdp5IULwNIKhsNJiP0O',
      buy: true,
    };
    const out = await searchProduct(data);
    console.log(out);
  });
});
