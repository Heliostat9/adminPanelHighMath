import React, {useState} from 'react'
import Test from './components/test';
function App() {
  const [type, setType] = useState('Выберите тип');
  return (
    <>
      <div>
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          width: '30%'
        }} method="POST" action="http://localhost:3000/content" encType="multipart/form-data"> 
          <input name="title" type="text" placeholder="Введите название"/>
          <textarea name="desc" placeholder="Введите описание">
          </textarea>
          <select name="category" defaultValue="Выберите категорию">
            <option disabled>Выберите категорию</option>
            <option value="Теория множеств">Теория множеств</option>
            <option value="Линейная алгебра">Линейная алгебра</option>
          </select>
          <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option disabled value="Выберите тип">Выберите тип</option>
            <option value="Лекция">Лекция</option>
            <option value="Тест">Тест</option>
            <option value="Практическая">Практическая</option>
            <option value="Контрольная">Контрольная</option>
          </select>
          <input type="text" name="img" placeholder="url изображения" />
         {type != 'Тест' ? <input type="file" name="file"/> : <Test />} 
          <input type="submit"/>
        </form>
      </div>
    </>
  )
}

export default App;
