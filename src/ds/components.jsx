import { useState, useRef, useEffect, Children, cloneElement } from "react";
import { IconX, IconCheck, IconChevronDown, IconSearch } from "./Icon";
import "./components.css";

export function Button({ className = "", size = "medium", variant = "primary", href, children, ...props }) {
  const cls = `thryv-button thryv-button-size-${size} thryv-button-variant-${variant} ${className}`.trim();
  if (href) return <a href={href} className={cls} {...props}>{children}</a>;
  return <button className={cls} {...props}>{children}</button>;
}

export function ButtonGroup({ align = "start", className = "", ...props }) {
  return <div className={`thryv-button-group thryv-button-group-align-${align} ${className}`.trim()} {...props} />;
}

export function IconButton({ className = "", "aria-label": ariaLabel, ...props }) {
  return <Button aria-label={ariaLabel} className={`thryv-icon-button ${className}`.trim()} {...props} />;
}

export function Link({ className = "", children, ...props }) {
  return <a className={`thryv-link ${className}`.trim()} {...props}>{children}</a>;
}

export function Avatar({ src, initials, alt = "", size = "medium", className = "" }) {
  return (
    <span className={`thryv-avatar thryv-avatar-${size} ${className}`.trim()}>
      {src ? <img src={src} alt={alt} /> : initials}
    </span>
  );
}

export function AvatarGroup({ children, max = 4 }) {
  const items = Children.toArray(children);
  const shown = items.slice(0, max);
  const overflow = items.length - shown.length;
  return (
    <span className="thryv-avatar-group">
      {shown}
      {overflow > 0 && <span className="thryv-avatar thryv-avatar-medium">+{overflow}</span>}
    </span>
  );
}

export function ListBox({ children }) {
  return <div className="thryv-listbox" role="listbox">{children}</div>;
}
export function ListBoxItem({ children, selected, onSelect, icon, ...props }) {
  return (
    <button type="button" role="option" className="thryv-listbox-item" aria-selected={!!selected} onClick={onSelect} {...props}>
      {icon}
      {children}
    </button>
  );
}

export function Tooltip({ children, label }) {
  return (
    <span className="thryv-tooltip-wrap" tabIndex={0}>
      {children}
      <span className="thryv-tooltip-bubble" role="tooltip">{label}</span>
    </span>
  );
}

export function Fieldset({ children, className = "", ...props }) {
  return <fieldset className={`thryv-fieldset ${className}`.trim()} {...props}>{children}</fieldset>;
}
export function Legend({ children, ...props }) {
  return <legend className="thryv-legend" {...props}>{children}</legend>;
}
export function FieldGroup({ children, className = "", ...props }) {
  return <div className={`thryv-field-group ${className}`.trim()} {...props}>{children}</div>;
}
export function Field({ children, className = "", ...props }) {
  return <div className={`thryv-field ${className}`.trim()} {...props}>{children}</div>;
}
export function Label({ children, htmlFor, className = "", hidden, as, ...props }) {
  const Tag = as || "label";
  if (hidden) return <Tag htmlFor={Tag === "label" ? htmlFor : undefined} className="thryv-sr-only">{children}</Tag>;
  return <Tag htmlFor={Tag === "label" ? htmlFor : undefined} className={`thryv-label ${className}`.trim()} {...props}>{children}</Tag>;
}
export function Description({ children, className = "", ...props }) {
  return <div className={`thryv-description ${className}`.trim()} {...props}>{children}</div>;
}
export function FieldError({ children, className = "", ...props }) {
  if (!children) return null;
  return <div className={`thryv-error-message ${className}`.trim()} {...props}>{children}</div>;
}

