# Overview

## Third party exceptions

If any of these patterns inhibits the ability to use a 3rd party library that we need to use, we can ignore the pattern in the use case but need to provide a comment referencing we are breaking the pattern in order to use the 3rd party library.

## Comment non-standard implementations

There are going to be cases where we need to do something outside of our standard patterns, it is just going to happen. In these cases, we need to add a comment as to why the standard pattern will not work. This helps the reviewers of PRs understand why something is different (and might lead them to suggest an alternative) and anyone reading the code later as to why it might look a little different from what they might be expecting.

## Updating the coding style guide

This is a living documenting and updates will need to be made as we run into more use cases. Ideally, any changes to the style guide should first be discussed outside of Notion (probably in slack) and once a decision has been made, this document can be updated.

# Tooling
- node - runtime for both tooling and production code. All of our node based applications manage their version of node is through the `.nvmrc` file in the repository (it is highly suggested you use `nvm` to make managing `node` as easy as possible)
- pnpm - managing dependencies (with `pnpm-lock.yaml` lock file)
- vite - build tool
- css modules - styling components
- vitest - unit testing
- playwright - component / integration / end to end testing

## Dependency Versioning Format

Over the years there have been incidents of npm package being hack or even the maintainers themselves adding malicious code:

- https://security.stackexchange.com/questions/189489/recent-eslint-hack-or-how-can-we-protect-ourselves-from-installing-malicious-npm
- https://www.bleepingcomputer.com/news/security/big-sabotage-famous-npm-package-deletes-files-to-protest-ukraine-war/
- https://thehackernews.com/2021/11/two-npm-packages-with-22-million-weekly.html

There are also times when a non-breaking version bump does actually break code (no one is perfect) and having that auto update without knowing can make what caused that breaking issue very hard to determine.

For those reasons, locking down packages in `package.json` to an exact version (not using `~`, `^`, etc.) helps prevent these kinds of issues (along with the `pnpm-lock.yaml` file).

# Repository / Coding Structure

## Common Code

All common code should live within the `./packages` directory which includes sub-directories for the following:

- `packages/apis/*` - Each directory under this should store apis that are related to a specific resource (i.e. `packages/apis/users`, `packages/apis/projects`, etc.)
- `packages/assets/*` - This should store static assets (.e. images, json, etc.)
- `packages/components/*` - Components
- `packages/data-models` - File with utils / types for dealing with specific data models (users, projects, etc.)
- `packages/directives/*` - SolidJS directives
- `packages/locale/*` - Top level language files for i18n (these files should only include other localization files that are stored closer to the code that uses it)
- `packages/stores/*` - Any general custom store
- `packages/styles/*` - Any general styling related code
- `packages/types/*` - These should be used for global types
- `packages/utils/*` - General utility functionality for specific contexts (`string.ts`, `array.ts`, etc.)

This structure can also live in applications though those files should be specific to the application it lives it.

## Application Code

Each application (a web application, an backend api, a browser extension, etc) should live in its own directory under `./applications` and can include the same structure as the common code above but also include a directory of `packages/view` for page level components.

## Tests

test should live in the same directory as the code it is testing with the following format:

- `*.spec.ts(x)` - unit level tests
- `*.pw.ts(X)` - component / integration level tests
- `*.e2e.ts` - end to end tests

### Component Testing

Component testing should be done with Playwright instead of vitest as playwrioght test are much closer to the real things and component level testing with tools like vitest in my opinion are not as easy to maintain, debug, and flaky.


## Apis

Apis should have a directory for each “resource” (i.e. users, roles, etc.).

Inside those directories there should be a file per api request which should be exported as a named export. These files should include the raw request. This prevents files from becoming too big when there are many api requests for a certain resource.

There should be an `index.ts` file that should export all of the raw api requests as a named export named in a `[RESOURCE_NAME]Api` format (i.e. `usersApi`, `rolesApi`, etc.). All usage of the raw api requests outside of the resource api directory should be from the `index.ts` file.

```
packages/apis/users/index.ts
packages/apis/users/update.ts
```

## Components

