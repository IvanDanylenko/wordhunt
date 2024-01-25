import { DataProvider } from 'react-admin';
import { stringify } from 'query-string';
import { fetchClient } from '../fetchClient';

export const dataProviderCreator = (): DataProvider => {
  return {
    getList: (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const sortParam = order === 'DESC' ? `-${field}` : field;
      const query = {
        sort: sortParam,
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
        per_page: perPage,
        page,
      };
      const endpoint = `/${resource}?${stringify(query)}`;

      return fetchClient.get(endpoint).then((response) => ({
        data: response.data.data,
        total: response.data.meta.total,
      }));
    },
    getOne: (resource, params) => {
      const endpoint = `/${resource}/${params.id}`;

      return fetchClient.get(endpoint).then((response) => ({
        data: response.data.data,
      }));
    },

    getMany: (resource, params) => {
      const { ids } = params;
      const query = {
        filter: JSON.stringify({ ids }),
      };
      const endpoint = `/${resource}?${stringify(query)}`;

      return fetchClient.get(endpoint).then((response) => ({
        data: response.data.data,
        total: response.data.meta.total,
      }));
    },

    getManyReference: (resource, params) => {
      const { filter, target, pagination, sort, id } = params;
      const { page, perPage } = pagination;
      const { field, order } = sort;
      const sortParam = order === 'DESC' ? `-${field}` : field;

      const query = {
        sort: sortParam,
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify({
          ...filter,
          [target]: id,
        }),
        per_page: perPage,
        page,
      };
      const endpoint = `/${resource}?${stringify(query)}`;

      return fetchClient.get(endpoint).then((response) => ({
        data: response.data.data,
        total: response.data.meta.total,
      }));
    },

    update: (resource, params) => {
      const { id, data } = params;
      const endpoint = `/${resource}/${id}`;
      const resultData = data;

      return fetchClient.put(endpoint, resultData).then((response) => ({
        data: response.data.data,
      }));
    },

    updateMany: (resource, params) => {
      const { ids, data } = params;
      const query = {
        filter: JSON.stringify({ id: ids }),
      };
      const resultData = data;
      const endpoint = `/${resource}?${stringify(query)}`;
      return fetchClient
        .post(endpoint, resultData)
        .then((response) => ({ data: response.data.data }));
    },

    create: (resource, params) => {
      const { data } = params;
      const endpoint = `/${resource}`;
      const resultData = data;
      return fetchClient.post(endpoint, resultData).then((response) => ({
        data: response.data.data,
      }));
    },

    delete: (resource, params) => {
      const { id } = params;
      const endpoint = `/${resource}/${id}`;

      return fetchClient.delete(endpoint);
    },

    deleteMany: (resource, params) => {
      const { ids } = params;
      const query = {
        filter: JSON.stringify({ id: ids }),
      };

      const endpoint = `/${resource}?${stringify(query)}`;
      return fetchClient.delete(endpoint).then((response) => ({ data: response.data.data }));
    },
  };
};
