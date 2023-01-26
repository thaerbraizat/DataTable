import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataTableInfo } from "../../services";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Circles } from "react-loader-spinner";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const columns = [
  { field: "id", headerName: "Log ID", width: 75 },
  { field: "logId", headerName: "log Id", width: 300 },
  { field: "Applicationtype", headerName: "Application type", width: 300 },
  { field: "actionType", headerName: "action Type", width: 300 },
  { field: "applicationType", headerName: "application Type", width: 300 },
  { field: "Date", headerName: "Date", width: 200 },
];

export default function DataTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [filter, setFilter] = useState({});
  const [reset, setReset] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      let AllData = await DataTableInfo.getDataTable();
      let newData = AllData.map((element, index) => {
        return {
          id: index + 1,
          logId: element.logId,
          Actiontype: element.actionType,
          ApplicationID: element.applicationId,
          applicationType: element.applicationType,
          actionType: element.actionType,
          Date: moment(element.creationTimestamp).format("YYYY/MM/DD"),
        };
      });
      setData(newData);
      setLoading(false);
    }
    fetchData();
  }, [reset]);

  const updateFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleFilter = (data) => {
    let filterdData = data.filter((item) => {
      for (const key in filter) {
        if (item[key] === undefined || item[key] != filter[key]) return false;
      }
      return true;
    });

    setData(filterdData);
  };

  const handleSubmitFilter = () => {
    handleFilter(data, filter);
  };

  const handleSubmitReset = () => {
    setReset(!reset);
    window.location.reload();
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data?.slice(indexOfFirstData, indexOfLastData);

  const handlePagination = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ height: 630, width: "100%" }}>
      {loading ? (
        <Box sx={{ justifyContent: "center", display: "flex" }}>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Box>
      ) : (
        <>
          <Box sx={{ p: 2 }}>
            <TextField
              id="outlined-basic"
              name="logId"
              label="Log ID"
              variant="outlined"
              onChange={updateFilter}
              sx={{ mr: 2 }}
            />
            <FormControl sx={{ width: 222, mr: 2 }}>
              <InputLabel id="demo-simple-select-label">Action type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.Actiontype}
                label="Action type"
                name="Actiontype"
                onChange={updateFilter}
              >
                <MenuItem value="DARI_REFRESH_TOKEN">
                  DARI_REFRESH_TOKEN
                </MenuItem>
                <MenuItem value="INITIATE_APPLICATION">
                  INITIATE_APPLICATION
                </MenuItem>
                <MenuItem value="DARI_APP_LOGIN">DARI_APP_LOGIN</MenuItem>
                <MenuItem value="SUBMIT_APPLICATION">
                  SUBMIT_APPLICATION
                </MenuItem>
                <MenuItem value="ADD_EMPLOYEE">ADD_EMPLOYEE</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: 222, mr: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Application type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.applicationType}
                label="Application type"
                name="applicationType"
                onChange={updateFilter}
              >
                <MenuItem value="CERT_TITLE_DEED_PLOT">
                  CERT_TITLE_DEED_PLOT
                </MenuItem>
                <MenuItem value="ADD_POA">ADD_POA</MenuItem>
                <MenuItem value="LEASE_REGISTRATION">
                  LEASE_REGISTRATION
                </MenuItem>
                <MenuItem value="ADD_COMPANY">ADD_COMPANY</MenuItem>
                <MenuItem value="ADD_COMPANY_EMPLOYEE">
                  ADD_COMPANY_EMPLOYEE
                </MenuItem>
                <MenuItem value="CERT_PROP_OWNERSHIP">
                  CERT_PROP_OWNERSHIP
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              name="ApplicationID"
              label="Application ID"
              variant="outlined"
              onChange={updateFilter}
              sx={{ mr: 2 }}
            />
            <TextField
              id="outlined-basic"
              name="Date"
              label="Date"
              variant="outlined"
              onChange={updateFilter}
              sx={{ mr: 2 }}
            />

            <Button
              variant="contained"
              onClick={handleSubmitFilter}
              sx={{ height: 54, mr: 2 }}
            >
              Search Logger
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitReset}
              sx={{ height: 54, mr: 2 }}
            >
              Reset
            </Button>
          </Box>

          <div style={{ height: 630, width: "100%", position: "relative" }}>
            <DataGrid
              rows={currentData}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
            <div style={{ position: "absolute", bottom: 10, right: 0 }}>
              <Pagination
                count={Math.ceil(data.length / dataPerPage)}
                color="primary"
                onChange={handlePagination}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
