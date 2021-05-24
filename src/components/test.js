import React, {useState} from 'react'

function Test() {
    const [tests, setTests] = useState([]);
    return (
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
                        <form >
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
    )
}

export default Test;