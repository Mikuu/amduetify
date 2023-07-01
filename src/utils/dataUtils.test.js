import { flattenNodeData } from './dataUtils';

const testNodeData = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        {
          id: 3
        },
        {
          id: 4,
          children: [
            {
              id: 8
            }
          ]
        }
      ]
    },
    {
      id: 5
    },
    {
      id: 6,
      children: [
        {
          id: 7
        }
      ]
    }
  ]
};

describe('flattenObject', () => {
  it('should flatten the object and convert children to IDs within all list', () => {
    const result = flattenNodeData(testNodeData, [1,2,3,4,5,6,7,8]);
    expect(result[0].id).toEqual(1);
    expect(result[0].parentId).toEqual(null);
    expect(result[0].childrenIds).toEqual([2,5,6]);

    expect(result[1].id).toEqual(2);
    expect(result[1].parentId).toEqual(1);
    expect(result[1].childrenIds).toEqual([3,4]);

    expect(result[2].id).toEqual(3);
    expect(result[2].parentId).toEqual(2);
    expect(result[2].childrenIds).toEqual([]);

    expect(result[3].id).toEqual(4);
    expect(result[3].parentId).toEqual(2);
    expect(result[3].childrenIds).toEqual([8]);

    expect(result[4].id).toEqual(8);
    expect(result[4].parentId).toEqual(4);
    expect(result[4].childrenIds).toEqual([]);

    expect(result[5].id).toEqual(5);
    expect(result[5].parentId).toEqual(1);
    expect(result[5].childrenIds).toEqual([]);

    expect(result[6].id).toEqual(6);
    expect(result[6].parentId).toEqual(1);
    expect(result[6].childrenIds).toEqual([7]);

    expect(result[7].id).toEqual(7);
    expect(result[7].parentId).toEqual(6);
    expect(result[7].childrenIds).toEqual([]);

  });

  it('should flatten the object and convert children to IDs from partial list', () => {
    const result = flattenNodeData(testNodeData, [1,3,4,7]);
    expect(result[0].id).toEqual(1);
    expect(result[0].parentId).toEqual(null);
    expect(result[0].childrenIds).toEqual([2,5,6]);

    expect(result[1].id).toEqual(2);
    expect(result[1].parentId).toEqual(1);
    expect(result[1].childrenIds).toEqual([3,4]);

    expect(result[2].id).toEqual(3);
    expect(result[2].parentId).toEqual(2);
    expect(result[2].childrenIds).toEqual([]);

    expect(result[3].id).toEqual(4);
    expect(result[3].parentId).toEqual(2);
    expect(result[3].childrenIds).toEqual([8]);

    expect(result[4].id).toEqual(6);
    expect(result[4].parentId).toEqual(1);
    expect(result[4].childrenIds).toEqual([7]);

    expect(result[5].id).toEqual(7);
    expect(result[5].parentId).toEqual(6);
    expect(result[5].childrenIds).toEqual([]);
  });
});
