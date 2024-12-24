// Placeholder for toast functionality
// In a real app, you would use a proper toast library like react-hot-toast or react-toastify

interface ToastOptions {
  title: string;
  description?: string;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    // For now, we'll just use console.log
    console.log(`Toast: ${options.title}${options.description ? ` - ${options.description}` : ''}`);
  };

  return { toast };
} 