# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

* page size selector in `ld-data-table`

## [1.4.0] - 2019-04-20

### Added

* CSS rules for query result tables.
* `ld-predicate`: Support for `wide` attribute.
* Query results sample view.
* Ontology sample view.

### Changed

* Updated demo files.

## [1.3.0] - 2019-04-20

### Fixed

* Subject does not always get detected.

### Added

* NPM script shortcut for running the app in dev and build mode.
* Removal of URI duplicates after retrieving query results.
* `ld-taxonomy` component (auto-invoked by `ld-predicate` when endpoint is set and predicate is from SKOS)
* `ld-collapsible` listens for content changes to sync its height faster.
* Taxonomy examples in resource sample page.

### Changed

* Query cache is now a singleton and works across all components. 
* Improved README.
* Update demo files.

## [1.2.0] - 2019-04-17

### Added

* Components
  * `ld-collapsible`
  * `ld-predicate`
     * Added support for `endpoint` property for dynamically loading objects
     * Added support for `inbound` property for dynamically loading inverse objects (i.e. subjects)

### Changed

* The demo has been updated.
* Predicate labels use the lighter green background color again.

## [1.1.0] - 2019-04-11

### Added

* Export options styling
* Horizontal lines styling (`hr` tag)
* Allow gutter-disabling in flex components (via `no-gutter`)
* Components
  * `ld-map`
  * `ld-subject`
  * `ld-predicate`
  * `ld-object`
* Sample resource
* Resource demo
* Polyfill for `closest(selector)`

### Changed

* Polyfill inclusion in `init.html` partial.
* Link font weight (now stronger).

## [1.0.0] - 2019-04-04

### Added

* Dev server
* Demo and samples
* Components
  * `department-header`
  * `flex-container`
  * `flex-item`
  * `ld-accordion`
  * `ld-card`
  * `ld-card-content`
  * `ld-card-title`
  * `ld-data-table`
  * `ld-lookup-form`
  * `ld-search-form`
  * `ld-sparql-form`
  * `ld-view`
* Readme