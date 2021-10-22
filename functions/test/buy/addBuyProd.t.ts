import 'mocha';
import { addProdBuy } from '../../func/productBuy/createProdBuyFunc';

describe('add buy Product', () => {
    it('should succefully add a buy product', async () => {
        const testInfo = {
            uid: 'CmSdt5xeSKfZiAw84ye1PC8zOjf2',
            productName: "iPhone 13 pro max",
            targetPrice: 500,
            description: "I want a new iphone",
            image : [],
            location : "urbana",
        };
        const out = await addProdBuy(testInfo);
        console.log(out);
    });
});
