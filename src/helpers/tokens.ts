import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Durstenfeld shuffle
function shuffleArrayMutate<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

const shuffleString = (str: string, delimiter = ''): string => shuffleArrayMutate(str.split(delimiter)).join(delimiter);

export function createToken({
    withUppercase = true,
    withLowercase = true,
    withNumbers = true,
    withSymbols = false,
    length = 64,
    alphabet,
  }: {
    withUppercase?: boolean
    withLowercase?: boolean
    withNumbers?: boolean
    withSymbols?: boolean
    length?: number
    alphabet?: string
  }) {
    const allAlphabet = alphabet ?? [
      withUppercase ? 'ABCDEFGHIJKLMOPQRSTUVWXYZ' : '',
      withLowercase ? 'abcdefghijklmopqrstuvwxyz' : '',
      withNumbers ? '0123456789' : '',
      withSymbols ? '.,;:!?./-"\'#{([-|\\@)]=}*+' : '',
    ].join('');

    return shuffleString(allAlphabet.repeat(length)).substring(0, length);
}

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
