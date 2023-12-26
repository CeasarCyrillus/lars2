import {useState} from "react";

export type LoadResult<T> = Success<T> | Failure | Idle | Loading;

type Success<T> = { type: "success"; value: T };
type Failure = { type: "failure"; error: any };
type Idle = { type: "idle" };
type Loading = { type: "loading" };

export const isSuccess = <T>(candidate: LoadResult<T>): candidate is Success<T> => candidate.type === "success"
export const isLoading = <T>(candidate: LoadResult<T>): candidate is Loading => candidate.type === "loading"
export const isFailure = <T>(candidate: LoadResult<T>): candidate is Failure => candidate.type === "failure"

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

type UseMutation<T> = [LoadResult<T>, (...args: Parameters<AsyncFunction<T>>) => Promise<void>];

export const useMutation = <T>(asyncFunction: AsyncFunction<T>): UseMutation<T> => {
  const [result, setResult] = useState<LoadResult<T>>({type: "idle"});

  const callback = async (...args: Parameters<AsyncFunction<T>>) => {
    setResult({type: "loading"});

    try {
      const value = await asyncFunction(...args);
      setResult({type: "success", value});
    } catch (error) {
      console.error(error)
      setResult({type: "failure", error});
    }
  };

  return [result, callback];
};