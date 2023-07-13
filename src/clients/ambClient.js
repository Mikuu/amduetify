import { get, post } from '@/utils/httpUtils';
import { HOST, BATH_PATH, PATH_NODES_BULK, PATH_VIEW } from '@/configs/ambConfig';

const getUrl = resourcePath => {
  return `${HOST}${BATH_PATH}${resourcePath}`;
};

// export const createProject = async projectName => {};

// export const createView = async (pid, initialNodeId, initialNodeTopic) => {};

export const retrieveView = async (access_token, pid, vid) => {
  const url = getUrl(PATH_VIEW) + `?pid=${pid}&vid=${vid}`;
  return await get(url, access_token);
};

export const fetchNodeBulk = async (access_token, pid, vid) => {
  const url = getUrl(PATH_NODES_BULK) + `?pid=${pid}&vid=${vid}`;
  return await get(url, access_token);
};

export const updateNodeBulk = async (access_token, pid, vid, updateNodes, deleteNodeIds) => {
  const url = getUrl(PATH_NODES_BULK);
  const payload = { pid, vid, updateNodes, deleteNodeIds }
  console.log(payload);
  return await post(url, access_token, payload);
};
