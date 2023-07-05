import { nodesToMindData, flattenNodeData } from './dataUtils';
import expect from "expect";

/** node doesn't have 'childrenIds' and 'parentId' **/
const testMindData = {
  "id": "8d24014000582af7",
  "root": true,
  "tags": [],
  "memo": "",
  "style": "",
  "topic": "demo",
  "icons": [],
  "direction": 0,
  "hyperLink": "",
  "children": [
    {
      "id": "914a7853881db52f",
      "root": false,
      "tags": [],
      "memo": "",
      "style": "",
      "topic": "scenarioa-a",
      "icons": [],
      "direction": 0,
      "hyperLink": "",
      "children": []
    },
    {
      "id": "914a7c2f1f3940c3",
      "root": false,
      "tags": [],
      "memo": "",
      "style": "",
      "topic": "scenario-b",
      "icons": [],
      "direction": 0,
      "hyperLink": "",
      "children": [
        {
          "id": "914b3323eec4c6b2",
          "root": false,
          "tags": [],
          "memo": "",
          "style": "",
          "topic": "testcase-b1",
          "icons": [],
          "direction": 0,
          "hyperLink": "",
          "children": []
        },
        {
          "id": "914b3425f5733485",
          "root": false,
          "tags": [],
          "memo": "",
          "style": "",
          "topic": "testcase-b2",
          "icons": [],
          "direction": 0,
          "hyperLink": "",
          "children": []
        }
      ]
    },
    {
      "id": "914a7cc5a5b41be5",
      "root": false,
      "tags": [],
      "memo": "",
      "style": "",
      "topic": "scenario-c",
      "icons": [],
      "direction": 0,
      "hyperLink": "",
      "children": []
    }
  ]
};

/** node doesn't have 'children' **/
const testNodes = [
  {
    "id": "914a7853881db52f",
    "root": false,
    "tags": [],
    "memo": "",
    "style": "",
    "topic": "scenario-a",
    "icons": [],
    "parentId": "8d24014000582af7",
    "direction": 0,
    "hyperLink": "",
    "childrenIds": []
  },
  {
    "id": "914a7c2f1f3940c3",
    "root": false,
    "tags": [],
    "memo": "",
    "style": "",
    "topic": "scenario-b",
    "icons": [],
    "parentId": "8d24014000582af7",
    "direction": 0,
    "hyperLink": "",
    "childrenIds": [
      "914b3323eec4c6b2",
      "914b3425f5733485"
    ]
  },
  {
    "id": "914a7cc5a5b41be5",
    "root": false,
    "tags": [],
    "memo": "",
    "style": "",
    "topic": "scenario-c",
    "icons": [],
    "parentId": "8d24014000582af7",
    "direction": 0,
    "hyperLink": "",
    "childrenIds": []
  },
  {
    "id": "914b3323eec4c6b2",
    "root": false,
    "tags": [],
    "memo": "",
    "style": "",
    "topic": "testcase-b1",
    "icons": [],
    "parentId": "914a7c2f1f3940c3",
    "direction": 0,
    "hyperLink": "",
    "childrenIds": []
  },
  {
    "id": "8d24014000582af7",
    "root": true,
    "tags": [],
    "memo": "",
    "style": "",
    "topic": "demo",
    "icons": [],
    "parentId": null,
    "direction": 0,
    "hyperLink": "",
    "childrenIds": [
      "914a7853881db52f",
      "914a7c2f1f3940c3",
      "914a7cc5a5b41be5"
    ]
  },
  {
    "id": "914b3425f5733485",
    "root": false,
    "tags": [],
    "memo": "",
    "style": "",
    "topic": "testcase-b2",
    "icons": [],
    "parentId": "914a7c2f1f3940c3",
    "direction": 0,
    "hyperLink": "",
    "childrenIds": []
  }
];

const ids = {
  root: "8d24014000582af7",
  scenarioA: "914a7853881db52f",
  scenarioB: "914a7c2f1f3940c3",
  scenarioC: "914a7cc5a5b41be5",
  testcaseB1: "914b3323eec4c6b2",
  testcaseB2: "914b3425f5733485"
}

