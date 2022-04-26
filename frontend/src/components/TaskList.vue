<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tasks List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(task, index) in tasks"
          :key="index"
          @click="setActiveTask(task, index)"
        >
          {{ task.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentTask">
        <h4>Task</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTask.title }}
        </div>
        <div>
          <label><strong>Status:&nbsp;</strong></label>
          <span
            class="badge"
            :class="{
              'badge-success': currentTask.status === 'done',
              'badge-danger': currentTask.status === 'blocked',
            }"
            >{{ getDisplayStatus(currentTask.status) }}</span
          >
        </div>
        <div>
          <label><strong>Expiration:</strong></label>
          {{ currentTask.expiration }}
        </div>
        <RouterLink :to="'/task/' + currentTask.id" class="btn btn-info">
          Edit
        </RouterLink>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Task...</p>
      </div>
    </div>
  </div>
</template>


<script>
import TaskDataService from "../services/TaskDataService";

export default {
  name: "TaskList",
  data() {
    return {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    fetchTasks() {
      TaskDataService.getAll()
        .then((response) => {
          this.tasks = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.fetchTasks();
      this.currentTask = null;
      this.currentIndex = -1;
    },
    setActiveTask(task, index) {
      this.currentTask = task;
      this.currentIndex = task ? index : -1;
    },
    removeAllTasks() {
      TaskDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchTitle() {
      TaskDataService.findByTitle(this.title)
        .then((response) => {
          this.tasks = response.data;
          this.setActiveTask(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayStatus(status) {
      return {
        todo: "TO DO",
        inprogress: "IN PROGRESS",
        blocked: "BLOCKED",
        done: "DONE",
      }[status];
    },
    deleteTask() {
      TaskDataService.delete(this.currentTask.id)
        .then(() => {
          this.refreshList();
          this.setActiveTask(null);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDate(datetime) {
      let date = new Date(datetime);

      let dateString = `${date.getFullYear}/${date.getMonth() + 1}/${
        date.getDate
      }`;

      return date;
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
