import {Observable} from "rxjs";
import {ComponentType, ReactNode} from "react";
import {Subscribe} from "@react-rxjs/core";

interface WithSubscribeOptions {
  source$?: Observable<unknown>
  fallback?: ReactNode
}

export function withSubscribe<T>(
  Component: ComponentType<T & JSX.IntrinsicAttributes>,
  options: WithSubscribeOptions = {}
) {
  const {source$, fallback} = options

  const resolvedFallback = fallback ? (
    fallback
  ) : fallback === null ? null : (
    <p>Loading...</p>
  )

  return (props: T & JSX.IntrinsicAttributes) => (
    <Subscribe source$={source$} fallback={resolvedFallback}>
      <Component {...props} />
    </Subscribe>
  )
}
