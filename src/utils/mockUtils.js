const generateNestedObject = (level) => {
  if (level === 0) {
    return {
      id: generateUniqueId(),
      topic: generateRandomTopic()
    };
  }

  return {
    id: generateUniqueId(),
    topic: generateRandomTopic(),
    children: Array.from({ length: 3 }, () => generateNestedObject(level - 1))
  };
};

const countObjects = (obj) => {
  let count = 1;

  if (obj.children) {
    obj.children.forEach(child => {
      count += countObjects(child);
    });
  }

  return count;
};

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 10);
};

const generateRandomTopic = () => {
  const topics = ['topic-a', 'topic-b', 'topic-c'];
  return topics[Math.floor(Math.random() * topics.length)];
};

export const generateMockMindData = level => {
  const theme = {
    name: "Latte",
    palette: [
      "#dd7878",
      "#ea76cb",
      "#8839ef",
      "#e64553",
      "#fe640b",
      "#df8e1d",
      "#40a02b",
      "#209fb5",
      "#1e66f5",
      "#7287fd"
    ],
    cssVar: {
      "--main-color": "#444446",
      "--main-bgcolor": "#ffffff",
      "--color": "#777777",
      "--bgcolor": "#f6f6f6"
    }
  };

  const mockData = generateNestedObject(level);
  console.log('FBI: Mind data item counts: ' + countObjects(mockData));

  return {
    direction: 1,
    linkData: {},
    nodeData: mockData,
    theme: theme
  }
}
