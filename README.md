# clone-immutable
> Creates an immutable clone of an input object

## Installation

```
yarn add clone-immutable
```

## Usage

```javascript
import cloneImmutable from 'clone-immutable';

const source = {
  name: 'Borat',
};

const clone = cloneImmutable(source);

// no changes in clone is accepted
```
