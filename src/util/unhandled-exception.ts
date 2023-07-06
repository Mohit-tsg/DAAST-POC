// import { logger } from "@studiographene/nodejs-telemetry";

const handleRejectedPromise = (
  reason: Record<string, unknown>,
  promise: Promise<unknown>
): void => {
  // eslint-disable-next-line no-console
  console.log(reason,promise);
  // logger.error(
  //   "Unexpected promise rejection occured.",
  //   "handleRejectedPromise",
  //   {
  //     data: {
  //       reason,
  //       ex: promise,
  //     },
  //   }
  // );

  process.exit(1);
};

export const unhandledExceptionHandler = (): void => {
  process.on("unhandledRejection", handleRejectedPromise);
};
