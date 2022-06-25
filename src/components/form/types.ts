import { FormRules } from "element-plus";

export interface FormOptionProp {
  type:
    | "input"
    | "select"
    | "option"
    | "checkbox-group"
    | "checkbox"
    | "radio-group"
    | "radio"
    | "switch";

  prop: string;

  label?: string;
  placeholder?: string;
  disabled?: boolean;
  showPassword?: boolean;
  clearable?: boolean;

  children?: FormOptionProp[];
}

export interface FormProp {
  model: any;

  rules?: FormRules;

  options: FormOptionProp[];

  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";
  size?: "large" | "default" | "small";
}
