import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = (theme: Theme) =>
createStyles({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});
  
export interface TablePaginationProps extends WithStyles<typeof styles> {
  classes: any,
  count: number,
  onChangePage: (e: any, e2: any) => void,
  page: number,
  rowsPerPage: number,
  theme: Theme,
}

class TablePaginationActions extends React.Component<TablePaginationProps, any> {

  handleFirstPageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

(TablePaginationActions as React.ComponentClass<TablePaginationProps>).propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
} as any;

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;

function createData(name: string, calories: number, fat: number) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const styles = (theme: Theme) =>
createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});


export interface NavigationState {
  rows : Array<any>;
  page: number;
  rowsPerPage: number;
}

export interface PlanetsTableProps extends WithStyles<typeof styles> {}

class PlanetsTable extends React.Component<PlanetsTableProps, NavigationState> {
  state: NavigationState = {
    rows: [
      createData('Cupcake', 305, 3.7),
      createData('Donut', 452, 25.0),
      createData('Eclair', 262, 16.0),
      createData('Frozen yoghurt', 159, 6.0),
      createData('Gingerbread', 356, 16.0),
      createData('Honeycomb', 408, 3.2),
      createData('Ice cream sandwich', 237, 9.0),
      createData('Jelly Bean', 375, 0.0),
      createData('KitKat', 518, 26.0),
      createData('Lollipop', 392, 0.2),
      createData('Marshmallow', 318, 0),
      createData('Nougat', 360, 19.0),
    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event : React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

(PlanetsTable as React.ComponentClass<PlanetsTableProps>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(PlanetsTable);