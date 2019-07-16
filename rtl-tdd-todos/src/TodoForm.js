import React, {useState, useCallback} from 'react';

const TodoForm = ({onInsert}) => {
  const [value, setValue] = useState('');
  const onChange = useCallback( (e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback( e => {
    e.preventDefault(); // 새로고침 방지 
    onInsert(value);
    setValue('');
  },[onInsert, value]);

  return (
    <form onSubmit={onSubmit}>
      <input 
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
        />
      <button type="submit">등록</button>
    </form>
  );
  
}

export default TodoForm;