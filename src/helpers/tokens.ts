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