export function Input({ className = "", ...props }) {
  return <input className={`thryv-input ${className}`.trim()} {...props} />;
}
export function InputField({ label, description, errorMessage, id, className, ...props }) {
  const fieldId = id || props.name || ("thryv-input-" + Math.random().toString(36).slice(2, 8));
  return (
    <Field>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <Input id={fieldId} className={className} {...props} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}

export function RadioGroup({ label, children, className = "", ...props }) {
  return (
    <div className={`thryv-radio-group ${className}`.trim()} role="radiogroup" {...props}>
      {label && <Label as="span">{label}</Label>}
      {children}
    </div>
  );
}
export function RadioField({ label, name, value, checked, onChange, className = "", ...props }) {
  return (
    <label className={`thryv-radio-field ${className}`.trim()} data-checked={checked}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} {...props} />
      <span className="thryv-radio" />
      {label}
    </label>
  );
}
export const Radio = (props) => <RadioField {...props} />;

export function Slider({ value, min = 0, max = 100, onChange, label }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      {label && <div style={{ font: "var(--thryv-font-body-small)", marginBottom: 6, color: "var(--thryv-color-text-default-secondary)" }}>{label}</div>}
      <div className="thryv-slider">
        <div className="thryv-slider-track" />
        <div className="thryv-slider-fill" style={{ width: pct + "%" }} />
        <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    </div>
  );
}

export function SwitchField({ label, description, checked, onChange, className = "", ...props }) {
  return (
    <label className={`thryv-switch-field ${className}`.trim()} data-checked={checked}>
      <span>
        {label && <Label as="span">{label}</Label>}
        {description && <Description>{description}</Description>}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} {...props} />
      <span className="thryv-switch" />
    </label>
  );
}
export const Switch = (props) => <SwitchField {...props} />;

export function Textarea({ className = "", rows = 4, ...props }) {
  return <textarea rows={rows} className={`thryv-textarea ${className}`.trim()} {...props} />;
}
export function TextareaField({ label, description, errorMessage, id, className, ...props }) {
  const fieldId = id || props.name || ("thryv-textarea-" + Math.random().toString(36).slice(2, 8));
  return (
    <Field>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <Textarea id={fieldId} className={className} {...props} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}

export function Accordion({ items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? null);
  return (
    <div className="thryv-accordion">
      {items.map((it, i) => (
        <div key={i} className="thryv-accordion-item" data-open={open === i}>
          <button className="thryv-accordion-trigger" onClick={() => setOpen(open === i ? null : i)}>
            {it.title}
            <span className="thryv-accordion-chevron"><IconChevronDown size={18} /></span>
          </button>
          {open === i && <div className="thryv-accordion-panel">{it.content}</div>}
        </div>
      ))}
    </div>
  );
}

export function Notification({ children, variant = "message", icon, isDismissible, onDismiss, className = "" }) {
  return (
    <div className={`thryv-notification thryv-notification-${variant} ${className}`.trim()}>
      {icon && <span className="thryv-notification-icon">{icon}</span>}
      <div className="thryv-notification-content">{children}</div>
      {isDismissible && (
        <button className="thryv-notification-close" aria-label="Dismiss" onClick={onDismiss}>
          <IconX size={16} />
        </button>
      )}
    </div>
  );
}

export function Tag({ children, scheme = "clay", onRemove, className = "" }) {
  return (
    <span className={`thryv-tag thryv-tag-${scheme} ${className}`.trim()}>
      {children}
      {onRemove && (
        <button className="thryv-tag-remove" aria-label="Remove" onClick={onRemove}>
          <IconX size={12} />
        </button>
      )}
    </span>
  );
}
export function TagToggle({ children, selected, onClick, className = "" }) {
  return (
    <button type="button" className={`thryv-tag thryv-tag-toggle ${className}`.trim()} aria-pressed={!!selected} onClick={onClick}>
      {children}
    </button>
  );
}
export function TagToggleGroup({ children, className = "" }) {
  return <div className={`thryv-tag-toggle-group ${className}`.trim()} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{children}</div>;
}

export function CheckboxField({ label, description, checked, defaultChecked, onChange, disabled, className = "", ...props }) {
  const [internal, setInternal] = useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internal;
  const toggle = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(!value);
    onChange && onChange(e);
  };
  return (
    <label className={`thryv-checkbox-field ${className}`.trim()} data-checked={value} style={disabled ? { opacity: 0.5, cursor: "default" } : undefined}>
      <input type="checkbox" checked={value} disabled={disabled} onChange={toggle} {...props} />
      <span className="thryv-checkbox">{value && <IconCheck size={14} />}</span>
      <span className="thryv-checkbox-text">
        {label && <Label as="span">{label}</Label>}
        {description && <Description>{description}</Description>}
      </span>
    </label>
  );
}
export const Checkbox = (props) => <CheckboxField {...props} />;

