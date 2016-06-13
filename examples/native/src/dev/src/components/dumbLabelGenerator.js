import React from 'react';

export default function dumbLabelGenerator({errorFor, getDirt, labelPropsFor}, {ErrorComponent, LabelComponent}) {
    return function IfError({name, children, ...props}) {

        const errors = errorFor(name);
        const dirt = getDirt(name);

        const errorContent = (errors && dirt)
            ? React.cloneElement(children, {name, errors, ...props})
            : null;


        return (
            <LabelComponent {...labelPropsFor(name)} {...props}>
                {errorContent}
                {children}
            </LabelComponent>
        );
    }
}