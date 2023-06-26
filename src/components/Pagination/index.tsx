import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { PaginationProps } from "../../types";

const useStyles = makeStyles((theme) => ({
  li: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Paginations: React.FC<PaginationProps> = ({
  setting,
  handlePagination,
}) => {
  const classes = useStyles();

  return (
    <Stack spacing={5} className="my-12">
      <Pagination
        count={Math.ceil(setting.totalPage / setting.pagePer)}
        classes={{
          ul: classes.li,
        }}
        defaultPage={2}
        boundaryCount={1}
        size="large"
        variant="outlined"
        shape="rounded"
        color="primary"
        page={setting.currentPage}
        onChange={handlePagination}
      />
    </Stack>
  );
};

export default Paginations;
