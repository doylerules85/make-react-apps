import React from 'react';
import './App.css';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Stats, Pagination, RefinementList } from 'react-instantsearch-dom';


// ===== OPTION 1: if you want to create your own algolia account and fill it with data =====
// demo data: https://www.algolia.com/doc/guides/building-search-ui/resources/demos/react/#media
// sample datasets on github: https://github.com/algolia/datasets

// ===== OPTION 2: if you want to get started quickly =====
// app id: HLZQG5S07C
// api key: 684f55fca36fb1591f37aed9187b284a
// index name: dev_APP

const searchClient = algoliasearch('HLZQG5S07C', '684f55fca36fb1591f37aed9187b284a');

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_APP">
      <div className="app">
        <div className="search-container">
            <Stats/>
            <SearchBox />
              <Hits hitComponent={Product}/>
              <RefinementList attribute="brand"/>
            <Pagination/>
        </div>
      </div>
    </InstantSearch>
  );
}

function Product({hit}){
    return (
      <a className="product" href={hit.url}>
        <img src={hit.image} alt={hit.name}/>
        <div>
          <h3>{hit.brand}</h3>
          <h2>{hit.name}</h2>
          <p>${hit.price}</p>
        </div>
      </a>
    )
}
