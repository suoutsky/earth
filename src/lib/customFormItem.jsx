import React from 'react';
const defaultPropsMap = {
  setValue: 'onChange',
  value: 'value'
};
const mapPropFunc = propMap => (setValue, value) => ({
  [propMap['setValue']]: setValue,
  [propMap['value']]: value
});

const customFormItem = (propsMapper = defaultPropsMap) => Component => {
  return ({ setValue, value, ...restProps }) => {
    if (!['object', 'function'].includes(typeof propsMapper)) {
      throw TypeError('propsMapper must be an object or function');
    }

    const mapper =
      typeof propsMapper === 'object' ? mapPropFunc(propsMapper) : propsMapper;

    const mappedProps = {
      ...restProps,
      ...mapper(setValue, value)
    };

    return <Component {...mappedProps} />;
  };
};

export default customFormItem;
