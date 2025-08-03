import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ id, type = 'info', title, message, duration = 5000, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onRemove(id);
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onRemove]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const Icon = icons[type];

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 ${
      isLeaving ? 'transform translate-x-full opacity-0' : 'transform translate-x-0 opacity-100'
    }`}>
      <div className={`p-4 rounded-lg border shadow-lg ${colors[type]}`}>
        <div className="flex items-start">
          <Icon className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            {title && <h4 className="font-medium text-sm">{title}</h4>}
            <p className="text-sm">{message}</p>
          </div>
          <button
            onClick={() => {
              setIsLeaving(true);
              setTimeout(() => onRemove(id), 300);
            }}
            className="ml-3 flex-shrink-0 opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;