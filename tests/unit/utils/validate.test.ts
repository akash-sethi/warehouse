import { validate } from '../../../src/utils/validate';
import { articleValidation } from '../../../src/validations/article.validation';
import productValidation from '../../../src/validations/product.validation';

describe('schema validate', () => {
  it('should validate inventory data', () => {
    // raw file data from inventory.json
    const data = {
      inventory: [
        {
          art_id: '1',
          name: 'leg',
          stock: '6',
        },
        {
          art_id: '2',
          name: 'screw',
          stock: '8',
        },
      ],
    };

    const { value: result } = validate({ value: data }, articleValidation.upload);
    expect(result.length).toBe(2);
    expect(result.pop()).toEqual({ art_id: '2', name: 'screw', stock: 8 });
    expect(result.pop()).toEqual({ art_id: '1', name: 'leg', stock: 6 });
  });

  it('should invalidate inventory data', () => {
    // raw file data from inventory.json
    const data = {
      inventory: [
        {
          wrong_art_id_key: '1',
          name: 'leg',
          stock: '6',
        },
        {
          art_id: '2',
          name: 'screw',
          stock: '8',
        },
      ],
    };

    expect(() => {
      validate({ value: data }, articleValidation.upload);
    }).toThrow();
  });

  it('should validate product data', () => {
    // raw file data from product.json
    const data = {
      products: [
        {
          name: 'Dining Chair',
          contain_articles: [
            {
              art_id: '1',
              amount_of: '4',
            },
            {
              art_id: '2',
              amount_of: '8',
            },
            {
              art_id: '3',
              amount_of: '1',
            },
          ],
        },
      ],
    };

    const { value: result } = validate({ value: data }, productValidation.upload);
    expect(result.length).toBe(1);
    const product = result.pop();
    expect(product.name).toEqual('Dining Chair');
    expect(product.contain_articles.length).toBe(3);
    expect(product.contain_articles.pop()).toEqual({
      art_id: '3',
      amount_of: '1',
    });
  });
});
