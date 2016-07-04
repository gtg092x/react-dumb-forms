import React from 'react';

export default function dumbErrorGenerator({errorFor, getDirt}, {ErrorComponent}) {
    return function DumbError({name, children, ...props}) {

        const errors = errorFor(name);
        const dirt = getDirt(name);

        if (!(errors && dirt)) {
            return null;
        }

        return React.createElement(ErrorComponent, {name, errors, ...props}, children);
    }
}
