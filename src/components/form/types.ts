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
    | "switch"
    | "slot";

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

  // 这里注册登陆表单字段不同，所以多了个hidden需求
  // 似乎没法直接通过修改prop里的属性完成...

  // 实际原因是因为使用ref.value的形式只是取出来的值，而不是响应式对象
  // 所以直接传入响应式对象就可以了
  hidden?: any;

  // 自定义表单项，自定义的表单项的验证和数据收集就直接交由父组件
  // 处理了
  slot?: string;

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
