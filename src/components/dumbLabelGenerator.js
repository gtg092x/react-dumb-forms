import React from 'react';

export default function dumbLabelGenerator({errorFor, getDirt}, {ErrorComponent, LabelComponent}) {
    return function IfError({name, children, ...props}) {

        const errors = errorFor(name);
        const dirt = getDirt(name);

        if (errors && dirt) {
            return React.cloneElement(children, {name, errors, ...props});
        }

        return <LabelComponent />;
    }
}