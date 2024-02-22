import { performance } from 'perf_hooks';

export const measurePerformance = (
  cipherFunction: any,
  ...cipherFunctionParams: any[]
) => {
  const startTime = performance.now();
  const output = cipherFunction(...cipherFunctionParams);
  const endTime = performance.now();
  return {
    output,
    timeTaken: endTime - startTime,
  };
};
