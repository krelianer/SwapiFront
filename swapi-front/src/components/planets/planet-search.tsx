import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { InputBase, CircularProgress } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { searchPlanets } from '../../api/planets-api';
import { SwapiWrapper } from '../../models/swapi-wrapper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#EAECEE",
      '&:hover': {
        backgroundColor: "#EAECEE",
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });

export interface PlanetSearchProps extends WithStyles<typeof styles> {
  onPlanetsChange: ((wrapper: SwapiWrapper, term: string) => void);
}

export interface PlanetSearchState {
  searchTerm: string;
  loading: boolean;
}

class PlanetSearch extends React.Component<PlanetSearchProps, PlanetSearchState> {
  constructor(props: PlanetSearchProps) {
    super(props);

    this.state = {
      searchTerm: '',
      loading: false,
    }

    this.keyPress = this.keyPress.bind(this);
  }
  
  handlePlanetSearch() {
    this.setState({loading: true});
    searchPlanets(this.state.searchTerm).then((response: any) => {
      var wrapper: SwapiWrapper = response.data;
      this.props.onPlanetsChange(wrapper, this.state.searchTerm);
    }).finally(() => this.setState({loading: false}));
  }

  handleChange = (e: any) => {
    this.setState({ searchTerm: e.target.value } as PlanetSearchState);
 }

  keyPress(e: any){
    if(e.keyCode == 13){
      this.handlePlanetSearch()
    }
 }

  render() {
        const { classes } = this.props;

    return (
        <div className="PlanetSearch">
          <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={this.handleChange}
                onKeyDown={this.keyPress}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            { this.state.loading && (<CircularProgress className={classes.progress} />)}
      </div>  
      )
    }
}


export default withStyles(styles)(PlanetSearch);
