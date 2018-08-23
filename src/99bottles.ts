function bottles(): void {
  for (let b = 99; b > 0; b--) {
    let grammar = (n: number): string => (n === 1 ? 'bottle' : 'bottles');
    console.log(
      `\n${b} ${grammar(b)} of beer on the wall\n` +
        `${b} ${grammar(b)} of beer\n` +
        'Take one down, pass it around\n' +
        `${b - 1} ${grammar(b - 1)} of beer on the wall\n`
    );
  }
}

bottles();
