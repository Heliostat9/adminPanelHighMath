import React, {useState} from 'react'
import Test from './components/test';
function App() {
  const [tests, setTests] = useState([]);
  const [type, setType] = useState('Выберите тип');
  return (
    <>
      <div>
        <form  id="test" style={{
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
         {type != 'Тест' ? <input type="file" name="file"/> : 
         <>
         <input type="text" placeholder="Название теста"/>
         {
             tests.map((item,index) => {
                const ind = index;
                return (<>
                     вопрос {index + 1}
                     <input type="text" value={item.title} onChange={(e) => setTests([...tests.slice(0, index),{
                         title: e.target.value,
                         choices: tests[index].choices,
                         good: tests[index].good
                     }, ...tests.slice(index + 1)])} placeholder={"Название вопроса"}/>
                     <form>
                     {tests[index].choices.map((item,index) => {
                         return (
                             <>
                             ответ {index + 1}
                             <input type="text" value={item} onChange={(e) => {
                                 setTests([...tests.slice(0, ind), {
                                     title: tests[ind].title,
                                     choices: [...tests[ind].choices.slice(0, index),e.target.value, ...tests[ind].choices.slice(index + 1)],
                                     good: tests[ind].good
                                 }, ...tests.slice(ind + 1)])
                             }}/>
                             <input type="radio" name="good" value={item}  onChange={(e) => {
                                 setTests([...tests.slice(0, ind), {
                                     title: tests[ind].title,
                                     choices: [...tests[ind].choices],
                                     good: e.target.value
                                 }, ...tests.slice(ind + 1)])
                             }}/><br />
                         </>
                         )
                      })}
                      </form>
                      <button onClick={(e) => {
                          e.preventDefault();
                          setTests([...tests.slice(0, index), {
                             title: tests[index].title,
                             choices: [...tests[index].choices, ''],
                             good: tests[index].good
                          }, ...tests.slice(index+1)])
                      }}>Добавить вариант</button>
                 </>)
             })
         }
         <button onClick={(e) => {
             e.preventDefault();
             setTests([...tests, {
                 title: '',
                 choices: [],
                 good: 1
             }])
             console.log(tests);
         }}>Добавить вопрос</button>
     </>
         } 
          <input type="submit" onClick={async (e) => {
              e.preventDefault();
              let formData = new FormData(test);
              //formData.append("tests", JSON.stringify(tests));
              console.log(formData);
             await fetch('http://localhost:3000/content', {
               method: 'POST',
               mode: 'no-cors',
               body: formData,
               headers: {

               }
             })
          }}/>
        </form>
      </div>
    </>
  )
}

export default App;
