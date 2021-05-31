import React, {useState,useEffect} from 'react'
import Test from './components/test';
function App() {
  const [tests, setTests] = useState([]);
  const [type, setType] = useState('Выберите тип');
  const [name, setName] = useState();
  const [content, setContent] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    const fetchData = async () => {
       const response = await fetch('http://192.168.1.49:3000/');
       const cont = await response.json();
       
       setContent(cont);
    }
    fetchData();
  }, []);
  const handleClick = () => {
    const fetchData = async () => {
      const response = await fetch('http://192.168.1.49:3000/');
      const cont = await response.json();
      
      setContent(cont);
   }
   fetchData();
  }
  return (
    <>
      <div>
        <h1>Админ-панель учебного методического пособие по дисциплине "Элементы высшей математике"</h1>
        <div style={{display: 'flex'}}>
          <form  id="test" style={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%'
          }} method="POST" encType="multipart/form-data"> 
            <input style={{
              padding: 10,
              marginBottom: 10
            }} name="title" type="text" placeholder="Введите название"/>
            <textarea style={{
              padding: 10,
              height: 150,
              marginBottom: 10
            }} name="desc" placeholder="Введите описание">
            </textarea>
            <select style={{
              padding: 10,
              marginBottom: 10
            }} name="category" defaultValue="Выберите категорию">
              <option disabled>Выберите категорию</option>
              <option value="Теория множеств">Теория множеств</option>
              <option value="Линейная алгебра">Линейная алгебра</option>
            </select>
            <select style={{
              padding: 10,
              marginBottom: 10
            }} name="type" value={type} onChange={(e) => setType(e.target.value)}>
              <option disabled value="Выберите тип">Выберите тип</option>
              <option value="Лекция">Лекция</option>
              <option value="Тест">Тест</option>
              <option value="Практическая">Практическая</option>
              <option value="Контрольная">Контрольная</option>
            </select>
            <input style={{
              padding: 10,
              marginBottom: 10
            }} type="text" name="img" placeholder="url изображения" />
          {type != 'Тест' ? <input style={{marginBottom: 10}} type="file" name="file"/> : 
          <>
          <input type="text" style={{
              padding: 10,
              marginBottom: 10
            }} value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Название теста"/>
          {
              tests.map((item,index) => {
                  const ind = index;
                  return (<>
                      вопрос {index + 1}
                      <input type="text" style={{
              padding: 10,
              marginBottom: 10
            }} value={item.title} onChange={(e) => setTests([...tests.slice(0, index),{
                          title: e.target.value,
                          choices: tests[index].choices,
                          good: tests[index].good
                      }, ...tests.slice(index + 1)])} placeholder={"Название вопроса"}/>
                      <form>
                      {tests[index].choices.map((item,index) => {
                          return (
                              <>
                              ответ {index + 1}
                              <input style={{
              padding: 10,
              marginBottom: 10
            }} type="text" value={item} onChange={(e) => {
                                  setTests([...tests.slice(0, ind), {
                                      title: tests[ind].title,
                                      choices: [...tests[ind].choices.slice(0, index),e.target.value, ...tests[ind].choices.slice(index + 1)],
                                      good: tests[ind].good
                                  }, ...tests.slice(ind + 1)])
                              }}/>
                              <input style={{
              padding: 10,
              marginBottom: 10
            }} type="radio" name="good" value={item}  onChange={(e) => {
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
                        <button style={{
              padding: 10,
              marginBottom: 10
            }} onClick={(e) => {
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
          <button style={{
              padding: 10,
              marginBottom: 10
            }} onClick={(e) => {
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
            <input style={{
              padding: 10,
              marginBottom: 10
            }} type="submit" onClick={async (e) => {
              e.preventDefault();
                if (type == 'Тест') {
                  
                  let formData = new FormData(test);
                  formData.append("tests", JSON.stringify([...tests]));
                  formData.append("name", name);
                  console.log(JSON.stringify(formData));
                await fetch('http://localhost:3000/content', {
                  method: 'POST',
                  mode: 'no-cors',
                  body: formData,
                });
                
              }else {
                let formData = new FormData(test);
                console.log(JSON.stringify(formData));
                await fetch('http://localhost:3000/content', {
                  method: 'POST',
                  mode: 'no-cors',
                  body: formData,
                });
              }
              handleClick();
            }}/>
          </form>
          <div style={{
            marginLeft: 10,
            width: '100%'
          }}>
              <h3>Управление контентом</h3>
              <div>
              <input 
                type="text" 
                placeholder="Поиск"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                style={{
                  padding: 10,
                  width: '47%',
                  borderRadius: 5,
                  outline: 'none',
                  marginBottom: 20
                }}
              />
              <button
               onClick={() => {
                 setQuery('');
               }}
              style={{
                width: '15%',
                padding: 10,
                marginLeft: 5
              }}>Очистить</button>
              </div>
              <div style={{
                width: '65%',
                overflowY: 'scroll',
                minHeight: 550,
                maxHeight: 550
              }}>
              {content.filter(item => item.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1).map(item => {
                return (
                <>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '95%',
                    border: '1px solid black',
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 20
                  }}>
                    <div>
                      <img 
                        src={item.imgSrc}
                        width={100}
                        height={80}
                        style={{
                          borderRadius: 10
                        }}
                      />
                      <p>{item.title}</p>
                      
                      <p>Тип: {item.type}</p>
                    </div>
                    <div>
                    
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        fetch('http://192.168.1.49:3000/del/' + item._id);
                        handleClick();
                      }}>Удалить</a>
                    </div>
                  </div>
                  
                  </>
                )
              })}
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App;
