interface Validation {
  required: boolean;
}
interface TextValidation extends Validation {
  textType: number;
  length: number;
}

interface ChoicesValidation extends Validation {
  maxSelected: number;
}

interface MartixValidation extends Validation {
  maxMartixTitleQuantity: number;
}

interface OrderValidation extends Validation {
  maxSelectedQuantity: number;
}

interface NumberValidation extends Validation {
  min: number;
  max: number;
  unit: string; //如果要固定選項再用number
  decimal: number;
}

interface SliderValidation extends NumberValidation {
  interval: number;
}

type ChoicesOptions = string[];
type Placeholder = string;

interface Question {
  id: string;
  title: string;
  note: string;
  type: number;
}
export interface QuestionLineText extends Question {
  placeholder: Placeholder;
  validations: TextValidation;
}

export interface QuestionChoices extends Question {
  options: ChoicesOptions;
  validations: ChoicesValidation;
}

type MartixOptions = string[];

export interface QuestionMartix extends Question {
  options: ChoicesOptions;
  martixs: MartixOptions;
  validations: MartixValidation;
}

export interface QuestionNumber extends Question {
  placeholder: Placeholder;
  validations: NumberValidation;
}

export interface QuestionSlider extends Question {
  placeholder: Placeholder;
  validations: SliderValidation;
}

export interface QuestionOrder extends Question {
  options: ChoicesOptions;
  validations: OrderValidation;
}

export interface QuestionDate extends Question {
  placeholder: Placeholder;
  options: ChoicesOptions;
  validations: OrderValidation;
}
