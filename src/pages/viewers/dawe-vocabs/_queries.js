export const baseUri = 'http://linked.data.gov.au/def/test/dawe-cv/'
const namedGraph = baseUri

export function getVocabularies() {
  return `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
select 
    ?uri 
    (sample(?_label) as ?label) 
    (sample(?_description) as ?description) 
    (sample(?_created) as ?created)
    (sample(?_modified) as ?modified)
from <http://www.ontotext.com/explicit>
from <${namedGraph}>
where { 
    values (?vocabularyType) {
        (skos:ConceptScheme)
        (skos:Collection)
    }
  ?uri a ?vocabularyType ;
            skos:prefLabel ?_label .
    
    optional { ?uri dcterms:description ?_description }
    optional { ?uri dcterms:created ?_created }
    optional { ?uri dcterms:modified ?_modified }
}
group by ?uri
order by ?label    
`
}

export function getLabel(resourceUri) {
  return `
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
select *
from <http://www.ontotext.com/explicit>
from <${namedGraph}>
where {
    <${resourceUri}> skos:prefLabel ?label .
}
limit 1
`
}

export function getResource(resourceUri) {
  return `
select *
from <http://www.ontotext.com/explicit>
from <${namedGraph}>
where {
    <${resourceUri}> ?p ?o .
    filter(!isBlank(?p))
    filter(!isBlank(?o))
}
order by ?p
`
}

export function resourceExists(resourceUri) {
  return `
ask {
  graph <${namedGraph}> {
      <${resourceUri}>  ?p ?o .       
  }
}
`
}