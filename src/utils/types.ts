export interface LoadingContextType {
  isLoading: boolean;
  showLoading: boolean;
  startLoading: () => void;
  stopLoading: (delay?: number) => void;
};