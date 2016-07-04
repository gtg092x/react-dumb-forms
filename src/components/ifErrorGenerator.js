import React from 'react';

export default function ifErrorGenerator({errorFor, getDirt}) {
    return function IfError({name, children, ...props}) {

        const errors = errorFor(name);
        const dirt = getDirt(name);

        if (errors && dirt) {

            if (!React.isValidElement(children)) {
                throw 'React dumb forms - you need to pass a valid react element as a child to IfError. I don\'t make the rules.';
            }
            return React.cloneElement(children, {name, errors});
        }

        return null;
    }
}
