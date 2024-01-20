import React from "react";
import {JSX} from "react/jsx-runtime";



export function withSuspense<WrappedComponentProps extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WrappedComponentProps>) {
    return (props: WrappedComponentProps) => {
        return <React.Suspense fallback = {<div> loading...</div>}>
        <WrappedComponent {...props} />
        </React.Suspense>
    }
}