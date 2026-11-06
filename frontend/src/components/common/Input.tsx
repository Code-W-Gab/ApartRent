import type { ReactNode } from "react";

type InputProps = {
  label: string;
  placeholder?: string;
} & (
  | {
      type: "text" | "number" | "textarea";
      value: string;
      setValue: (value: string) => void;
      children?: never;
    }
  | {
      type: "select";
      children: ReactNode;
      value?: never;
      setValue?: never;
    }
  | {
      type: "file";
      setFiles: (files: FileList | null) => void;
      value?: never;
      setValue?: never;
      children?: never;
    }
);

export default function Input(props: InputProps) {
  const className =
    "border border-[#dfe5ed] text-[#526174] px-3 py-2 rounded-md text-sm";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={props.label}
        className="text-[#526174] text-sm font-medium"
      >
        {props.label}
      </label>

      {props.type === "select" ? (
        props.children
      ) : props.type === "file" ? (
        <input
          id={props.label}
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => props.setFiles(event.target.files)}
          className={`${className} h-10`}
        />
      ) : props.type === "textarea" ? (
        <textarea
          id={props.label}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event) => props.setValue(event.target.value)}
          rows={4}
          className={className}
        />
      ) : (
        <input
          id={props.label}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event) => props.setValue(event.target.value)}
          min={props.type === "number" ? 0 : undefined}
          step={props.type === "number" ? "0.01" : undefined}
          className={`${className} h-10`}
        />
      )}
    </div>
  );
}