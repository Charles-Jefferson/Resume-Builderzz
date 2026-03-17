import { useState, useCallback, useEffect } from 'react'
import { X } from 'lucide-react'

export interface ToastMessage {
  id: string
  message: string
  type: 'error' | 'success' | 'info'
  action?: { label: string; onClick: () => void }
}

interface ToastProps {
  toast: ToastMessage
  onDismiss: (id: string) => void
}

function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    if (toast.type !== 'error') {
      const t = setTimeout(() => onDismiss(toast.id), 4000)
      return () => clearTimeout(t)
    }
  }, [toast.id, toast.type, onDismiss])

  const colors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  return (
    <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 shadow-md max-w-sm ${colors[toast.type]}`}>
      <p className="flex-1 text-sm">{toast.message}</p>
      {toast.action && (
        <button
          onClick={toast.action.onClick}
          className="text-sm font-medium underline hover:no-underline shrink-0"
        >
          {toast.action.label}
        </button>
      )}
      <button onClick={() => onDismiss(toast.id)} className="shrink-0 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, type: ToastMessage['type'] = 'info', action?: ToastMessage['action']) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, message, type, action }])
    },
    []
  )

  return { toasts, toast, dismiss }
}
