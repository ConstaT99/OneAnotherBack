import 'mocha';
import { addProdSell } from '../../func/productSell/createSellProductFunc';

describe('add Sell Product', () => {
  it('should succefully add a Sell product', async () => {
    const testInfo = {
      uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
      productName: 'iPhone 13 pro max',
      price: 500,
      description: 'I want a new iphone',
      status: 9,
      image: [],
      location: 'urbana',
      auction: false,
      doneDeal: 0,
    };
    const out = await addProdSell(testInfo);
    console.log(out);
  });
  it('test with auction is true', async () => {
    const testInfo = {
      uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
      productName: 'iPhone 13 pro max',
      price: 500,
      description: 'I want a new iphone',
      status: 9,
      image: [],
      location: 'urbana',
      auction: true,
      doneDeal: 1000,
    };
    const out = await addProdSell(testInfo);
    console.log(out);
  });
});