Each component in the `packages/components` directory should have its own directory. At a minimum, there should be a file that is the name of the component (like `packages/components/button/button.tsx`) and an `index.ts` file. The component files should use a default export of the component for that file and the `index.ts` should have a default export of the main component.

If a component has sub-components (like a button group), then it should be included in the main components directory (`packages/components/buttons/button-group.tsx`) and included as a property of the default export in the `index.ts` file.

```tsx
import Button from "$/components/button/button.tsx";
import Group from "$/components/button/button-group.tsx";

export default Object.assign(Button, { Group });
```

## Utils

Util should define non-exported methods for all the utility functionality that is needed along with any exported interface /type that is needed externally. Each of these methods that need to be used externally needs to be export as an object named `[fileName]Utils` like this:

```tsx
const processLogin = () => { \* ... *\ };

const processLogout = () => { \* ... *\ };

export const authenticationUtils = {
    [processLogin](https://www.notion.so/Frontend-567ec6d9eacf482ebd7cd380ca804e56),
    processLogout,
};
```

This is done as it makes it easier to mock these methods and keeps the general pattern of having an explicit / consistent external api for the code.

Each file should be group by a specific purpose (e.x. `src/utils/form.ts`, `src/utils/authentication.ts` , etc.) or my data model (e.x. `src/utils/data-models/integrations.ts`, `src/utils/data-models/incidents.ts`, etc.). There is no need for an `index.ts` file since methods are already export as an object.

These files should also export type as needed.

# Language Localization

Each language for i18n has an index file in the top folder for that locale (`packages/locale/en/index.ts`). Each of these files should only be importing other i18n files that live with the code that they related to.

## Key Formatting

The key formatting for i18n should follow the directory structure of where it related to using `.` instead of `/` (`components.applicationFrame.buttons.logout`).

# Naming

These are the general naming standards that should always be followed.

## Casing rules

The casing rules are as follows:

- directories - `kebab-case`
- files - `kebab-case`
- string identifiers - `kebab-case` (or sync to whatever the backend does when required)
- interfaces / types - `PascalCase`
- enum names - `PascalCase`
- components - `PascalCase`
- classes - `PascalCase` (functional programming style should be used over classes / OOP whenever possible)
- constants - `SCREAM_CASE`
- enum values - `SCREAM_CASE`
- variables / properties - `camelCase`
- functions / methods - `camelCase`
- basically everything else - `camelCase`

When in doubt, use `camelCase`.

## Extensions

- `.ts` - standard file that does not return JSX
- `.tsx` - any file that has JSX in it

## Special files

Some specific files have unique naming patterns to better help with tooling and identifying:

- sandbox - `.sandbox.tsx`
- css modules - `.module.css`

## Prefixing / Suffixing certain data types

There are a few cases where we want to prefix or suffix certain data to help with naming conflicts / keep naming consistent:

### Function return value

`[FunctionName]Returns`

```tsx
type DoSomethingReturns  = {
  foo: string;
  bar: number;
}

const doSomething = (): DoSomethingReturns => {
  // ...
};
```

### Function signature

`[FunctionName]Signature`

```tsx
type ComparerSignature = (value1: string, value2: string) => boolean;
```

### Components properties

`[ComponentName]Props`

```tsx
type ButtonProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  "data-context"?: buttonContext;
  "data-size"?: buttonSize;
  // ...
}
```

### Form data

`[FormName]FormData`

```tsx
type EditIncidentFormData  = {
  firstName: string;
  combobox: number;
  email: string;
  mobileNumber: string;
  title: string;
  developer: string;
  dateTime: string;
  todos: Todo[];
  todosCompleted: Todo[];
}
```

### Translation

`[REFERENCE FILE]Translations`

```tsx
export const applicationFrameTranslations = {
  buttons: {
    toggleTheme: "Toggle Theme",
    logout: "Logout",
  },
  links: {
    home: "Home",
    incidents: "Incidents",
    workflows: "Workflows",
    users: "Users",
    integrations: "Integrations",
    notifications: "Notifications",
    generalSettings: "General Settings",
  },
};
```

### Event Handlers (native of other wise)
When as a property of a component, they should be prefixed `on*` but when defined as a standalone variable / method, they should be named `handle*`.

