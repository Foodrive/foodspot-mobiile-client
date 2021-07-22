import { useCallback } from "react";
import Toast from "react-native-toast-message";

interface ToastProvider {
  showError: (message: string) => void;
  showMessage: (message: string) => void;
  showWarning: (message: string) => void;
  showSuccess: (message: string) => void;
}

const DEFAULT_DURATION = 1500;

/**
 * Custom hook for showing errors, warnings or messages through
 * an Android toast.
 *
 * Usage:
 * const toastProvider = useToastProvider();
 * toastProvider.showMessage("Enter message here");
 */
const useToastProvider = (): ToastProvider => {
  const showError = useCallback((message: string) => {
    Toast.show({
      type: "error",
      position: "bottom",
      text1: "Error",
      text2: message,
      visibilityTime: DEFAULT_DURATION,
    });
  }, []);

  const showMessage = useCallback((message: string) => {
    Toast.show({
      type: "info",
      position: "bottom",
      text1: "Information",
      text2: message,
      visibilityTime: DEFAULT_DURATION,
    });
  }, []);

  const showWarning = useCallback((message: string) => {
    Toast.show({
      type: "info",
      position: "bottom",
      text1: "Warning",
      text2: message,
      visibilityTime: DEFAULT_DURATION,
    });
  }, []);

  const showSuccess = useCallback((message: string) => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Success",
      text2: message,
      visibilityTime: DEFAULT_DURATION,
    });
  }, []);

  return {
    showError,
    showWarning,
    showMessage,
    showSuccess,
  };
};

export default useToastProvider;
