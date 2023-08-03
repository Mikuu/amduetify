import { checkAndReturnStyleObject } from "./commonUtils";

export const extractNodeData = (parentId, obj) => {
  return {
    id: obj.id,
    topic: obj.topic,
    memo: obj.memo,
    style: checkAndReturnStyleObject(obj.style),
    tags: obj.tags,
    icons: obj.icons,
    hyperLink: obj.hyperLink,
    root: !!obj.root,
    childrenIds: obj.children ? obj.children.map(child => child.id) : [],
    direction: obj.direction ? 1 : 0,
    parentId: parentId,
  }
};

export const extractViewData = (vid, obj) => {
  return {
    vid: vid,
    direction: obj.direction,
    linkData: obj.linkData,
    theme: {
      cssVar: obj.theme.cssVar,
      name: obj.theme.name,
      palette: obj.theme.palette
    }
  }
};

export const flattenNodeData = (nodeDataObject, updateIds) => {
  const result = [];

  const pushNodeToResult = (parentId, node) => {
    const newNode = extractNodeData(parentId, node);
    if (!alreadyInResult(newNode)) {
      result.push(newNode);
    }
  };

  const alreadyInResult = newNode => {
    return result.some(node => node.id === newNode.id);
  };

  const childrenIncludeUpdatedIds = node => {
    if (node.children && node.children.length > 0) {
      const updateIdSet = new Set(updateIds);
      return node.children.some(child => updateIdSet.has(child.id));

    } else {
      return false;
    }
  }

  function traverse(parentId, node) {

    if (updateIds.includes(node.id) || childrenIncludeUpdatedIds(node)) {
      pushNodeToResult(parentId, node);
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        traverse(node.id, child);
      });
    }
  }

  traverse(null, nodeDataObject);

  return result;
}

export const nodesToMindData = nodes => {
  const buildNestedObjectInList = (nodes, parentId = null) => {
    const nestedObject = {};

    nodes.forEach(node => {
      if (node.parentId === parentId) {
        const children = buildNestedObjectInList(nodes, node.id);
        nestedObject[node.id] = { ...node, children };

        /** parentId and childrenIds are not native mind-elixir, they are added when saved into backend, so delete
         * here before feed back to frontend **/
        delete nestedObject[node.id].parentId;
        delete nestedObject[node.id].childrenIds;
      }
    });

    return Object.values(nestedObject);
  };

  const listOfObjects = buildNestedObjectInList(nodes);
  return listOfObjects.pop();
}
