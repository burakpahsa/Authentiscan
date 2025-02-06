import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Transformer<T> = {
    fromQuery: (value: string) => T;
    toQuery: (value: T) => string;
};

const transformers: Record<string, Transformer<any>> = {
    number: {
        fromQuery: (value: string) => Number(value),
        toQuery: (value: number) => String(value),
    },
    string: {
        fromQuery: (value: string) => value,
        toQuery: (value: string) => value,
    },
    boolean: {
        fromQuery: (value: string) => value.toLowerCase() === "true",
        toQuery: (value: boolean) => (value ? "true" : "false"),
    },
    object: {
        fromQuery: (value: string) => JSON.parse(value),
        toQuery: (value: object) => JSON.stringify(value),
    },
};

 export function useQueryParam<T>(name: string, defaultValue: T): [T, (value: T) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = typeof defaultValue;
    const transformer: Transformer<T> = (transformers[type] || transformers.string) as Transformer<T>;

    const getValue = (): T => {
      const param = searchParams.get(name);
      return param !== null ? transformer.fromQuery(param) : defaultValue;
    };

    const setValue = (value: T) => {
      searchParams.set(name, transformer.toQuery(value));
      setSearchParams(searchParams);
    };

    const [value, setValueState] = useState<T>(getValue);

    useEffect(() => {
      setValueState(getValue);
    }, [searchParams]);

    return [value, setValue];
}

export function useQueryParamOrStorage<T>(name: string, storageName: string, defaultValue: T): [T, (value: T) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = typeof defaultValue;
    const transformer: Transformer<T> = (transformers[type] || transformers.string) as Transformer<T>;

    const storageValue = localStorage.getItem(storageName);
    const initialValue: T = storageValue ? JSON.parse(storageValue) : defaultValue;

    const getValue = (): T => {
      const param = searchParams.get(name);
      return param !== null ? transformer.fromQuery(param) : initialValue;
    };

    const [value, setValue] = useState<T>(getValue);

    useEffect(() => {
      localStorage.setItem(storageName, JSON.stringify(value));
      searchParams.set(name, transformer.toQuery(value));
      setSearchParams(searchParams);
    }, [value]);

    return [value, setValue];
}
