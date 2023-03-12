import { PythonShell } from 'python-shell';

//export const myPackage = (taco = ''): string => `${taco} from my package`;

export const myPackage = (): void => {
  let i = 0; // dots counter
  setInterval(function () {
    process.stdout.clearLine(0); // clear current text
    process.stdout.cursorTo(0); // move cursor to beginning of line
    i = (i + 1) % 4;
    const dots = new Array(i + 1).join('.');
    process.stdout.write('\x1b[32m' + `Working${dots}` + '\x1b[0m'); // write text
  }, 300).unref();
  const script = `
  import pandas as pd

  #read csv file
  df = pd.read_csv('input.csv')

  #aggregate the number of true/false values in the 'recommend' column of each unique 'id'
  df_agg = df.groupby('id')['recommend'].value_counts().unstack().fillna(0).round(0).astype(int)

  #write the count of true/false to 2 new columns
  df_agg.rename(columns={True:'recommendTrue', False:'recommendFalse'}, inplace=True)

  #output the file
  df_agg.to_csv('output.csv')
  `;

  PythonShell.runString(script, {})
    .then(function () {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(
        '\x1b[32m' +
          'Date Conversion Complete! Thanks for choosing csvTransformer!' +
          '\x1b[0m\n'
      );
    })
    .catch(err => console.error(err));
};
