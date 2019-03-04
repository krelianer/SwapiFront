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
import { SwapiWrapper } from '../../models/swapi-wrapper';
import { loadPlanetsPage } from '../../api/planets-api';
import { CircularProgress, TableHead } from '@material-ui/core';
import { Planets } from '../../models/planet';
import PlanetDetails from './planet-details';

const actionsStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing.unit * 2.5,
    },
    progress: {
      margin: theme.spacing.unit * 2,
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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#b9b9b9",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });


export interface NavigationState {
  page: number;
  rowsPerPage: number;
  emptyRows: number;
  loading: boolean;
  planetsPages: Array<Array<Planets>>;
  dialogOpen: boolean;
  selectedPlanet: Planets;
}

export interface PlanetsTableProps extends WithStyles<typeof styles> {
  planetsWrapper: SwapiWrapper,
  searchTerm: string,
}

class PlanetsTable extends React.Component<PlanetsTableProps, NavigationState> {
  state: NavigationState = {
    page: 0,
    rowsPerPage: 10,
    emptyRows: 0,
    loading: false,
    planetsPages: [],
    dialogOpen: false,
    selectedPlanet: new Planets(),
  };

  handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    if (!this.state.planetsPages[page]) {
      this.setState({ loading: true });
      loadPlanetsPage(this.props.searchTerm, page + 1).then((response: any) => {
        var wrapper: SwapiWrapper = response.data;
        this.props.planetsWrapper.results = wrapper.results;
        this.props.planetsWrapper.next = wrapper.next;
        this.props.planetsWrapper.previous = wrapper.previous;
        var planetsPage = this.state.planetsPages;
        planetsPage[page] = wrapper.results;
        this.setState({ planetsPages: planetsPage })
        this.setState({ loading: false });
        this.setState({ page });
      });
    }
    else {
      this.setState({ page });
    }
  }

  componentDidUpdate(prevProps: PlanetsTableProps, prevState: NavigationState) {
    if (this.props.searchTerm != prevProps.searchTerm) {
      this.resetState();
    }
  }

  componentDidMount() {
    this.resetState();
  }

  resetState() {
    this.setState({
      page: 0,
      planetsPages: [this.props.planetsWrapper.results],
    })
  }

  handlePlanetsSelected = (event: any, key: Planets) => {
    this.setState({
      dialogOpen: true,
      selectedPlanet: key,
    })
  }

  handlePlanetsDialogClose = () => {
    this.setState({
      dialogOpen: false,
    })
  }

  handleChangeRowsPerPage = (event: any) => {
    this.setState({ page: 0, rowsPerPage: +event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { emptyRows, rowsPerPage, page } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Name</CustomTableCell>
                <CustomTableCell align="center">Population</CustomTableCell>
                <CustomTableCell align="center">Diameter</CustomTableCell>
                <CustomTableCell align="center">Gravity</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!this.state.loading && this.state.planetsPages[this.state.page]) && this.state.planetsPages[this.state.page].map(planet => (
                <TableRow key={planet.url} onClick={event => this.handlePlanetsSelected(event, planet)}>
                  <TableCell component="th" scope="row">
                    {planet.name}
                  </TableCell>
                  <TableCell align="center">{planet.population}</TableCell>
                  <TableCell align="center">{planet.diameter}</TableCell>
                  <TableCell align="center">{planet.gravity}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {this.state.loading && (<CircularProgress className={classes.progress} />)
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={this.props.planetsWrapper.count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <PlanetDetails planet={this.state.selectedPlanet} open={this.state.dialogOpen} onClose={this.handlePlanetsDialogClose}></PlanetDetails>
      </Paper>
    );
  }
}

(PlanetsTable as React.ComponentClass<PlanetsTableProps>).propTypes = {
  classes: PropTypes.object.isRequired,
  planetsWrapper: PropTypes.array,

} as any;

export default withStyles(styles)(PlanetsTable);