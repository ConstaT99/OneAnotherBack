import { readMultipleRandomSell } from "../../func/productSell/readMultipleRandomSellFunc";


describe('greadMultipleRandomPostsFunc test', () => {
    it('expect the return postArray to equal to the postArray in the db', async () => {
        const check = await readMultipleRandomSell({ preSellId: '' });
        console.log(check);
    });
    it('expect the return postArray to equal to the postArray in the db2', async () => {
        const check2 = await readMultipleRandomSell({ preSellId: 'kyDeHHRYfjM940EXYXT6' });
        console.log(check2);
    });
});
