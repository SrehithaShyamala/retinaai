import { useActor } from "@caffeineai/core-infrastructure";
import { type Backend, createActor } from "../backend";

export function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return {
    backend: actor as Backend | null,
    isReady: !!actor && !isFetching,
    isFetching,
  };
}