```tsx
const handleClick = () => {
  // ...
}

const handleDateSelected = () => {
  // ...
}

<div>
    <Button onClick={handleClick}>Click</Button>
    <DatePicker onDateSelected={handleDateSelected} />
</div>
````

# General coding guide

## Auto formatting

There are a number of patterns that are not listed here however are enforced by the auto code formatting so adhering to them manually is not necessary.

## Object.assign()

When using Object.assign(), outside of component default exports, we should be wrapping that in `structuredClone()`, this help avoid shallow copying something by mistake that can result in unexpected behavior that can be hard to debug.

## No magic values (string, numbers, etc.)

Anywhere we have string identifiers, instead of using the string value in-place, we should be using a constants:

```tsx
// bad
if (user.role === "admin") {
  // ...
}

import { Role } from "$/utils/data-models/user";

// good
if (user.role === Role.ADMIN) {
  // ...
}
```

### Exception

If something is typed to only allow certain string / number / etc. values (like for `HTMLElement.removeEventListener()` event parameter), then inlining a string is fine since type checking will error if an invalid value is used (which is the primary reason to avoid magic values)

## Store common use data / types / functionality in a `utils.ts` for each directory

Whenever we have code that is being used in multiple files that might have an interdependency with each other (like multiple components within the same component directory), we should store this data in a `utils.ts(x)` file. This provides 2 benefits:

This helps avoid circular dependency issues that can come up, especially in component directories. for example, when there are types that multiple sub-components need access to, having a `utils.ts(x)` file avoid that circular dependency issue.

For components, by limiting the component to only having a default export and nothing else, we don’t run into this issue of hot reloading not working as expected.

## Avoid default exports

While there are a number of smaller reasons, the biggest reason for this is to ease the process of mocking. Mocking default exports is not nearly as straight forward as it is with named exports.

### Components exception

Components have the default export as this is a near defacto standard pattern for component in library like React.

## Functional and immutable patterns over OOP

We should always be using a functional / immutable pattern over OOP. For example, instead of creating a `class` with methods on it, we should create a utility file that has methods that take in the needed data and return a new copy of the data with the modifications without actually modifying the passed in data. This can greatly reduce issues related to side effects that can happen when modifying passed in data that can often be difficult to debug.

We use `immer` for our immutable workflow when needed.

### Performance concerns

While using a library for an immutable data workflow like `immer` can cause a slight overhead in some cases, in general, those performance hits are not noticeable and the benefit gains outweigh it.

If there is a case that we run into where this overhead does degrade the UX of a certain feature and there is no other way to improve performance, we can just not use `immer` in those locations (`immer` just wraps our code to provide immutability so it is relatively easy to remove when we need to)

## Favor fat arrow functions when possible

There is no real downside to using fat arrow functions and they provide the benefit of automatically scoping `this` properly in certain cases.

```tsx
// bad
function someMethod() {
  // ...
}

// good
const someMethod = () => {
  // ...
};
```

## Internal aliasing

### Common code

When importing common internal code, we should always be importing from the main `$/` alias.

```tsx
// bad
import reactUtils from "../../../utils/react";

