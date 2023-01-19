import { Notepad, PlusCircle} from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './Board.module.css';
import { Task } from './Task';

const initialStateTask = [ {
  id: '',
  content: '',
  isChecked: false
}]

export function Board() {

  const [placeholderText, setPlaceholderText] = useState("Adicione uma nova tarefa");
  const [tasks, setTasks] = useState(initialStateTask);

  const [newTaskText, setNewTaskText] = useState('');

  function onFocusPlaceholderChange() {
    const onFocusPlaceholderText = "Descrição da tarefa";
    setPlaceholderText(onFocusPlaceholderText);
  }

  function onBlurPlaceholderChange() {
    const onBlurPlaceholderText = "Adicione uma nova tarefa";
    setPlaceholderText(onBlurPlaceholderText);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleAddNewTask(event : FormEvent) {
    event.preventDefault();
    let objeto = {id: uuidv4(), content: newTaskText, isChecked: false};
    
    if (tasks.some(t => t.id === ''))
      setTasks([objeto]);
    else
      setTasks([...tasks, objeto]);

    setNewTaskText('');
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete;
    });
    
    if (!tasksWithoutDeletedOne.length)
      setTasks(initialStateTask);
    else
      setTasks(tasksWithoutDeletedOne);
  }

  function updateDoneTasks(taskId: string) {
    const updatedTasks = tasks.map(task => {
      if(task.id === taskId) {
        return { id: task.id, content: task.content, isChecked: !task.isChecked }
      } else {
        return task
      }
    });

    setTasks(updatedTasks);
  }

  const isNewTaskEmpty = newTaskText.length === 0;

  const doneTasks = tasks.filter(task => task.isChecked).length;

  const length = tasks.filter(task => task.id !== '').length;

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleAddNewTask} className={styles.formTask}>
        <input
          placeholder={placeholderText}
          onFocus={onFocusPlaceholderChange}
          onBlur={onBlurPlaceholderChange}
          onInvalid={handleNewTaskInvalid}
          value={newTaskText}
          onChange={handleNewTaskChange}
          required
        />
        <button type='submit' disabled={isNewTaskEmpty}>
          Criar
          <PlusCircle size={20} />
        </button>
      </form>
      <div className={styles.board}>
        <header className={styles.header}>
          <div className={styles.created}>Tarefas Criadas<span>{ length }</span></div>
          <div className={styles.done}>Concluídas<span>{doneTasks + " de " + length}</span></div>
        </header>
        <div className={styles.list}>
          {length ?
              tasks.map(task => {
                return (
                  <Task 
                    key={task.id} 
                    content={task.content} 
                    onCheckTask={() => updateDoneTasks(task.id)}
                    onDeleteTask={() => deleteTask(task.id)}
                    isChecked={task.isChecked}
                  />
                )
              }) :
              <div className={styles.emptyList}>
                <Notepad size={56} />
                <p>Você ainda não tem tarefas cadastradas.</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
          }
        </div>
      </div>
    </div>
  )
}