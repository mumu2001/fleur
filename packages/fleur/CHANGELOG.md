### 1.1.0

- #31 Add `reducerStore`

### 1.0.0

- #29 Major release
  - Internal refactoring
  - #26 Bind OperationContext instance to this methods.

### 0.0.17

- #21 Improve performance on dispatch action

### 0.0.16

- #19 Store update group batched by requestAnimationFrame

### 0.0.15

- Loose production dependency version
- Enable `sideEffects: false`

### 0.0.14

- #17 Accept multiple arguments in `.executeOperation()`
  `.executeOperation((context, payload) => {})` => `.executeOperation((context, arg1, arg2) => {})`

### 0.0.13

- Trim unnecessory type argument
  - `executeOperation<Actions>()` => `executeOperation()`
  - `operation<ActionIdentifier?, Operation?>()` => `operation<Operation?>()`

### 0.0.12

- Expose `ActionIdentifier` type

### 0.0.11

- Suport Redux Devtools Extension
  ```typescript
  import Fleur, { withReduxDevTools } from '@fleur/fleur'
  const app = new Fleur({ ... })
  const context = withReduxDevTools(app.createContext())
  ```

### 0.0.9

- Update dependency (immer -> 1.8.0)

### 0.0.8

#### Behavior changes

- `Store#emitChange` is batched by `requestAnimationFrame` only client side.
  (In server side, synced not batched)

### 0.0.7

#### API Changes

- Accept action name in first argument of `action()`
  ```typescript
  const increase = action<{ amount: number }>('increase')
  ```
- Add `actions()` for auto naming actions
  ```typescript
  export const CountActions = actions('Count', {
    increase: action<{ amount: number }>(), // It names 'Count/increase'
  })
  ```
- `ExtractActionIdentifiersFromObject` renamed to `ActionsOf`

### 0.0.6

#### API Changes

- Allow to any types in Store#rehydrate,dehydrate

### 0.0.5

#### Fixes

- Fix missing async-process waiting for OperationContext#e
  xecuteOperation

### 0.0.4

#### API Changes

- Accept storeName: string in AppContext.getStore for improve debuggerbility
  No supports in another context getStore methods. (Usable only AppContext.getStore)

### 0.0.3

#### API Changes

- Accept many listener per Action in one Store

  ```ts
  // invalid in 0.0.2
  class SomeStore extends Store {
    private handleSomeAction = listen(someAction, () => {
      /* Do something */
    })
    private handleSomeAction2 = listen(someAction, () => {
      /* Do something */
    }) // error!
  }

  // Can in 0.0.3
  class SomeStore extends Store {
    private handleSomeAction = listen(someAction, () => {
      /* Do something */
    })
    private handleSomeAction2 = listen(someAction, () => {
      /* Do something */
    })
  }
  ```

### 0.0.2

#### API Changes

- Start changelog.
- Rename `Store#produce` to `Store#updateWith`.
- `static storeName = 'someStoreName'` is required for Store.

#### Fixes

- Broken store rehydration state under the Uglify
