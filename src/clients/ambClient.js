import { post } from '@/utils/httpUtils';
import { HOST, BATH_PATH, PATH_CREATE_NODES } from '@/configs/ambConfig';

const getUrl = resourcePath => {
  return `${HOST}${BATH_PATH}${resourcePath}`;
};

// export const createProject = async projectName => {};

// export const createView = async (pid, initialNodeId, initialNodeTopic) => {};

export const updateNodeBulk = async (pid, vid, updateNodes, deleteNodeIds) => {
  const url = getUrl(PATH_CREATE_NODES);
  const payload = { pid, vid, updateNodes, deleteNodeIds }

  return await post(url, payload);
};
