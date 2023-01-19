import styles from './Task.module.css';
import { Trash } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';

interface propsTask {
  content : string;
  isChecked: boolean;
  onDeleteTask : (task : string) => void;
  onCheckTask : () => void;
}

export function Task({content, onDeleteTask, onCheckTask} : propsTask) {

 function handleDeleteTask() {
  onDeleteTask(content);
 }

 function handleUpdateStatusTasks(event : ChangeEvent) {
  onCheckTask();
 }

  return (
    <div className={styles.task}>
      <label>
        <input type="checkbox" onChange={handleUpdateStatusTasks} />
        <span className={styles.content}>
          {content}
        </span>
      </label>
      <button onClick={handleDeleteTask} title="Deletar Tarefa">
        <Trash size={24} />
      </button>
    </div>
  )
}