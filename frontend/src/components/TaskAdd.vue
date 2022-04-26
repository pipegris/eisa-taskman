<template>
  <div class="submit-form">
    <div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          class="form-control"
          required
          v-model="task.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <select
          name="status"
          class="form-control"
          id="status"
          required
          v-model="task.status"
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div class="form-group">
        <label for="expiration">Expiration</label>
        <Datepicker v-model="task.expiration" :enableTimePicker="false" />
      </div>
      <button @click="saveTask" class="btn btn-success">Submit</button>
    </div>
  </div>
</template>
<script>
import TaskDataService from "../services/TaskDataService";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "TaskAdd",
  components: { Datepicker },
  data() {
    return {
      task: {
        id: null,
        title: "",
        status: "",
        expiration: null,
      },
    };
  },
  methods: {
    saveTask() {
      var data = {
        title: this.task.title,
        status: this.task.status,
        expiration: this.task.expiration,
      };
      TaskDataService.create(data)
        .then((response) => {
          this.task.id = response.data.id;
          console.log(response.data);
          this.$notify({
            title: "Success!",
            text: "The Task was created successfully!",
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

    newTask() {
      this.task = {};
    },
  },
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
