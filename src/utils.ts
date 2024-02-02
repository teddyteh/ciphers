import { performance } from 'perf_hooks';

export const measurePerformance = (
  cipherFunction: any,
  ...cipherFunctionParams: any[]
) => {
  const startTime = performance.now();
  cipherFunction(...cipherFunctionParams);
  const endTime = performance.now();
  return endTime - startTime; // time in milliseconds
};
