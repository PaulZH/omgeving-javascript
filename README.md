Omgeving Linked Data UI
=========================

UI components for Departement Omgeving's Linked Data websites.

## Development

* run `yarn install` (or `npm install`) to install/update dependencies
* run `npm run app` to activate the development (express) server
* run `npm run ui-dev` to activate the webpack bundler/watcher

## Release creation

* run `npm run ui-prod` to build a production-optimized distribution in `/dist`

## Static demo app

* There is an Apache-compatible demo application in `/demo` (the contents need to be installed in a root directory to work).

## Setup and installation on the target server

* Copy the `/dist` directory to `/dist` on the target webserver.
* There is a footer snippet at `/src/partials/footer.html` which can be used in your layout template.
* Adjust the favicon link to point at `/dist/img/favicon.ico`.
* Optional: You can use a `#header` div for arbitrary markup (or some SEO links). It will be auto-replaced with a more optimized header (including links to the department website).  
* There is an initialization snippet at `src/partials/init.html` which should be included in your layout template as very last section in the `body` tag.
* Wrap the markup in `#content` with an `ld-view` tag:

        <div id="content">
            <ld-view>
                ...
            </ld-view>
        </div>
 
 Inside `<ld-view>`, any of the available components (see below) can now be used. JavaScript and CSS dependencies will be lazy-loaded on demand.

## Limitations

* At the moment, the components should not be mixed with the [jQuery-based Linked Data widgets](https://gitlab.com/bnowack/lnedata-ui). 
* The base URL of the the target site should be `/` (for running the code in a sub-directory, another build configuration would be needed).

## Components

See `src/views/department.hbs` and `src/views/zendantennes-home.hbs` for usage examples.

### < ld-view >

* Injects a breadcrumbs navigation and a department header.

### < flex-container >

* Creates a flex container for horizontally positioned sub-items.
* Add `stretch` class to make all children expand to the same height. (Use this only in nested containers, not on a top-level `flex-container`, or it may expand to the page height).

### < flex-item >

* To be used as direct child nodes within a `flex-container`.
* Supports `dsk` (desktop) `tab` (tablet), and `mob` (mobile) attributes for specifying respective item widths.
  * Supported values are `25`, `33`, `50`, `66`, `75`, and `100`.
  * For example: `<flex-item dsk="25" tab="50", mob="100">...</flex-item>`
  will have a width of 25% on desktops, 50% on tablets, and 100% on mobile screens.
  * If a value is not specified, then it is inherited from the higher context (e.g. `mob` inherits from `tab`), with `dsk` defaulting to 100%.

### < ld-card >

* Renders a basic card.
* Supports a `dark` class for a card with a dark background (and white text).

### < ld-card-title >

* Renders a card title
* Supports an optional `img` attribute for injecting a background image into the title node. 
* Supports a `dark` class for a card with a dark background (and white text).

### < ld-card-content >

* Adds a padding around its direct child nodes.

### < ld-accordion >

* Turns its direct child nodes into collapsible sections.
* The child nodes should have two sibling nodes: One node with a `pane-toggle` class, and one with a `pane` class.
  * The former will be used to toggle the latter.
  
### < ld-lookup-form >

* Renders a linked data lookup form.
* Requires a `samples` attribute with a pointer to a samples text file (see `src/samples/imjv-lookup.txt` for the format).
* Example: 

        <ld-lookup-form samples="/samples/imjv-lookup.txt">
            Opzoeken op basis van identifier
        </ld-lookup-form>

### < ld-sparql-form >

* Renders a linked data SPARQL form.
* Requires a `samples` attribute with a pointer to a samples text file (see `src/samples/imjv-sparql.txt` for the format).
* Requires an `endpoint` attribute with a pointer to the SPARQL API.
* Example: 

        <ld-sparql-form endpoint="https://id.milieuinfo.be/imjv/sparql" samples="/samples/imjv-sparql.txt">
            Opzoeken met een SPARQL zoekopdracht
        </ld-sparql-form>

### < ld-search-form >

* Renders a keyword search form.
* Requires a `samples` attribute with a pointer to a samples text file (see `src/samples/imjv-search.txt` for the format).
* Requires an `endpoint` attribute with a pointer to the SPARQL API.
* Example: 

        <ld-search-form endpoint="https://id.milieuinfo.be/imjv/keywordsearch" samples="/samples/imjv-search.txt">
            Opzoeken met een sleutelwoord
        </ld-search-form>

### < ld-data-table >

* Renders a data table with row count info, sorting, and pagination.
* Requires a `query` attribute with a pointer to a query template (see `src/queries/list-by-type.txt` for the format).
* Requires a `count-query` attribute with a pointer to a COUNT-query template (see `src/queries/list-by-type-count.txt` for the format).
* Requires a `search-fields` attribute for specifying which variables in the query templates should be used for filtering.
* Requires a `resource` attribute with a URI that will replace any placeholders in the query templates.
* Example for a data table that lists resources with a type of `antenne:Straling`:

        <ld-data-table
            endpoint="http://fuseki-zendantennes-on-1.vm.cumuli.be:3030/zendantennes/sparql"
            query="/queries/list-by-type.txt"
            count-query="/queries/list-by-type-count.txt"
            search-fields="?uri ?label"
            resource="https://data.zendantennes.omgeving.vlaanderen.be/ns/zendantenne#Straling"
        ></ld-data-table>
