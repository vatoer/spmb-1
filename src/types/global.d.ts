interface Window {
  snap: {
    embed: (
      token: string,
      options: {
        embedId: string;
        onSuccess: (result: unknown) => void;
        onPending: (result: unknown) => void;
        onError: (result: unknown) => void;
        onClose: () => void;
      }
    ) => void;
  };
}
