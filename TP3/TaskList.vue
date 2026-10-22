<template>
  <div class="task-list-container">
    <h2>Gestionnaire de Tâches</h2>

    <!-- Computed Property : Affichage du total -->
    <p class="total-tasks">Total des tâches : {{ totalTasks }}</p>

    <!-- Filtrage avec v-bind pour les classes CSS actives -->
    <div class="filters">
      <button 
        @click="currentFilter = 'all'"
        :class="{ active: currentFilter === 'all' }"
      >
        Toutes
      </button>
      <button 
        @click="currentFilter = 'todo'"
        :class="{ active: currentFilter === 'todo' }"
      >
        À faire
      </button>
      <button 
        @click="currentFilter = 'done'"
        :class="{ active: currentFilter === 'done' }"
      >
        Terminées
      </button>
    </div>

    <!-- Boucle v-for pour afficher les tâches -->
    <ul class="task-items">
      <li 
        v-for="task in filteredTasks" 
        :key="task.id" 
        class="task-item"
        :class="{ completed: task.completed }"
      >
        <div class="task-content">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
        </div>

        <!-- v-show : Afficher le bouton uniquement si la tâche n'est pas terminée -->
        <button 
          v-show="!task.completed" 
          @click="markAsCompleted(task)"
          class="btn-complete"
        >
          Marquer comme terminée
        </button>
        
        <!-- Indicateur visuel pour les tâches terminées -->
        <span v-if="task.completed" class="status-done">✅ Terminée</span>
      </li>
    </ul>

    <!-- Message si aucune tâche ne correspond au filtre -->
    <p v-if="filteredTasks.length === 0" class="no-tasks">
      Aucune tâche dans cette catégorie.
    </p>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data() {
    return {
      // Données initiales (simulant le chargement du JSON)
      tasks: [
        { id: 1, title: "Faire les courses", description: "Acheter des légumes et du lait.", completed: false },
        { id: 2, title: "Faire du sport", description: "Courir pendant 30 minutes.", completed: true },
        { id: 3, title: "Réviser pour l'examen", description: "Relire le chapitre 5 du manuel.", completed: false }
      ],
      // État du filtre actuel : 'all', 'todo', ou 'done'
      currentFilter: 'all' 
    };
  },
  computed: {
    // Computed property : Calculer le nombre total de tâches
    totalTasks() {
      return this.tasks.length;
    },
    // Computed property : Filtrer les tâches selon le bouton sélectionné
    filteredTasks() {
      if (this.currentFilter === 'todo') {
        return this.tasks.filter(task => !task.completed);
      } else if (this.currentFilter === 'done') {
        return this.tasks.filter(task => task.completed);
      }
      return this.tasks; // 'all'
    }
  },
  methods: {
    // Méthode pour mettre à jour l'état d'une tâche
    markAsCompleted(task) {
      task.completed = true;
    }
  }
};
</script>

<style scoped>
/* Styles de base */
.task-list-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.total-tasks {
  font-weight: bold;
  color: #2c3e50;
}

/* Styles des filtres */
.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.filters button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  border-radius: 4px;
}

/* Classe CSS dynamique via v-bind */
.filters button.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

/* Styles des tâches */
.task-items {
  list-style-type: none;
  padding: 0;
}

.task-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Style pour les tâches terminées */
.task-item.completed {
  background-color: #f0fdf4;
  border-color: #42b983;
  opacity: 0.8;
}

.task-item.completed h3 {
  text-decoration: line-through;
  color: #666;
}

.btn-complete {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-complete:hover {
  background-color: #2980b9;
}

.status-done {
  color: #42b983;
  font-weight: bold;
}

.no-tasks {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>