describe('data utils', () => {
  it('should flatten the object and convert children to IDs within all list', () => {
    const nodes = flattenNodeData(testMindData, Object.values(ids));
    expect(nodes.length).toEqual(Object.keys(ids).length);

    const root = nodes.find(node => node.id === ids.root);
    const rootChildrenIds = [ids.scenarioA, ids.scenarioB, ids.scenarioC];
    expect(root.parentId).toEqual(null);
    expect(root.childrenIds.length).toEqual(rootChildrenIds.length);
    expect(root.childrenIds.every(childId => rootChildrenIds.includes(childId))).toBeTruthy();

    const scenarioA = nodes.find(node => node.id === ids.scenarioA);
    expect(scenarioA.parentId).toEqual(root.id);
    expect(scenarioA.childrenIds.length).toEqual(0);

    const scenarioB = nodes.find(node => node.id === ids.scenarioB);
    const scenarioBChildrenIds = [ids.testcaseB1, ids.testcaseB2];
    expect(scenarioB.parentId).toEqual(root.id);
    expect(scenarioB.childrenIds.length).toEqual(scenarioBChildrenIds.length);
    expect(scenarioB.childrenIds.every(childId => scenarioBChildrenIds.includes(childId))).toBeTruthy();

    const testCaseB1 = nodes.find(node => node.id === ids.testcaseB1);
    expect(testCaseB1.parentId).toEqual(ids.scenarioB);
    expect(testCaseB1.childrenIds.length).toEqual(0);

    const testCaseB2 = nodes.find(node => node.id === ids.testcaseB2);
    expect(testCaseB2.parentId).toEqual(ids.scenarioB);
    expect(testCaseB2.childrenIds.length).toEqual(0);

    const scenarioC = nodes.find(node => node.id === ids.scenarioC);
    expect(scenarioC.parentId).toEqual(root.id);
    expect(scenarioC.childrenIds.length).toEqual(0);
  });

  it('should flatten the object and convert children to IDs from partial list', () => {
    const operationIds = [ids.scenarioC, ids.testcaseB2];
    const updatedIds = [ids.root, ids.scenarioB, ids.testcaseB2, ids.scenarioC];

    const nodes = flattenNodeData(testMindData, operationIds);
    expect(nodes.length).toEqual(updatedIds.length);

    const root = nodes.find(node => node.id === ids.root);
    const rootChildrenIds = [ids.scenarioA, ids.scenarioB, ids.scenarioC];
    expect(root.parentId).toEqual(null);
    expect(root.childrenIds.length).toEqual(rootChildrenIds.length);
    expect(root.childrenIds.every(childId => rootChildrenIds.includes(childId))).toBeTruthy();

    const scenarioB = nodes.find(node => node.id === ids.scenarioB);
    const scenarioBChildrenIds = [ids.testcaseB1, ids.testcaseB2];
    expect(scenarioB.parentId).toEqual(root.id);
    expect(scenarioB.childrenIds.length).toEqual(scenarioBChildrenIds.length);
    expect(scenarioB.childrenIds.every(childId => scenarioBChildrenIds.includes(childId))).toBeTruthy();

    const testCaseB2 = nodes.find(node => node.id === ids.testcaseB2);
    expect(testCaseB2.parentId).toEqual(ids.scenarioB);
    expect(testCaseB2.childrenIds.length).toEqual(0);

    const scenarioC = nodes.find(node => node.id === ids.scenarioC);
    expect(scenarioC.parentId).toEqual(ids.root);
    expect(scenarioC.childrenIds.length).toEqual(0);

  });

  it('should convert node list to mind data object', () => {
    const mindDataObject = nodesToMindData(testNodes);

    expect(mindDataObject.id).toBe("8d24014000582af7");
    expect(mindDataObject.topic).toBe("demo");
    expect(mindDataObject.root).toBeTruthy();

    expect(mindDataObject.children.find(child => child.id === ids.scenarioA)).toBeTruthy();
    expect(mindDataObject.children.find(child => child.id === ids.scenarioB)).toBeTruthy();
    expect(mindDataObject.children.find(child => child.id === ids.scenarioC)).toBeTruthy();

    const scenarioB = mindDataObject.children.find(child => child.id === ids.scenarioB);
    expect(scenarioB.children.find(child => child.id === ids.testcaseB1)).toBeTruthy();
    expect(scenarioB.children.find(child => child.id === ids.testcaseB2)).toBeTruthy();

    const scenarioA = mindDataObject.children.find(child => child.id === ids.scenarioA);
    expect(scenarioA.children.length).toEqual(0);

    const scenarioC = mindDataObject.children.find(child => child.id === ids.scenarioC);
    expect(scenarioC.children.length).toEqual(0);
  });

})

