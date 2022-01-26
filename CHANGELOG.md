# Change Log

## v2.0.0
* BREAKING CHANGE - When subscribing to a store via the `useContext` hook, the returning store object is now a single object which represents the store. Previously this was an array, but the array was arbitrary.
* chore/bug - Reworked store providers to correctly target rerenders only to subscribing children components. Previously there was a nuance where updates could occur even without a context subscription.

## v1.3.0
* feature - support multiple dynamic stores and forwarding props into the store custom hooks
* chore - fix persisted falsy value causing default value to come back

## v1.2.1

* Updates to use proxy by default for stores
* Updates peer dependency
* Fix dependabot alerts

## v1.2.0

* BREAKING CHANGE - Modified the return format for `setupStore` to be a single object instead of an array of parts
* `usePersistedState` - the set state function now supports the functional state update syntax

## v1.1.1

* Minor dependency updates

## v1.1.0

* Removed deprecated class based container logic

## v1.0.2

* Added generated type declarations

## v1.0.1

* Cleaning up some unused files
* Adding better error messages for `usePersistedState` and `StoreProvider`
* README updates and tweaks

## v1.0.0

* Initial release as a separate repo
