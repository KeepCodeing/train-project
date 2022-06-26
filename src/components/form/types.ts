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

  // 针对form-item的属性
  label?: string;
  required?: boolean;

  // 针对例如input或者select的属性
  placeholder?: string;
  disabled?: boolean;
  showPassword?: boolean;
  clearable?: boolean;
  attrs?: any;

  children?: FormOptionProp[];
}

export interface FormProp {
  model: any;

  rules?: FormRules;

  options: FormOptionProp[];

  labelWidth?: string | number;
  labelPosition?: "left" | "right" | "top";
  size?: "large" | "default" | "small";

  attrs?: any;

  // 默认操作配置，实际上就是对清空和提交两种操作的个性化处理
  defaultAction?: {
    clear?: {
      name?: string;
      show?: boolean;
    };

    submit?: {
      name?: string;
      show?: boolean;
    };
  };

  // 针对action的一些属性，可以用来配置样式之类的
  actionAttrs?: any;
}