export function Search({ value, onChange, placeholder = "Search", className = "", ...props }) {
  const [internal, setInternal] = useState("");
  const controlled = value !== undefined;
  const v = controlled ? value : internal;
  const set = (next) => {
    if (!controlled) setInternal(next);
    onChange && onChange({ target: { value: next } });
  };
  return (
    <div className={`thryv-search ${className}`.trim()}>
      <Input type="search" value={v} placeholder={placeholder} onChange={(e) => set(e.target.value)} aria-label={placeholder} {...props} />
      <button type="button" className="thryv-search-icon" aria-label={v ? "Clear search" : "Search"} onClick={() => set(v ? "" : v)}>
        {v ? <IconX size={16} /> : <IconSearch size={16} />}
      </button>
    </div>
  );
}

export function Select({ className = "", children, ...props }) {
  return (
    <div style={{ position: "relative" }}>
      <select className={`thryv-select ${className}`.trim()} {...props}>{children}</select>
      <span className="thryv-select-icon" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <IconChevronDown size={16} />
      </span>
    </div>
  );
}
export function SelectField({ label, description, errorMessage, id, className, children, ...props }) {
  const fieldId = id || props.name || ("thryv-select-" + Math.random().toString(36).slice(2, 8));
  return (
    <Field>
      {label && <Label htmlFor={fieldId}>{label}</Label>}
      <Select id={fieldId} className={className} {...props}>{children}</Select>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </Field>
  );
}

export function Image({ src, alt, aspectRatio = "4-3", rounded = true, className = "", ...props }) {
  return <img src={src} alt={alt} className={`thryv-image thryv-image-${aspectRatio} ${rounded ? "thryv-image-rounded" : ""} ${className}`.trim()} {...props} />;
}

export function Logo({ size = "1em", className = "" }) {
  return (
    <span className={`thryv-logo ${className}`.trim()} style={{ fontSize: size }} aria-label="Ryz">
      Ryz
    </span>
  );
}

export function MenuButton({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  return (
    <div className="thryv-menu-wrap" ref={ref}>
      {cloneElement(label, { onClick: () => setOpen((v) => !v) })}
      {open && (
        <div className="thryv-menu" role="menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}
export const Menu = (props) => <MenuButton {...props} />;
export function MenuItem({ children, onSelect, icon }) {
  return (
    <button type="button" role="menuitem" className="thryv-menu-item" onClick={onSelect}>
      {icon}
      {children}
    </button>
  );
}

export function Navigation({ children, className = "" }) {
  return <nav className={`thryv-nav ${className}`.trim()}>{children}</nav>;
}
export function NavigationPill({ children, selected, onClick, className = "" }) {
  return (
    <button type="button" className={`thryv-nav-pill ${className}`.trim()} aria-current={selected ? "true" : undefined} onClick={onClick}>
      {children}
    </button>
  );
}
export function NavigationTabBar({ children, className = "" }) {
  return <nav className={`thryv-nav-tabbar ${className}`.trim()}>{children}</nav>;
}
export function NavigationTabBarItem({ icon, children, selected, onClick, ...props }) {
  return (
    <button type="button" className="thryv-nav-tabbar-item" aria-current={selected ? "true" : undefined} onClick={onClick} {...props}>
      {icon}
      {children}
    </button>
  );
}

export function Dialog({ open, onClose, title, description, children }) {
  if (!open) return null;
  return (
    <div className="thryv-dialog-backdrop" onClick={onClose}>
      <div className="thryv-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="thryv-dialog-close" aria-label="Close" onClick={onClose}>
          <IconX />
        </button>
        {title && <div className="thryv-dialog-title">{title}</div>}
        {description && <div className="thryv-dialog-description">{description}</div>}
        {children && <div className="thryv-dialog-body">{children}</div>}
      </div>
    </div>
  );
}
