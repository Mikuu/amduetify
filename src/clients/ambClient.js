import { get, post } from '@/utils/httpUtils';
import { HOST, BATH_PATH, PATH_NODES_BULK, PATH_VIEW, PATH_PROJECT, PATH_PROJECTS } from '@/configs/ambConfig';

const buildUrl = resourcePath => {
  return `${HOST}${BATH_PATH}${resourcePath}`;
};

export const retrieveProjects = async (accessToken, idTokenParsed) => {
  const url = buildUrl(PATH_PROJECTS)
  return await get(url, accessToken);
};

export const createProject = async (accessToken, projectName) => {
  const url = buildUrl(PATH_PROJECT);
  const payload = { projectName };
  return await post(accessToken, url, payload);
};

// export const createView = async (pid, initialNodeId, initialNodeTopic) => {};

export const retrieveView = async (accessToken, pid, vid) => {
  const url = buildUrl(PATH_VIEW) + `?pid=${pid}&vid=${vid}`;
  return await get(url, accessToken);
};

export const fetchNodeBulk = async (accessToken, pid, vid) => {
  const url = buildUrl(PATH_NODES_BULK) + `?pid=${pid}&vid=${vid}`;
  return await get(url, accessToken);
};

export const updateNodeBulk = async (accessToken, pid, vid, updateNodes, deleteNodeIds) => {
  const url = buildUrl(PATH_NODES_BULK);
  const payload = { pid, vid, updateNodes, deleteNodeIds }
  console.log(payload);
  return await post(url, accessToken, payload);
};
