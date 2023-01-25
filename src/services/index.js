import axios from "axios";

export const DataTableInfo = {
  getDataTable: async () => {
    return axios
      .get(`https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f`).then(({ data }) => {
        console.log("dara", data.result.auditLog);
        return (data.result.auditLog);
      })
      .catch((error) => {
        return error.message;
      });
  },
};
