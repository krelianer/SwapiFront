import { SWAPI_URL } from "../resources/properties";
import axios from 'axios'

const PLANETS_ENDPOINT = SWAPI_URL + "planets/"

export function searchPlanets(term: string): Promise<any> {
  return axios.get(PLANETS_ENDPOINT, {
    params: {
      search: term,
    }
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.log(error)
  });
}

export function loadNextPlanets(url: string): Promise<any> {
  return axios.get(url).then(function (response) {
    return response;
  }).catch(function (error) {
    console.log(error)
  });
}

export function loadPlanetsPage(searchTerm: string, page: number): Promise<any> {
  return axios.get(PLANETS_ENDPOINT, {
    params: {
      search: searchTerm,
      page: page,
    }
  }).then(function (response) {
    return response;
  }).catch(function (error) {
    console.log(error)
  });
}