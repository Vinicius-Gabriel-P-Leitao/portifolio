import { Button } from "../button/button.component";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import type {
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalRootProps,
} from "./modal.type";
import { overlayVariants, rootVariants } from "./modal.variants";

const Root: FC<ModalRootProps> = ({
  children,
  isOpen,
  onClose,
  hasOverlay = true,
  size,
  position,
  className,
  ...props
}) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {hasOverlay && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={overlayVariants()}
              onClick={onClose}
            />
          )}

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={clsx(rootVariants({ size, position }), className)}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

const Header: FC<ModalHeaderProps & { onClose?: () => void }> = ({
  children,
  onClose,
  className,
  ...props
}) => (
  <div
    className={clsx(
      "flex items-center justify-between p-4 border-b border-white/10",
      className,
    )}
    {...props}
  >
    <div className="font-bold text-white text-lg">{children}</div>

    {onClose && (
      <Button
        variant="primary"
        onClick={onClose}
        className="p-1! hover:bg-white/10 rounded-full min-w-0 h-auto"
        icon={<X size={20} />}
      />
    )}
  </div>
);

const Content: FC<ModalContentProps> = ({ children, className, ...props }) => (
  <div
    className={clsx(
      "flex-1 overflow-y-auto p-4 text-slate-300 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const Footer: FC<ModalFooterProps> = ({ children, className, ...props }) => (
  <div
    className={clsx("p-4 border-t border-white/10 bg-black/20", className)}
    {...props}
  >
    {children}
  </div>
);

export const Modal = { Root, Header, Content, Footer };
