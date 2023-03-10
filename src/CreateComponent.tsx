import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { observer } from "mobx-react-lite";

function withErrorBoundary(WrappedComponent: React.FunctionComponent) {
  //@ts-ignore
  return function ErrorBoundaryWrapper(props: any) {
    return (
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

function withMobxObserver(WrappedComponent: React.FunctionComponent) {
  const ObserverComponent = observer(WrappedComponent);
  //@ts-ignore
  return function Obs(props: any) {
    return <ObserverComponent {...props} />;
  };
}

export default function CreateComponent(
  WrappedComponent: React.FunctionComponent
) {
  return withErrorBoundary(withMobxObserver(WrappedComponent));
}
