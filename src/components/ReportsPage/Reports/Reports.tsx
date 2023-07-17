import { Box, Typography } from "@mui/material";

import { BsTrash } from "react-icons/bs";
export const Reports = () => {
  return (
    <Box className="report-body">
      <div className="report-body-top">
        <Typography variant="h4" component="h4">
          Все отчёты
        </Typography>
        <Box className="tabs-panel">
          <Box>
            <Typography component="p">Идентификатор</Typography>
          </Box>
          <Box>
            <Typography component="p">Тип идентификатора</Typography>
          </Box>
          <Box>
            <Typography component="p">Дата</Typography>
          </Box>
          <Box>
            <Typography component="p">Статус</Typography>
          </Box>
          <Box></Box>
        </Box>
      </div>
      <Box className="table">
        <Box className="table-item">
          <Typography component="p">4F2YU08102KM26251</Typography>
          <Typography component="p">VIN</Typography>
          <Typography component="p">26.05.2019 10:00:00</Typography>
          <Box>Error</Box>
          <Box>
            <BsTrash />
          </Box>
        </Box>

        <Box className="table-item">
          <Typography component="p">4F2YU08102KM26251</Typography>
          <Typography component="p">VIN</Typography>
          <Typography component="p">26.05.2019 10:00:00</Typography>
          <Box>Error</Box>
          <Box>
            <BsTrash />
          </Box>
        </Box>
        <Box className="table-item">
          <Typography component="p">4F2YU08102KM26251</Typography>
          <Typography component="p">VIN</Typography>
          <Typography component="p">26.05.2019 10:00:00</Typography>
          <Box>Error</Box>
          <Box>
            <BsTrash />
          </Box>
        </Box>
        <Box className="table-item">
          <Typography component="p">4F2YU08102KM26251</Typography>
          <Typography component="p">VIN</Typography>
          <Typography component="p">26.05.2019 10:00:00</Typography>
          <Box>Error</Box>
          <Box>
            <BsTrash />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
