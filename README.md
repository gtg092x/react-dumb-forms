React Dumb Forms
================

Functional forms with validation plugins powered by [React][].

## Installation

    % npm install react-dumb-forms

## Usage

###React Dumb Forms is a toolset for building simple, deterministic forms

Getting tired of managing custom re-implementations of every kind of input? Yeah, me too. With React Dumb Forms, you can use every input already created by Facebook and every custom input widget that implements `onChange` and `onBlur` - if those don't work for you - you can use presets to write your own!

> But wait, there's more

Integrate schema validation once and forget about it forever! After setting your validation system, you only need to pass in config once when you build a form. It can even be asynchronous.

> You're crazy, how does this magic work?
 
Simple - property generation. We're giving you a handful of methods that return objects that you would pass to your input components as properties. Have a look.

### A dumb form

#### MyDumbForm.js

```js
import React from 'react';
import {connectForm} from 'react-dumb-forms';

function MyDumbForm ({propsFor, labelPropsFor, formProps}) {
    return (
        <form {...formProps()}>
            <label {...labelPropsFor('firstName')}>First Name</label>
            <input {...propsFor('firstName')} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default connectForm(MyDumbForm);
```

### A smart component

#### MySmartComponent.js

```js
import React from 'react';
import MyDumbForm from './MyDumbForm';

class MySmartComponent extends React.Component{
    constructor() {
        super();
        this.state = {};
    }
    onChange({name, value}) {
        this.setState({[name]: value});
    }
    onSubmit(model) {
        this.setState({model});
        console.log("Send this to a server or something!");
    }
    render() {
        return (
            <MyDumbForm 
                onChange={this.onChange} 
                onSubmit={this.onSubmit} 
                model={this.state} 
            />
        );
    }
}
```

### Validation

We don't care what you use! You can use almost any validation system as long you can implement a few error fetching methods.  

```js
import {setValidator} from 'react-dumb-forms';

setValidator(function(config) {
    // TODO
    return {getError, getErrors};
});

```

### Customizing form fields

Do whatever you want!

All dumb forms is doing is passing properties to your form components. 

```js
import React from 'react'

function MyCustomField(props) {

    return (
        <div>
            <input {...props} />
        </div>
    );
}

```

### Error Utils

// TODO

```js
import React from 'react'


```

### Fieldsets

// TODO

```js
import React from 'react'


```

### Radio and Checkbox Buttons

// TODO

```js
import React from 'react'


```

### Presets

```js
import React from 'react'

```

## Credits

React Dumb Forms is free software under the MIT license. It was created in sunny Santa Monica by [Matthew Drake][].

[React]: http://facebook.github.io/react/
[Matthew Drake]: http://www.mediadrake.com
