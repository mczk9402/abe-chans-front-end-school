import { INPUT_NUMBER, PLUS, MINUS, MULTIPLY, DIVIDE, EQUAL, CLEAR } from 'redux/actions/types';

const initialAppState = {
  inputValue: 0,
  operator: '',
  resultValue: 0,
  calculate: false,
  showingResult: false,
};

const calculator = (state = initialAppState, action) => {
  switch (action.type) {
    // 数字を入力した時の処理
    case INPUT_NUMBER:
      return {
        ...state,
        inputValue: state.inputValue * 10 + action.number,
        showingResult: false,
      };

    case PLUS:
      if (state.calculator === true) {
        return {
          ...state,
          inputValue: 0,
          operator: '+',
          resultValue: state.resultValue + state.inputValue,
          showingResult: true,
        };
      } else {
        return {
          ...state,
          inputValue: 0,
          operator: '+',
          calculator: true,
          resultValue: state.inputValue,
          showingResult: true,
        };
      }
    case MINUS:
      if (state.calculator === true) {
        return {
          ...state,
          inputValue: 0,
          operator: '-',
          resultValue: state.resultValue + state.inputValue,
          showingResult: true,
        };
      } else {
        return {
          ...state,
          inputValue: 0,
          operator: '-',
          calculator: true,
          resultValue: state.inputValue,
          showingResult: true,
        };
      }
    case MULTIPLY:
      if (state.calculator === true) {
        return {
          ...state,
          inputValue: 0,
          operator: '*',
          resultValue: state.resultValue + state.inputValue,
          showingResult: true,
        };
      } else {
        return {
          ...state,
          inputValue: 0,
          operator: '*',
          calculator: true,
          resultValue: state.inputValue,
          showingResult: true,
        };
      }
    case DIVIDE:
      if (state.calculator === true) {
        return {
          ...state,
          inputValue: 0,
          operator: '/',
          resultValue: state.resultValue + state.inputValue,
          showingResult: true,
        };
      } else {
        return {
          ...state,
          inputValue: 0,
          operator: '/',
          calculator: true,
          resultValue: state.inputValue,
          showingResult: true,
        };
      }
    case CLEAR:
      return {
        ...state,
        inputValue: 0,
        operator: '',
        calculator: false,
        resultValue: 0,
        showingResult: false,
      };
    case EQUAL:
      switch (state.operator) {
        case '+':
          return {
            inputValue: state.resultValue + state.inputValue,
            operator: '',
            calculator: false,
            resultValue: state.resultValue + state.inputValue,
            showingResult: true,
          };
        case '-':
          return {
            inputValue: state.resultValue - state.inputValue,
            operator: '',
            calculator: false,
            resultValue: state.resultValue - state.inputValue,
            showingResult: true,
          };
        case '*':
          return {
            inputValue: state.resultValue * state.inputValue,
            operator: '',
            calculator: false,
            resultValue: state.resultValue * state.inputValue,
            showingResult: true,
          };
        case '/':
          return {
            inputValue: state.resultValue / state.inputValue,
            operator: '',
            calculator: false,
            resultValue: state.resultValue / state.inputValue,
            showingResult: true,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default calculator;
