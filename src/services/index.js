import axios from "axios";

export const DataTableInfo = {
  getDataTable: async () => {
    return axios
      .get(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`).then(({ data }) => {
        return (data.result.auditLog);
      })
     
  },
};
