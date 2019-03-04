import React from "react";
import PlanetSearch from './planet-search';
import PlanetsTable from './planets-table';
import { SwapiWrapper } from "../../models/swapi-wrapper";
import "./planets-container.css"

interface PlanetsContainerState {
    planetsWrapper: SwapiWrapper;
    searchTerm: string;
}

/*
// Container component for the planets module
// It contains both a search engine as well as a display table for star wars planets
*/
export default class PlanetsContainer extends React.Component<any, PlanetsContainerState> {
    state: PlanetsContainerState = {
        planetsWrapper: {
            count: 0,
            next: "",
            previous: "",
            results: [],
        },
        searchTerm: "",
    };

    // Sets the state of the container with the data given by the planet search component
    handlePlanetsChange = (data: SwapiWrapper, term: string) => {
        this.setState({
            planetsWrapper: data,
            searchTerm: term,
        });
    }

    public render() {
        return (
            <div className="PlanetsContainer">
                <PlanetSearch onPlanetsChange={this.handlePlanetsChange}></PlanetSearch>
                {(this.state.planetsWrapper.results.length > 0) && (<PlanetsTable planetsWrapper={this.state.planetsWrapper} searchTerm={this.state.searchTerm} ></PlanetsTable>)}
            </div>
        );
    }
}