<template>
  <div v-if="currentTask" class="edit-form">
    <h4>Task</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTask.title"
        />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select
          name="status"
          class="form-control"
          id="status"
          required
          v-model="currentTask.status"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="form-group">
        <label for="expiration">Expiration</label>
        <Datepicker
          v-model="currentTask.expiration"
          :enableTimePicker="false"
        />
      </div>
      <div class="form-group">
        <label for="createdAt">Date of creation</label>
        <Datepicker
          disabled
          v-model="currentTask.createdAt"
          :enableTimePicker="false"
        />
      </div>
      <div class="form-group">
        <label for="updatedAt">Last update</label>
        <Datepicker
          disabled
          v-model="currentTask.updatedAt"
          :enableTimePicker="false"
        />
      </div>
    </form>
    <button class="btn btn-danger mr-2" @click="deleteTask">Delete</button>
    <button type="submit" class="btn btn-primary" @click="updateTask">
      Update
    </button>
  </div>
  <div v-else>
    <br />
    <p>The task selected cannot be fetched</p>
  </div>
</template>
<script>
import TaskDataService from "../services/TaskDataService";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "TaskDetails",
  components: { Datepicker },
  data() {
    return {
      currentTask: null,
    };
  },
  methods: {
    getTask(id) {
      TaskDataService.get(id)
        .then((response) => {
          this.currentTask = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateTask() {
      TaskDataService.update(this.currentTask.id, this.currentTask)
        .then((_response) => {
          this.$notify({
            title: "Success!",
            text: "The Task was updated successfully!",
            type: "success",
          });
          this.$router.push({ name: "task-list" });
        })
        .catch((e) => {
          e.response.data.errors.forEach((element) => {
            var errorMsg = Object.entries(element)
              .map((x) => x.join(":"))
              .join("\n");
            this.$notify({
              title: "Error!",
              text: errorMsg,
              type: "error",
              time: 5000
            });
          });
          console.log(e);
        });
    },
    deleteTask() {
      TaskDataService.delete(this.currentTask.id)
        .then((_response) => {
          this.$router.push({ name: "task-list" });
          this.$notify({
            title: "Success!",
            text: "Task deleted succesfully",
            type: "success",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getTask(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
