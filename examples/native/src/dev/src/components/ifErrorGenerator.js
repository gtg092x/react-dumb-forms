import React from 'react';

export default function ifErrorGenerator({errorFor, getDirt}, {DefaultComponent}) {
    return function IfError({name, children, ...props}) {

        const errors = errorFor(name);
        const dirt = getDirt(name);

        if (errors && dirt) {
            return React.cloneElement(children, {name, errors, ...props});
        }

        return <DefaultComponent />;
    }
}