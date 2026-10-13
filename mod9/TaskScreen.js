import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

import TaskItem from '../components/TaskItem';

export default function TaskScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([
    'Read React docs',
    'Finish homework',
    'Buy groceries',
  ]);

  const addTask = () => {
    const trimmedTask = taskInput.trim();

    if (!trimmedTask) {
      return;
    }

    setTasks((currentTasks) => [...currentTasks, trimmedTask]);
    setTaskInput('');
  };

  const deleteTask = (index) => {
    setTasks((currentTasks) => currentTasks.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      <TextInput
        placeholder="Enter a task"
        value={taskInput}
        onChangeText={setTaskInput}
        style={styles.input}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem
            task={item}
            onDelete={() => deleteTask(index)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
});
