import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-white/90 dark:group-[.toast]:text-white/90",
          actionButton:
            "group-[.toast]:bg-white/20 group-[.toast]:text-white group-[.toast]:border-white/30 hover:group-[.toast]:bg-white/30 dark:group-[.toast]:bg-white/20 dark:group-[.toast]:text-white dark:group-[.toast]:border-white/30 dark:hover:group-[.toast]:bg-white/30",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white/90 hover:group-[.toast]:bg-white/20 dark:group-[.toast]:bg-white/10 dark:group-[.toast]:text-white/90 dark:hover:group-[.toast]:bg-white/20",
          error: "group-[.toaster]:bg-red-600 group-[.toaster]:text-white group-[.toaster]:border-red-700/20 dark:group-[.toaster]:bg-red-500 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-red-400/20",
          success: "group-[.toaster]:bg-emerald-600 group-[.toaster]:text-white group-[.toaster]:border-emerald-700/20 dark:group-[.toaster]:bg-emerald-500 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-emerald-400/20",
          warning: "group-[.toaster]:bg-amber-600 group-[.toaster]:text-white group-[.toaster]:border-amber-700/20 dark:group-[.toaster]:bg-amber-500 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-amber-400/20",
          info: "group-[.toaster]:bg-blue-600 group-[.toaster]:text-white group-[.toaster]:border-blue-700/20 dark:group-[.toaster]:bg-blue-500 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-blue-400/20",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