// good
import reactUtils from "$/utils/react";
```

This make it easier to reason about import paths and make copying / moving code with paths less error prone.

If any code in the `applications` directory also has a `packages` directory, an alais should be made for that, for example `applications/sandbox/packages` would be mapped to `$sandbox/`.

## Overriding linting / formatting rules

When rules need to be overridden (sometimes that does happen), we should add a comment explaining why the rule is being overridden with the disable comment.

## Use `data-id` for general purpose selector needs

While is in common to use `data-testid` for creating general use selector for unit testing, we should instead use `data-id`. This can be use not only for testing, but for other purposes such as analytics and using some general like `data-id` can better indicator it might be used for more than just testing and that change it should be handled with care.

## `data-id` values should be generic and nested selector used to drill deep.

We should be using nesting for `data-id` attributes (do `[data-id="application-frame"] [data-id="navigation]` instead of `[data-id="application-frame-navigation"]`). This allows these value to be generic and not too wordy.

## Don’t create a sandbox file for every single component

Every single component does not need its own sandbox file, only logical collections of components should have stories. A general rule is if the component can be used by itself, it should probably have a story file.

## Avoid named export on lazy loaded components

Components that are lazy loaded should avoid having named exported as it can cause hot reloading to fully reload the page and clear any state.

Reference: https://github.com/vitejs/vite/issues/8344#issuecomment-1140924567

## Do not use export named methods directly / `as ...` pattern for importing

It makes it much more difficult to mock methods that are named exported methods when using es modules (since es module are readonly) so we don’t want to do that (which we have described in the document in a number of locations). Since that a big use case of using the`import * as ...` import pattern, we also want to avoid this for our internal code.

Not using the `import * as ...` import pattern also help keep the code more consistent since the `...` can be named anything so by using named object that contain them methods, those will be consistent.

## Name things as detailed as needed

### Named objects

The named object that is being exported can be used as a namespace effectively which means the method inside that name export doesn’t need to duplicate verbiage:

```tsx
// FILE: src/utils/form.ts

// bad
const validationForm => //...

export const formUtils = {
    validationForm,
};

// good
const validate => //...

export const formUtils = {
  validate,
};
```

## Return early when possible

It is preferred to return early in code when possible. This helps reduce the amount of code that is intended and can be arguably easier to read.

```tsx
// bad
const doSomething = () => {
  if (user.isAdmin) {
    /* logic to perform */
  }
};

// good
const doSomething = () => {
  if (!user.isAdmin) {
    return;
  }

  /* logic to perform */
};
```

## Named exports should be verbose

When naming something that is not exported directly, naming can be shorter as long as it makes sense in the context of the file:

```tsx
// FILE: src/utils/logger.ts

// acceptable
const CLIENT_ID = //...
```

When naming something as a named export, it should be verbose enough to know what it is outside of the context of the file:

```tsx
// FILE: src/utils/logger.ts

// bad
export const CLIENT_ID = //...


// good
export const DATADOG_CLIENT_ID = //...
```

## Avoid exporting with `as`

We should avoid exporting with `as` to help make the naming that is used consistent throughout the code base.

The most common reason for using `as` is when import 3rd party code that is being wrapped with custom logic.

## Avoid short / uncommon abbreviations

When naming variables, we should using uncommon abbreviations or abbreviations for already short names. For example, instead of using `e` just just `event` since `event` is already pretty short. Avoid using `wf` instead of `workflow` as while `wf` might make sense to you, it might not be obvious to someone else and it make the code easier to read.

Single character variable names should only be used when it makes logic sense (like using `x` and `y` for a coordinate).

You can use abbreviations when they are extremely common for a relatively longer word (i.e. `id` instead of `indentifier`, `utils` instead of `utilities`, etc.)

## One component per file

When creating components, a file should only have a single component. While this might seems weird for very small components, this will just help with keeping code maintainable and easier to parallelize work in certain cases.

## Only destructure when it is know to be safe and needed

Because SolidJS relies on the signals pattern, destructure can often break SolidJS's reactivity so is it best to avoid destructuring except in cases when we know it is safe and provides benefits to the readability of the code.

## Always name variable in the positive

Naming variables in the positive helps avoid double negative references in code which can be harder to understand as a glance.

```tsx
// bad
const diableCombobox = false;

// good
const enableCombobox = true;
```

## Only reference other types when they are tightly coupled

When referencing other data types, it should only be done when there is a true direct coupling. For example, if the is a `UserListItem` component that has a `UserListItemProps['user']` property, that should be referenced in the `UserList['users']` item.

```tsx
import { UserListItemsProps } from "$/components/user-list/user-list-item";

type UserListProps  = {
  users: Array<UserListItemsProps["user"]>;
}
```

We should not be referencing other types if there is just a loose coupling.

```tsx
import { GetAllUserReturns } from "$/apis/users";

// bad
type UserListProps  = {
  // while this component might use the results of that api, this component might use mutliple data sources and
  // the api might be used for multiple components
  users: GetAllUserReturns["users"];
}

// good
import { User } from "$/data-models/user";

type UserListProps  = {
    // this is better as not this component will accept and api resource that has the require fields
    users: Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
}
```

## Prefer types over interfaces when possible

For consistency, prefer types to interfaces when possible, the reason for this is:
- interfaces can only be used for objects and types can be used for anything
- while interfaces can be used for tuples, types provide a much cleaner and simpler syntax
- interfaces are opened so when you define an interface that already exist it just adds to it and while this might be needed (generally in context with 3rd party libraries), this pattern makes is hard to reason about what an interface includes and therefore should be avoid when possible 

# Testing / Storybook coding guide

## Shortcuts allowed

For code that is not going to be used in production, while it should be clean and readable, shortcut are allowed.

## Test structure

Unit tests should generally have a top level `describe()` block containing some number of `test()` functions inside. Something like the following is considered best practice:

```tsx
describe("drag drop utils", () => {
  test("should change position works properly when dragging down before half way", () => {
    // mocked data...
    // mock methods...

    const results = dragDropUtils.shouldChangePosition<any>(params);

    // assertions...
  });
});
```

You may use nested `describe()` functions if you think that will help the organization and/or help with the readability of the test file.

## Mock only as needed, not by default

There are some philosophies around unit testing that they should be pure. They should only run the code that is intended for the test to check and everything else should be mocked. While this does have some benefits, it also has costs.

If something does not need to be mocked in order to test something, then it generally should not be mocked. Mocking has overhead in setting them up, maintaining them as code changes, extra complexity in understand the test itself, etc. so the less we mock, the less we have on these costs. For example, a lot of the methods in libraries like lodash don't need to be mock as they already have testing from the library itself.

## Element Selection

When selecting elements for UI tests, we should be use `data-id` attribute selectors.

## Highly experimental code

There are going to be times when you might work on a feature that is highly experimental. In those cases, it is up to the engineer on whether or not they feel that unit tests are warranted. If there is low confidence in the code's longevity, it is fine to skip writing unit tests for that code. Unit tests are not free and we would like to avoid too much time spent on them if the code is likely to be scrapped.

## Wrap 3rd party components as needed for testing

There might be cases where mocking a 3rd party library is difficult (because of how it is exported) or impossible (because it is using es modules). Instead of trying to work with complex import mocking solutions which can can be finicky, wrap the library in a custom util file which then can be used to allow for very easy and straight forward mocking.

## Mocking complex types

**PATTERN FOR UNIT TESTING ONLY**

There are times where you need to mock a complex types (often with 3rd party libraries where we don't have control). Instead of trying to use complex types mockers that are not always easy to use, you can use the pattern of doing `as unknown as *`, so for example:

```tsx
const complexMock = { needs: "mock" } as unknown as ComplexType;
```

With this pattern you only mock what needs to be mocked for the test and even if `ComplexType` requires a 100+ properties to be defined, typescript will not complain.

## Only assert what the test is about

When writing a test, we should only assert the functionality specific to that test and not assert absolutely everything that the function does even if it is irrelevant to the test itself. This should help limit the amount of refactoring required when code changes happen.

## Use immer for testing changes in objects

When you have changes to an object, using immer can make those testing those changes easier to read and write:

```tsx
// bad
expect(subject.next.getCall(0).args).to.deep.equal([
  {
    ...startingState,
    notifications: [
      ...startingState.notifications,
      {
        id,
        ...notification,
      },
    ],
  },
]);

// good
expect(subject.next.getCall(0).args).to.deep.equal([
  produce(startingState, (draft) => {
    draft.notifications.push({
      id,
      ...notification,
    });
  }),
]);
```

# SolidJS

## split / merge props to `props`

In order to keep things consistent, whenever you split or merge props, the result of the props to be used in that component should be `props`. You can name the props being passed into the component as `passedProps`.

```ts
const Component = (passedProps: ComponentProps) => {
    const props = mergeProps({position: DEFAULT_BUTTON_ICON_POSITION, isLoading: false}, passedProps);
    // or
    const [props, restOfProps] = splitProps(passedProps, ['droppableId', 'items', 'children']);
    
    // ....
}
```

## Use reconcile() for large data updates if performance is bad

When updating large data sets, update say a large array of data that is used to render can sometimes cause performance issues as even if only 1 things changed, all eleement will be rerendered. Using a store and `reconcile()` will allow SolidJS to know what items in that array have actually update an limit the rendering to element that have actually changed.

# Styling / CSS coding guide

## Use css modules

For most styling, css modules should be used whenever possible (things that are re-usable like animations can be in a regular css file).

## Avoid nesting when possible

Since we are using css modules, we should avoid nesting selectors. This helps make selectors have as little specificity as possible which makes easier to de-couple the css structure from the html structure (which can make refactoring easier) and makes it easier to override css when it is needed.

## Animations

When defining animation key frame, we should always defined them withing a `:global {}` block.

```css
:global {
  @keyframes fade-in {
    0% {
      opacity: 0.1;
    }

    100% {
      opacity: 1;
    }
  }
}
```

Then when using that key frame, that must also be in a `:global {}` block.

```css
.notification {
  &:not(.is-removing) {
    :global {
      animation: fade-in 0.5s ease;
    }
  }
}
```

# Browser extension coding guide

## Listening on storage changes

We should favor using `browser.storage.onChanged.addListener` instead of `browser.storage.local.onChanged.addListener` for listening for storage changes as it seems to have better TypeScript support.

# Anti-Patterns

## Avoid using `!` to force typescript to assume the value is not `null` / `undefined`

This is generally an anti-pattern. If a type has something as possible to be `null` or `undefined`, the code should properly check for that condition and do the correct thing (whether that is to return early, throw an exception, etc.).

### SolidJS Exception

There are cases in SolidJS where typescript can can't know somethings is null for in those cases, this is fine.

```tsx
<Show when={!!props.icon} fallback={<span class={styles.buttonMainContent}>{props.children}</span>}>
    <Icon icon={props.icon!} />
</Show>
```

### Initializing example

There might be times when you might have something that will always be defined except when initializing (like when a context might have a function that is generated by `useCallback`). In those cases we want to avoid doing something like this:

```tsx
// bad
export type IAuthenticationContext  = {
  //...
  login: ILogin | null;
}

export const defaultAuthenticationContext: IAuthenticationContext = {
  //...
  login: null,
};
```

Doing something like this then requires other code referencing this to have to do this:

```tsx
context.login!();
```

In cases like these, whenever possible, we should be doing something like this:

```tsx
// good
export type IAuthenticationContext  = {
  //...
  login: ILogin;
}

export const defaultAuthenticationContext: IAuthenticationContext = {
  //...
  login: () => {},
};
```

Then the calling code can just do:

```tsx
context.login();
```

This might always be practical (method with really complex interfaces / types) or possible (3rd party code) but this should be the default way we handle this situation and if we can’t, we add a comment about why.

# Tips and Tricks

## JavaScript

Nothing yet.

## TypeScript

### Looping through object properties in typescript

When looping through an object in typescript and using the key can often result in a typescript as the key needs to be typed to the possible key of the object being looped how by default it is just a `string` , to handle this use case, you can so something like this:

```tsx
let key: keyof UpdateRoleInput;

for (key in input) {
  if (!input[key]) {
    delete input[key];
  }
}
```

This will not result in any typescript errors.

Reference: [https://imfaber.me/typescript-how-to-iterate-over-object-properties/#introduce-a-type-declaration-for-property](https://imfaber.me/typescript-how-to-iterate-over-object-properties/#introduce-a-type-declaration-for-property)

## Web Extension

### Send to events in content script

While it might seem obvious, when listening to `browser.runtime.onMessage.addListener` from a content script, you must specific the `tab.id` when sending the event for it to be processed by that content script (unlike with background script which processes event even if the `tab.id` is not passed).

### API calls in background avoids CORS issues

It appears that when an API call in made from the background code, it does not suffer from any CORS issues.

### Always use remove() instead of set() when needing to reset a storage value

If a storage value needs to be reset, we should use `remove()` instead of `set()` as it seems like if you try to use `set()` to set a value to `undefined` , `onChanged` events wont be triggered.

This is based on limited testing so something else might be the underlying issue.

# Articles / Links

https://www.youtube.com/watch?v=IP_rtWEMR0o - Has some good content related to utilizing css / html instead of javascript (hit and miss with this one depending on the functionality needed).
